const CustomErrorHandler = require("../utils/custom-error-handler");
const { VerifyValidator } = require("../validator/verify.validation");


module.exports = function (req, res, next) {
  const { error } = VerifyValidator(req.body);

  if (error) {
    throw CustomErrorHandler.BadRequest(error.message);
  }

  next();
};
