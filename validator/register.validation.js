const Joi = require("joi");

exports.RegisterValidator = (data) =>
  Joi.object({
    username: Joi.string().alphanum().min(3).max(30).required(),
    email: Joi.string().email().required(),
    password: Joi.string().min(8).required(),
    birth_year: Joi.number()
      .integer()
      .min(1900)
      .max(new Date().getFullYear())
      .required(),
  }).validate(data, { abortEarly: false });
