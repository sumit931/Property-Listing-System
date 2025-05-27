const mongoose = require('mongoose');
const config = require('../config');
const Property = require('../models/property');

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

const updateObjectIds = async () => {
    try {
        // Get all properties
        const properties = await Property.find({});
        console.log('Total properties found:', properties.length);

        let updatedCount = 0;
        for (const property of properties) {
            const updates = {};

            // Update cityId
            if (property.cityId && !(property.cityId instanceof mongoose.Types.ObjectId)) {
                updates.cityId = new mongoose.Types.ObjectId(property.cityId);
            }

            // Update stateId
            if (property.stateId && !(property.stateId instanceof mongoose.Types.ObjectId)) {
                updates.stateId = new mongoose.Types.ObjectId(property.stateId);
            }

            // Update typeId
            if (property.typeId && !(property.typeId instanceof mongoose.Types.ObjectId)) {
                updates.typeId = new mongoose.Types.ObjectId(property.typeId);
            }

            // Update amenityIds
            if (Array.isArray(property.amenityIds)) {
                updates.amenityIds = property.amenityIds.map(id => 
                    id instanceof mongoose.Types.ObjectId ? id : new mongoose.Types.ObjectId(id)
                );
            }

            // Update tagIds
            if (Array.isArray(property.tagIds)) {
                updates.tagIds = property.tagIds.map(id => 
                    id instanceof mongoose.Types.ObjectId ? id : new mongoose.Types.ObjectId(id)
                );
            }

            // Only update if there are changes
            if (Object.keys(updates).length > 0) {
                await Property.findByIdAndUpdate(property._id, updates);
                updatedCount++;
                if (updatedCount % 100 === 0) {
                    console.log(`Updated ${updatedCount} properties...`);
                }
            }
        }

        console.log(`\n✅ Updated ObjectIds for ${updatedCount} properties.`);

        // Verification
        const totalProperties = await Property.countDocuments({});
        console.log(`Total properties in database: ${totalProperties}`);

    } catch (error) {
        console.error('❌ Error:', error);
    } finally {
        await mongoose.connection.close();
        console.log('Database connection closed');
    }
};

const runScript = async () => {
    await connectDB();
    await updateObjectIds();
};

runScript(); 