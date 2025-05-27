const mongoose = require('mongoose');
const config = require('../config');
const Property = require('../models/property');
const City = require('../models/city');

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

// Function to fetch and save cities
const fetchAndSaveCities = async () => {
    try {
        // Get all properties with city and state
        const properties = await Property.find({}, 'city state');
        console.log('Total properties found:', properties.length);
        
        // Create a Set of unique city-state pairs
        const uniqueCityStatePairs = new Set();
        properties.forEach(property => {
            if (property.city && property.state && 
                property.city.trim() !== '' && 
                property.state.trim() !== '') {
                uniqueCityStatePairs.add(JSON.stringify({
                    city: property.city.trim(),
                    state: property.state.trim()
                }));
            }
        });
        
        // Convert Set to array of objects
        const cityStateArray = Array.from(uniqueCityStatePairs).map(pair => JSON.parse(pair));
        
        console.log('Found unique city-state pairs:', cityStateArray.length);
        console.log('Sample cities:', cityStateArray.slice(0, 5));
        
        // Clear existing cities collection
        await City.deleteMany({});
        console.log('Cleared existing cities collection');
        
        // Insert all cities at once
        const result = await City.insertMany(cityStateArray);
        console.log('✅ Cities saved successfully:', result.length);
        
        // Get count of saved cities
        const cityCount = await City.countDocuments();
        console.log(`Total cities in database: ${cityCount}`);
        
        // Get cities grouped by state
        const citiesByState = await City.aggregate([
            {
                $group: {
                    _id: '$state',
                    cities: { $push: '$city' },
                    count: { $sum: 1 }
                }
            },
            { $sort: { _id: 1 } }
        ]);
        
        console.log('\nCities by State:');
        citiesByState.forEach(state => {
            console.log(`\n${state._id} (${state.count} cities):`);
            console.log(state.cities.join(', '));
        });
        
    } catch (error) {
        console.error('❌ Error saving cities:', error);
    } finally {
        // Close the database connection
        await mongoose.connection.close();
        console.log('\nDatabase connection closed');
    }
};

// Run the script
const runScript = async () => {
    await connectDB();
    await fetchAndSaveCities();
};

runScript(); 