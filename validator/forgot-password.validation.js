const Joi = require("joi");

exports.ForgotPasswordValidator = (data) =>
  Joi.object({
    email: Joi.string().email().required(),
    password: Joi.string().trim().min(8).required(),
    otp: Joi.string().trim().required(),
  }).validate(data, { abortEarly: false });
