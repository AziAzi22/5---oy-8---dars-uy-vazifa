const Joi = require("joi");

exports.ResendOTPValidator = (data) =>
  Joi.object({
    email: Joi.string().email().required(),
  }).validate(data, { abortEarly: false });
