const Joi = require("joi");

exports.postRegister = {
    body: Joi.object({
        firstName: Joi.string().required(),
        lastName: Joi.string().required(),
        email: Joi.string().email().required(),
        password: Joi.string().min(6).required(),
        confirmPassword: Joi.string().valid(Joi.ref('password')).required()
            .messages({ 'any.only': 'Password and confirm password must match' })
    })
};

exports.postLogin = {
    body: Joi.object({
        email: Joi.string().email().required(),
        password: Joi.string().required(),
    })
};  