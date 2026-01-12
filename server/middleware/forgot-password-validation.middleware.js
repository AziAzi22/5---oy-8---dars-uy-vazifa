const CustomErrorHandler = require("../utils/custom-error-handler");
const {
  ForgotPasswordValidator,
} = require("../validator/forgot-password.validation");

module.exports = function (req, res, next) {
  const { error } = ForgotPasswordValidator(req.body);

  if (error) {
    throw CustomErrorHandler.BadRequest(error.message);
  }

  next();
};
