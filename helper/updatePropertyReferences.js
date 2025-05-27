const mongoose = require('mongoose');
const config = require('../config');
const Property = require('../models/property');
const City = require('../models/city');
const State = require('../models/state');

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

// Function to update property references
const updatePropertyReferences = async () => {
    try {
        // Get all properties
        const properties = await Property.find({});
        console.log('Total properties to update:', properties.length);

        let updatedCount = 0;
        let errorCount = 0;

        // Process each property
        for (const property of properties) {
            try {
                // Find corresponding state
                const state = await State.findOne({ state: property.state });
                
                // Find corresponding city
                const city = await City.findOne({ city: property.city });

                if (!state || !city) {
                    console.log(`Skipping property ${property._id}: State or City not found`);
                    errorCount++;
                    continue;
                }

                // Update property with references
                await Property.findByIdAndUpdate(property._id, {
                    stateId: state._id,
                    cityId: city._id
                });

                updatedCount++;
                
                // Log progress every 100 properties
                if (updatedCount % 100 === 0) {
                    console.log(`Updated ${updatedCount} properties...`);
                }

            } catch (error) {
                console.error(`Error updating property ${property._id}:`, error);
                errorCount++;
            }
        }

        console.log('\nUpdate Summary:');
        console.log(`✅ Successfully updated: ${updatedCount} properties`);
        console.log(`❌ Failed to update: ${errorCount} properties`);
        
        // Verify the update
        const totalWithReferences = await Property.countDocuments({
            stateId: { $exists: true },
            cityId: { $exists: true }
        });
        
        console.log(`\nVerification: ${totalWithReferences} properties now have references`);

    } catch (error) {
        console.error('❌ Error updating properties:', error);
    } finally {
        // Close the database connection
        await mongoose.connection.close();
        console.log('\nDatabase connection closed');
    }
};

// Run the script
const runScript = async () => {
    await connectDB();
    await updatePropertyReferences();
};

runScript(); 