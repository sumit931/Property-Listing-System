const mongoose = require('mongoose');
const config = require('../config');
const Property = require('../models/property');
const Tag = require('../models/tag');

// Connect to MongoDB
const connectDB = async () => {
    try {
        await mongoose.connect(config.MONGODB_URI);
        console.log('✅ MongoDB connected successfully');
    } catch (error) {
        console.error('❌ MongoDB connection error:', error);
        process.exit(1);
    }
};

const updateTags = async () => {
    try {
        // Step 1: Get all properties with tags
        const properties = await Property.find({}, 'tags');
        console.log('Total properties found:', properties.length);

        // Step 2: Extract and process all tags
        const allTags = new Set();
        
        properties.forEach(property => {
            if (Array.isArray(property.tags)) {
                property.tags.forEach(tag => {
                    if (tag && typeof tag === 'string') {
                        // Split by pipe and trim each tag
                        const tags = tag.split('|').map(t => t.trim()).filter(t => t);
                        tags.forEach(t => allTags.add(t));
                    }
                });
            }
        });

        const uniqueTags = Array.from(allTags);
        console.log('Found unique tags:', uniqueTags);
        console.log('Total unique tags:', uniqueTags.length);

        // Step 3: Clear existing tags and insert new ones
        await Tag.deleteMany({});
        const tagDocs = uniqueTags.map(name => ({ name }));
        const insertedTags = await Tag.insertMany(tagDocs);
        console.log('Inserted tags:', insertedTags.length);

        // Step 4: Create a map of tag name to ObjectId
        const tagMap = {};
        insertedTags.forEach(doc => {
            tagMap[doc.name] = doc._id;
        });

        // Step 5: Update properties with tagIds
        let updatedCount = 0;
        for (const property of properties) {
            if (Array.isArray(property.tags)) {
                const tagIds = [];
                property.tags.forEach(tag => {
                    if (tag && typeof tag === 'string') {
                        const tags = tag.split('|').map(t => t.trim()).filter(t => t);
                        tags.forEach(t => {
                            if (tagMap[t]) {
                                tagIds.push(tagMap[t]);
                            }
                        });
                    }
                });

                if (tagIds.length > 0) {
                    await Property.findByIdAndUpdate(property._id, { tagIds });
                    updatedCount++;
                    if (updatedCount % 100 === 0) {
                        console.log(`Updated ${updatedCount} properties...`);
                    }
                }
            }
        }

        console.log(`\n✅ Updated tagIds for ${updatedCount} properties.`);

        // Verification
        const withTagIds = await Property.countDocuments({ tagIds: { $exists: true } });
        console.log(`Verification: ${withTagIds} properties now have tagIds.`);

    } catch (error) {
        console.error('❌ Error:', error);
    } finally {
        await mongoose.connection.close();
        console.log('Database connection closed');
    }
};

const runScript = async () => {
    await connectDB();
    await updateTags();
};

runScript(); 