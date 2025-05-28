const Joi = require("joi");
Joi.objectId = require("joi-objectid")(Joi);

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
        amenityIds: Joi.array().items(Joi.objectId()),
        furnished: Joi.string().valid('Furnished', 'Unfurnished', 'Semi'),
        tagIds: Joi.array().items(Joi.objectId()),
        minRating: Joi.number().min(0).max(5),
        listingType: Joi.string().valid('sale', 'rent')
    })
};  