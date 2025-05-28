const Joi = require("joi");
Joi.objectId = require("joi-objectid")(Joi);

exports.addRecommendation = {
    body: Joi.object({
        propertyId: Joi.objectId().required(),
        email : Joi.string().email().required(),
    })
};