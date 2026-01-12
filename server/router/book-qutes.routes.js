const { Router } = require("express");
const {
  addBookQuote,
  getAllBookQuotes,
  getOneBookQuote,
  updateBookQuote,
  deleteBookQuote,
} = require("../controller/book-quotes.controller");
const authorization = require("../middleware/authorization");
const bookQuotesValidationMiddleware = require("../middleware/book-quotes-validation.middleware");
const checkAdmin = require("../middleware/check-admin");

const bookQuotesRouter = Router();

bookQuotesRouter.get("/get_all_book_quotes", authorization, getAllBookQuotes);
bookQuotesRouter.post(
  "/add_book_quote",
  authorization,
  checkAdmin,
  bookQuotesValidationMiddleware,
  addBookQuote
);
bookQuotesRouter.put(
  "/update_book_quote/:id",
  bookQuotesValidationMiddleware,
  authorization,
  updateBookQuote
);
bookQuotesRouter.delete(
  "/delete_book_quote/:id",
  authorization,
  deleteBookQuote
);

module.exports = bookQuotesRouter;
