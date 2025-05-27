const mongoose = require('mongoose');
const config = require('../config');
const Property = require('../models/property');
const PropertyType = require('../models/propertyType');

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

const updatePropertyTypes = async () => {
    try {
        // Step 1: Extract unique types from Property
        const properties = await Property.find({}, 'type');
        const uniqueTypes = [...new Set(properties.map(p => p.type).filter(Boolean))];
        console.log('Unique property types:', uniqueTypes);

        // Step 2: Insert unique types into PropertyType collection
        const typeDocs = uniqueTypes.map(type => ({ type }));
        await PropertyType.deleteMany({});
        const insertedTypes = await PropertyType.insertMany(typeDocs);
        console.log('Inserted property types:', insertedTypes.length);

        // Step 3: Create a map of type to ObjectId
        const typeMap = {};
        insertedTypes.forEach(doc => {
            typeMap[doc.type] = doc._id;
        });

        // Step 4: Update each property with the correct typeId
        let updatedCount = 0;
        for (const property of properties) {
            if (property.type && typeMap[property.type]) {
                await Property.findByIdAndUpdate(property._id, { typeId: typeMap[property.type] });
                updatedCount++;
                if (updatedCount % 100 === 0) {
                    console.log(`Updated ${updatedCount} properties...`);
                }
            }
        }
        console.log(`\n✅ Updated typeId for ${updatedCount} properties.`);

        // Verification
        const withTypeId = await Property.countDocuments({ typeId: { $exists: true } });
        console.log(`Verification: ${withTypeId} properties now have typeId.`);
    } catch (error) {
        console.error('❌ Error:', error);
    } finally {
        await mongoose.connection.close();
        console.log('Database connection closed');
    }
};

const runScript = async () => {
    await connectDB();
    await updatePropertyTypes();
};

runScript(); 