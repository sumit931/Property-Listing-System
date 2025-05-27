const mongoose = require('mongoose');
const config = require('../config');
const Property = require('../models/property');
const Amenity = require('../models/amenity');

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

const updateAmenities = async () => {
    try {
        // Step 1: Get all properties with amenities
        const properties = await Property.find({}, 'amenities');
        console.log('Total properties found:', properties.length);

        // Step 2: Extract and process all amenities
        const allAmenities = new Set();
        
        properties.forEach(property => {
            if (Array.isArray(property.amenities)) {
                property.amenities.forEach(amenity => {
                    if (amenity && typeof amenity === 'string') {
                        // Split by pipe and trim each amenity
                        const amenities = amenity.split('|').map(a => a.trim()).filter(a => a);
                        amenities.forEach(a => allAmenities.add(a));
                    }
                });
            }
        });

        const uniqueAmenities = Array.from(allAmenities);
        console.log('Found unique amenities:', uniqueAmenities);
        console.log('Total unique amenities:', uniqueAmenities.length);

        // Step 3: Clear existing amenities and insert new ones
        await Amenity.deleteMany({});
        const amenityDocs = uniqueAmenities.map(name => ({ name }));
        const insertedAmenities = await Amenity.insertMany(amenityDocs);
        console.log('Inserted amenities:', insertedAmenities.length);

        // Step 4: Create a map of amenity name to ObjectId
        const amenityMap = {};
        insertedAmenities.forEach(doc => {
            amenityMap[doc.name] = doc._id;
        });

        // Step 5: Update properties with amenityIds
        let updatedCount = 0;
        for (const property of properties) {
            if (Array.isArray(property.amenities)) {
                const amenityIds = [];
                property.amenities.forEach(amenity => {
                    if (amenity && typeof amenity === 'string') {
                        const amenities = amenity.split('|').map(a => a.trim()).filter(a => a);
                        amenities.forEach(a => {
                            if (amenityMap[a]) {
                                amenityIds.push(amenityMap[a]);
                            }
                        });
                    }
                });

                if (amenityIds.length > 0) {
                    await Property.findByIdAndUpdate(property._id, { amenityIds });
                    updatedCount++;
                    if (updatedCount % 100 === 0) {
                        console.log(`Updated ${updatedCount} properties...`);
                    }
                }
            }
        }

        console.log(`\n✅ Updated amenityIds for ${updatedCount} properties.`);

        // Verification
        const withAmenityIds = await Property.countDocuments({ amenityIds: { $exists: true } });
        console.log(`Verification: ${withAmenityIds} properties now have amenityIds.`);

    } catch (error) {
        console.error('❌ Error:', error);
    } finally {
        await mongoose.connection.close();
        console.log('Database connection closed');
    }
};

const runScript = async () => {
    await connectDB();
    await updateAmenities();
};

runScript(); 