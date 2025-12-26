const Joi = require("joi");

exports.VerifyValidator = (data) =>
  Joi.object({
    email: Joi.string().email().required(),
    otp: Joi.string().required(),
  }).validate(data, { abortEarly: false });
