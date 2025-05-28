const queries = require("./listingProperty.queries");
const { ObjectId } = require("mongodb");

exports.getProperties = async (req, res, next) => {
    try {
        const findQuery = {};
        
        // Convert string IDs to ObjectId
        if (req.query?.typeId) findQuery.typeId = new ObjectId(req.query.typeId);
        if (req.query?.stateId) findQuery.stateId = new ObjectId(req.query.stateId);
        if (req.query?.cityId) findQuery.cityId = new ObjectId(req.query.cityId);
        
        // Title search with case-insensitive regex
        if(req.query?.title) findQuery.title = { $regex: req.query.title, $options: 'i' };
        
        // Date filter
        if(req.query?.availableFrom) findQuery.availableFrom = { $lte: new Date(req.query.availableFrom) };
        
        // Price range
        if(req.query?.minPrice || req.query?.maxPrice) {
            findQuery.price = {};
            if(req.query?.minPrice) findQuery.price.$gte = Number(req.query.minPrice);
            if(req.query?.maxPrice) findQuery.price.$lte = Number(req.query.maxPrice);
        }
        
        // Numeric filters
        if(req.query?.minBedrooms) findQuery.bedrooms = { $gte: Number(req.query.minBedrooms) };
        if(req.query?.minBathrooms) findQuery.bathrooms = { $gte: Number(req.query.minBathrooms) };
        if(req.query?.minRating) findQuery.rating = { $gte: Number(req.query.minRating) };
        
        // String filters
        if(req.query?.listingType) findQuery.listingType = req.query.listingType;
        if(req.query?.furnished) findQuery.furnished = req.query.furnished;

        console.log('Find Query:', JSON.stringify(findQuery, null, 2));
        const result = await queries.getProperties(findQuery);
        return res.status(200).json({ message: "Properties fetched successfully", properties: result });
    } catch (error) {
        console.error('Error fetching properties:', error);
        next(error);
    }
}

exports.postProperty = async (req, res, next) => {
    try {
        const propertyData = {
            ...req.body,
            id: Date.now().toString(), // Generate a unique ID
            listerId: req.user.id,
            isVerified: false // Default value for new listings

        };
        
        const result = await queries.createProperty(propertyData);
        console.log('Property created successfully:', result);
        return res.status(201).json({ message: "Property listed successfully", property: result });
    } catch (error) {
        console.error('Error creating property:', error);
        next(error);
    }
}

exports.deleteProperty = async (req, res, next) => {
    try {
        const propertyId = req.params.id;
        const deleteQuery = {
            id: propertyId,
            listerId: req.user.id
        };

        console.log(deleteQuery, " this is the delete query");
        const deletedProperty = await queries.deleteProperty(deleteQuery);
        
        if (!deletedProperty) {
            return res.status(404).json({ message: "Property not found or you don't have permission to delete it" });
        }
        
        return res.status(200).json({ message: "Property deleted successfully", property: deletedProperty });
    } catch (error) {
        console.error('Error deleting property:', error);
        next(error);
    }
}

exports.getCity = async(req,res,next) =>{
    const cities = await queries.getCity();
    return res.status(200).json({ message: "Cities fetched successfully", cities });
}

exports.getState = async(req,res,next) =>{
    const states = await queries.getState();
    return res.status(200).json({ message: "States fetched successfully", states });
}

exports.getPropertyType = async(req,res,next) =>{
    const propertyTypes = await queries.getPropertyType();
    return res.status(200).json({ message: "Property Types fetched successfully", propertyTypes });
}

exports.getPropertyTag = async(req,res,next) =>{
    console.log("testing 2.0");
    const propertyTags = await queries.getPropertyTag();
    return res.status(200).json({ message: "Property Tags fetched successfully", propertyTags });
}   

exports.getAmenity = async(req,res,next) =>{
    const amenities = await queries.getAmenity();
    return res.status(200).json({ message: "Amenities fetched successfully", amenities });
}