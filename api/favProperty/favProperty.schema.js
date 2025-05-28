const Joi = require("joi");
Joi.objectId = require("joi-objectid")(Joi);

exports.addFavProperty = {
    body: Joi.object({
        propertyId: Joi.objectId().required()
    })
};

exports.removeFavProperty = {
    body: Joi.object({
        propertyId: Joi.objectId().required()
    })
};

