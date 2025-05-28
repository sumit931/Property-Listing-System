const User = require("../../models/user");
const Property = require("../../models/property");

exports.getFavProperty = (userId) => {
    return User.aggregate([
        // Match the specific user
        { $match: { _id: userId } },
        // Lookup to get favorite properties
        {
            $lookup: {
                from: 'properties',
                localField: 'favPropertyIds',
                foreignField: '_id',
                as: 'favoriteProperties'
            }
        },
        // Unwind the favorite properties array
        { $unwind: '$favoriteProperties' },
        // Lookup for property type details
        {
            $lookup: {
                from: 'propertytypes',
                localField: 'favoriteProperties.typeId',
                foreignField: '_id',
                as: 'propertyType'
            }
        },
        // Lookup for city details
        {
            $lookup: {
                from: 'cities',
                localField: 'favoriteProperties.cityId',
                foreignField: '_id',
                as: 'city'
            }
        },
        // Lookup for state details
        {
            $lookup: {
                from: 'states',
                localField: 'favoriteProperties.stateId',
                foreignField: '_id',
                as: 'state'
            }
        },
        // Lookup for amenities
        {
            $lookup: {
                from: 'amenities',
                localField: 'favoriteProperties.amenityIds',
                foreignField: '_id',
                as: 'amenities'
            }
        },
        // Lookup for tags
        {
            $lookup: {
                from: 'tags',
                localField: 'favoriteProperties.tagIds',
                foreignField: '_id',
                as: 'tags'
            }
        },
        // Project the final structure
        {
            $project: {
                _id: '$favoriteProperties._id',
                id: '$favoriteProperties.id',
                title: '$favoriteProperties.title',
                type: { $arrayElemAt: ['$propertyType.type', 0] },
                price: '$favoriteProperties.price',
                state: { $arrayElemAt: ['$state.state', 0] },
                city: { $arrayElemAt: ['$city.city', 0] },
                areaSqFt: '$favoriteProperties.areaSqFt',
                bedrooms: '$favoriteProperties.bedrooms',
                bathrooms: '$favoriteProperties.bathrooms',
                amenities: '$amenities.name',
                furnished: '$favoriteProperties.furnished',
                availableFrom: '$favoriteProperties.availableFrom',
                listedBy: '$favoriteProperties.listedBy',
                tags: '$tags.name',
                colorTheme: '$favoriteProperties.colorTheme',
                rating: '$favoriteProperties.rating',
                isVerified: '$favoriteProperties.isVerified',
                listingType: '$favoriteProperties.listingType'
            }
        }
    ]);
}

exports.removeFavProperty = (userId, propertyId) => {
    return User.findOneAndUpdate(
        { _id: userId },
        { $pull: { favPropertyIds: propertyId } },
        { new: true }
    );
}

exports.addFavProperty = (userId, propertyId) => {
    return User.findOneAndUpdate(
        { _id: userId },
        { $addToSet: { favPropertyIds: propertyId } }, // Using $addToSet instead of $push to prevent duplicates
        { new: true }
    );
}
