const User = require("../../models/user");
const Property = require("../../models/property");

exports.getFavProperty = (findQuery) => {
    console.log(findQuery);
    return User.aggregate([
        { $match: findQuery },
        {
            $project: {
                favPropertyIds: 1
            }
        },
        { $unwind: "$favPropertyIds" },
        {
            $lookup: {
                from: 'properties',
                localField: 'favPropertyIds',
                foreignField: '_id',
                as: 'property'
            }
        },
        { $unwind: '$property' },
        {
            $lookup: {
                from: 'propertytypes',
                localField: 'property.typeId',
                foreignField: '_id',
                as: 'propertyType'
            }
        },
        {
            $lookup: {
                from: 'cities',
                localField: 'property.cityId',
                foreignField: '_id',
                as: 'city'
            }
        },
        {
            $lookup: {
                from: 'states',
                localField: 'property.stateId',
                foreignField: '_id',
                as: 'state'
            }
        },
        {
            $lookup: {
                from: 'amenities',
                localField: 'property.amenityIds',
                foreignField: '_id',
                as: 'amenities'
            }
        },
        {
            $lookup: {
                from: 'tags',
                localField: 'property.tagIds',
                foreignField: '_id',
                as: 'tags'
            }
        },
        {
            $project: {
                _id: '$property._id',
                id: '$property.id',
                title: '$property.title',
                type: { $arrayElemAt: ['$propertyType.type', 0] },
                price: '$property.price',
                state: { $arrayElemAt: ['$state.state', 0] },
                city: { $arrayElemAt: ['$city.city', 0] },
                areaSqFt: '$property.areaSqFt',
                bedrooms: '$property.bedrooms',
                bathrooms: '$property.bathrooms',
                amenities: '$amenities.name',
                furnished: '$property.furnished',
                availableFrom: '$property.availableFrom',
                listedBy: '$property.listedBy',
                tags: '$tags.name',
                colorTheme: '$property.colorTheme',
                rating: '$property.rating',
                isVerified: '$property.isVerified',
                listingType: '$property.listingType'
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
