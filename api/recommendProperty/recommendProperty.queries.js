const recommendProperty = require("../../models/recommendProperty");

exports.getRecommendProperty = async (findQuery) => {
    const result = await recommendProperty.aggregate([
        {
            $match: findQuery
        },
        {
            $lookup: {
                from: "properties",
                localField: "propertyId",
                foreignField: "_id",
                as: "property"
            }
        },
        {
            $unwind: "$property"
        },
        // Lookup for amenities
        {
            $lookup: {
                from: "amenities",
                localField: "property.amenityIds",
                foreignField: "_id",
                as: "amenities"
            }
        },
        // Lookup for tags
        {
            $lookup: {
                from: "tags",
                localField: "property.tagIds",
                foreignField: "_id",
                as: "tags"
            }
        },
        // Lookup for state
        {
            $lookup: {
                from: "states",
                localField: "property.stateId",
                foreignField: "_id",
                as: "state"
            }
        },
        // Lookup for city
        {
            $lookup: {
                from: "cities",
                localField: "property.cityId",
                foreignField: "_id",
                as: "city"
            }
        },
        // Lookup for property type
        {
            $lookup: {
                from: "propertytypes",
                localField: "property.typeId",
                foreignField: "_id",
                as: "propertyType"
            }
        },
        // Lookup for recommended by user
        {
            $lookup: {
                from: "users",
                localField: "recommendByUserId",
                foreignField: "_id",
                as: "recommendedBy"
            }
        },
        // Project the final structure
        {
            $project: {
                _id: 1,
                propertyId: 1,
                recommendToUserEmail: 1,
                recommendByUserId: 1,
                property: {
                    _id: "$property._id",
                    title: "$property.title",
                    price: "$property.price",
                    areaSqFt: "$property.areaSqFt",
                    bedrooms: "$property.bedrooms",
                    bathrooms: "$property.bathrooms",
                    furnished: "$property.furnished",
                    availableFrom: "$property.availableFrom",
                    listedBy: "$property.listedBy",
                    colorTheme: "$property.colorTheme",
                    rating: "$property.rating",
                    isVerified: "$property.isVerified",
                    listingType: "$property.listingType"
                },
                amenities: "$amenities.name",
                tags: "$tags.name",
                state: { $arrayElemAt: ["$state.state", 0] },
                city: { $arrayElemAt: ["$city.city", 0] },
                propertyType: { $arrayElemAt: ["$propertyType.type", 0] },
                recommendedBy: {
                    $arrayElemAt: [{
                        $map: {
                            input: "$recommendedBy",
                            as: "user",
                            in: {
                                firstName: "$$user.firstName",
                                lastName: "$$user.lastName",
                                email: "$$user.email"
                            }
                        }
                    }, 0]
                }
            }
        }
    ]);
    return result;
}


exports.postRecommendProperty = (createQuery) => {
    return recommendProperty.create(createQuery);
}