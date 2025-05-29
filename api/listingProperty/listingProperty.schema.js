const Joi = require("joi");
Joi.objectId = require("joi-objectid")(Joi);

// Helper function to ensure a value is an array before Joi validation
exports.postRegister = {
    body: Joi.object({
        firstName: Joi.string().required(),
        lastName: Joi.string().required(),
        email: Joi.string().email().required(),
        password: Joi.string().min(6).required(),
        confirmPassword: Joi.string().valid(Joi.ref('password')).required()
            .messages({ 'any.only': 'Password and confirm password must match' }),
        phoneNumber: Joi.string().required(),
    })
};

exports.postLogin = {
    body: Joi.object({
        email: Joi.string().email().required(),
        password: Joi.string().required(),
    })
};

exports.postProperty = {
    body: Joi.object({
        title: Joi.string().required(),
        // type: Joi.string().required(),
        typeId: Joi.objectId().required(),
        price: Joi.number().required(),
        // state: Joi.string().required(),
        stateId: Joi.objectId().required(),
        cityId: Joi.objectId().required(),
        // city: Joi.string().required(),
        areaSqFt: Joi.number().required(),
        bedrooms: Joi.number().required(),
        bathrooms: Joi.number().required(),
        // amenities: Joi.array().items(Joi.string()),
        amenityIds: Joi.array().items(Joi.objectId()),
        tagIds: Joi.array().items(Joi.objectId()),
        furnished: Joi.string().valid('Furnished', 'Unfurnished', 'Semi').required(),
        availableFrom: Joi.date().required(),
        listedBy: Joi.string().valid('Builder', 'Owner', 'Agent').required(),
        // tags: Joi.array().items(Joi.string()),
        tagIds: Joi.array().items(Joi.objectId()),
        colorTheme: Joi.string(),
        rating: Joi.number(),
        isVerified: Joi.boolean(),
        listingType: Joi.string().valid('sale', 'rent').required()
    })
};

exports.deleteProperty = {
    params: Joi.object({
        id: Joi.string().required()
    })
};

exports.getProperties = {
    query: Joi.object({
        title: Joi.string(),
        typeId: Joi.objectId(),
        minPrice: Joi.number().min(0),
        maxPrice: Joi.number().min(0),
        availableFrom: Joi.date(),
        stateId: Joi.objectId(),
        cityId: Joi.objectId(),
        minBedrooms: Joi.number().min(0),
        minBathrooms: Joi.number().min(0),
        amenityIds: Joi.alternatives().try(
            Joi.objectId(),                        // Accept a single ObjectId
            Joi.array().items(Joi.objectId())      // Or an array of ObjectIds
          ).optional(),
        furnished: Joi.string().valid('Furnished', 'Unfurnished', 'Semi'),
        tagIds: Joi.alternatives().try(
            Joi.objectId(),                        // Accept a single ObjectId
            Joi.array().items(Joi.objectId())      // Or an array of ObjectIds
          ).optional(),
        minRating: Joi.number().min(0).max(5),
        listingType: Joi.string().valid('sale', 'rent')
    })
};

exports.patchProperty = {
    params: Joi.object({
        id: Joi.string().required() // Assuming 'id' is the string ID like in postProperty
    }),
    body: Joi.object({
        title: Joi.string().optional(),
        typeId: Joi.objectId().optional(),
        price: Joi.number().optional(),
        stateId: Joi.objectId().optional(),
        cityId: Joi.objectId().optional(),
        areaSqFt: Joi.number().optional(),
        bedrooms: Joi.number().optional(),
        bathrooms: Joi.number().optional(),
        amenityIds: Joi.array().items(Joi.objectId()).optional(),
        tagIds: Joi.array().items(Joi.objectId()).optional(),
        furnished: Joi.string().valid('Furnished', 'Unfurnished', 'Semi').optional(),
        availableFrom: Joi.date().optional(),
        listedBy: Joi.string().valid('Builder', 'Owner', 'Agent').optional(),
        colorTheme: Joi.string().optional(),
        rating: Joi.number().optional(),
        // isVerified should likely not be patchable by a regular user, 
        // but can be included if there's an admin flow for it. For now, I'll omit it.
        // isVerified: Joi.boolean().optional(), 
        listingType: Joi.string().valid('sale', 'rent').optional()
    }).min(1) // Require at least one field to be updated
};  