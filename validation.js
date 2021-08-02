const Joi = require('joi');

const registerValidation = (data) => {

    const schema = Joi.object({
        firstname: Joi.string().min(2).required(),
        lastname: Joi.string().min(2).required(),
        username: Joi.string().min(6).required(),
        email: Joi.string().min(6).required().email(),
        password: Joi.string().min(6).required(),
        passwordConfirm: Joi.any().equal(Joi.ref('password'))
        .required()
        .messages({ 'any.only': '{Password does not match' })
    });
    return schema.validate(data)
}

const loginValidation = (data) => {

    const schema = Joi.object({
        email: Joi.string().min(6).email(),
        password: Joi.string().min(4),
    });

    return schema.validate(data)
}

module.exports.registerValidation = registerValidation
module.exports.loginValidation = loginValidation