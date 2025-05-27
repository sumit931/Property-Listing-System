const Joi = require("joi");

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
        type: Joi.string().required(),
        price: Joi.number().required(),
        state: Joi.string().required(),
        city: Joi.string().required(),
        areaSqFt: Joi.number().required(),
        bedrooms: Joi.number().required(),
        bathrooms: Joi.number().required(),
        amenities: Joi.array().items(Joi.string()),
        furnished: Joi.string().valid('Furnished', 'Unfurnished', 'Semi').required(),
        availableFrom: Joi.date().required(),
        listedBy: Joi.string().valid('Builder', 'Owner', 'Agent').required(),
        tags: Joi.array().items(Joi.string()),
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