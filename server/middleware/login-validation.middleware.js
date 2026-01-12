const CustomErrorHandler = require("../utils/custom-error-handler");
const { LoginValidator } = require("../validator/login.validator");

module.exports = function (req, res, next) {
  const { error } = LoginValidator(req.body);

  if (error) {
    throw CustomErrorHandler.BadRequest(error.message);
  }

  next();
};
