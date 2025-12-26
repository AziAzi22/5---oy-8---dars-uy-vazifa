const CustomErrorHandler = require("../utils/custom-error-handler");
const { BookQuotesValidator } = require("../validator/book-quotes.validation");

module.exports = function (req, res, next) {
  const { error } = BookQuotesValidator(req.body);

  if (error) {
    return next(CustomErrorHandler.BadRequest(error.message));
  }

  next();
};
