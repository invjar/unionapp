/*jshint esversion: 8*/

const Joi = require('@hapi/joi');

//CREATING A VALIDATION FUNCTION FOR USER REGISTRATION DATA
const registerValidation = data => {

    const userValidationSchema = Joi.object({
        username: Joi.string()
            .min(4)
            .required(),
        email: Joi.string()
            .min(4)
            .required()
            .email(),
        password: Joi.string()
            .min(4)
            .required()
    });

    return userValidationSchema.validate(data);
};

//asdfasdfasdf
const loginValidation = data => {

    const loginValidationSchema = Joi.object({
        email: Joi.string()
            .min(4)
            .required()
            .email(),
        password: Joi.string()
            .min(4)
            .required()
    });

    return loginValidationSchema.validate(data);

};

module.exports.registerValidation = registerValidation;
module.exports.loginValidation = loginValidation;