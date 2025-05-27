const mongoose = require('mongoose');
const config = require('../config');
const Property = require('../models/property');
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

// Function to fetch and save states
const fetchAndSaveStates = async () => {
    try {
        // Get all properties and extract unique states
        const properties = await Property.find({}, 'state');
        console.log('Total properties found:', properties.length);
        
        // Extract unique states and filter out null/undefined/empty values
        const uniqueStates = [...new Set(properties
            .map(property => property.state)
            .filter(state => state && state.trim() !== ''))];
        
        console.log('Found unique states:', uniqueStates);
        
        // Clear existing states collection
        await State.deleteMany({});
        console.log('Cleared existing states collection');
        
        // Create array of state documents
        const stateDocuments = uniqueStates.map(state => ({ state }));
        
        // Insert all states at once
        const result = await State.insertMany(stateDocuments);
        console.log('✅ States saved successfully:', result.length);
        
        // Get count of saved states
        const stateCount = await State.countDocuments();
        console.log(`Total states in database: ${stateCount}`);
        
    } catch (error) {
        console.error('❌ Error saving states:', error);
    } finally {
        // Close the database connection
        await mongoose.connection.close();
        console.log('Database connection closed');
    }
};

// Run the script
const runScript = async () => {
    await connectDB();
    await fetchAndSaveStates();
};

// runScript();
