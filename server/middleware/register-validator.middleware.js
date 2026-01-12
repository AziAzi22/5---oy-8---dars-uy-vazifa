const CustomErrorHandler = require("../utils/custom-error-handler");
const { RegisterValidator } = require("../validator/register.validation");


module.exports = function (req, res, next) {
  const { error } = RegisterValidator(req.body);

  if (error) {
    throw CustomErrorHandler.BadRequest(error.message);
  }

  next();
};
