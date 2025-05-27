const queries = require("./listingProperty.queries");


exports.getProperties = async (req, res, next) => {
    const properties = await queries.getProperties();
    return res.status(200).json({ message: "Properties fetched successfully", properties });
}

exports.postProperty = async (req, res, next) => {
    try {
        const propertyData = {
            ...req.body,
            id: Date.now().toString(), // Generate a unique ID
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
        const deletedProperty = await queries.deleteProperty(propertyId);
        
        if (!deletedProperty) {
            return res.status(404).json({ message: "Property not found" });
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
    const propertyTags = await queries.getPropertyTag();
    return res.status(200).json({ message: "Property Tags fetched successfully", propertyTags });
}   

exports.getAmenity = async(req,res,next) =>{
    const amenities = await queries.getAmenity();
    return res.status(200).json({ message: "Amenities fetched successfully", amenities });
}