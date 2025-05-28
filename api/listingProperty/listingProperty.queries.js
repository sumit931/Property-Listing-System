const User = require("../../models/user");
const City = require("../../models/city");
const State = require("../../models/state");
const PropertyType = require("../../models/propertyType");
const Tags = require("../../models/tag");
const Amenity = require("../../models/amenity");
const Property = require("../../models/property");

exports.getProperties = (findQuery) => {
    // const matchStage = {};

    // // Add filters to match stage if they exist
    // if (filters.title) {
    //     matchStage.title = { $regex: filters.title, $options: 'i' };
    // }
    // if (filters.typeId) {
    //     matchStage.typeId = filters.typeId;
    // }
    // if (filters.stateId) {
    //     matchStage.stateId = filters.stateId;
    // }
    // if (filters.cityId) {
    //     matchStage.cityId = filters.cityId;
    // }
    // if (filters.furnished) {
    //     matchStage.furnished = filters.furnished;
    // }
    // if (filters.listingType) {
    //     matchStage.listingType = filters.listingType;
    // }
    // if (filters.minPrice || filters.maxPrice) {
    //     matchStage.price = {};
    //     if (filters.minPrice) matchStage.price.$gte = filters.minPrice;
    //     if (filters.maxPrice) matchStage.price.$lte = filters.maxPrice;
    // }
    // if (filters.minBedrooms) {
    //     matchStage.bedrooms = { $gte: filters.minBedrooms };
    // }
    // if (filters.minBathrooms) {
    //     matchStage.bathrooms = { $gte: filters.minBathrooms };
    // }
    // if (filters.minRating) {
    //     matchStage.rating = { $gte: filters.minRating };
    // }
    // if (filters.availableFrom) {
    //     matchStage.availableFrom = { $lte: new Date(filters.availableFrom) };
    // }
    // if (filters.amenityIds && filters.amenityIds.length > 0) {
    //     matchStage.amenityIds = { $all: filters.amenityIds };
    // }
    // if (filters.tagIds && filters.tagIds.length > 0) {
    //     matchStage.tagIds = { $all: filters.tagIds };
    // }

    // console.log('Match stage:', JSON.stringify(matchStage, null, 2));

    return Property.aggregate([
        { $match: findQuery },
        // Lookup for property type details
        {
            $lookup: {
                from: 'propertytypes',
                localField: 'typeId',
                foreignField: '_id',
                as: 'propertyType'
            }
        },
        // Lookup for city details
        {
            $lookup: {
                from: 'cities',
                localField: 'cityId',
                foreignField: '_id',
                as: 'city'
            }
        },
        // Lookup for state details
        {
            $lookup: {
                from: 'states',
                localField: 'stateId',
                foreignField: '_id',
                as: 'state'
            }
        },
        // Lookup for amenities
        {
            $lookup: {
                from: 'amenities',
                localField: 'amenityIds',
                foreignField: '_id',
                as: 'amenities'
            }
        },
        // Lookup for tags
        {
            $lookup: {
                from: 'tags',
                localField: 'tagIds',
                foreignField: '_id',
                as: 'tags'
            }
        },
        // Project the final structure
        {
            $project: {
                _id: 1,
                id: 1,
                title: 1,
                type: { $arrayElemAt: ['$propertyType.type', 0] },
                price: 1,
                state: { $arrayElemAt: ['$state.state', 0] },
                city: { $arrayElemAt: ['$city.city', 0] },
                areaSqFt: 1,
                bedrooms: 1,
                bathrooms: 1,
                amenities: '$amenities.name',
                furnished: 1,
                availableFrom: 1,
                listedBy: 1,
                tags: '$tags.name',
                colorTheme: 1,
                rating: 1,
                isVerified: 1,
                listingType: 1
            }
        }
    ]);
}

exports.createProperty = (data) => {
    return Property.create(data);
}

exports.deleteProperty = (deleteQuery) => {
    return Property.findOneAndDelete(deleteQuery);
}

exports.getCity = () => {
    return City.find();
}

exports.getState = () => {
    return State.find();
}

exports.getPropertyType = () => {
    return PropertyType.find();
}

exports.getPropertyTag = () => {
    return Tags.find();
}

exports.getAmenity = () => {
    return Amenity.find();  
}