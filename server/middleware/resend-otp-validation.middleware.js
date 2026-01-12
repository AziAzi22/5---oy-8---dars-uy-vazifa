const CustomErrorHandler = require("../utils/custom-error-handler");
const { ResendOTPValidator } = require("../validator/resend-otp.validation");

module.exports = function (req, res, next) {
  const { error } = ResendOTPValidator(req.body);

  if (error) {
    throw CustomErrorHandler.BadRequest(error.message);
  }

  next();
};
