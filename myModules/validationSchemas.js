const joi = require('joi');

const userSchema = joi.object({
    firstname: joi.string().min(1).required(),
    secondName: joi.string().min(1).required(),
    city: joi.string().min(3),
    age: joi.number().min(0).max(300).required()
});

module.exports = {
    userSchema
};