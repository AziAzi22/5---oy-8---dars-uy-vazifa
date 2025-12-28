const Joi = require("joi");

exports.LoginValidator = (data) =>
  Joi.object({
    email: Joi.string().email().required(),

    password: Joi.string().trim().required(),
  }).validate(data, { abortEarly: false });
