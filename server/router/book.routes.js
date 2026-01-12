const { Router } = require("express");
const {
  getAllBooks,
  addBook,
  getOneBook,
  updateBook,
  deleteBook,
} = require("../controller/book.controller");
const authorization = require("../middleware/authorization");
const bookValidationMiddleware = require("../middleware/book-validation.middleware");

const bookRouter = Router();

bookRouter.get("/get_all_books", getAllBooks);
bookRouter.get("/get_one_book/:id", getOneBook);
bookRouter.post("/add_book",  authorization, bookValidationMiddleware, addBook);
bookRouter.put("/update_book/:id", authorization, updateBook);
bookRouter.delete("/delete_book/:id", authorization, deleteBook);

module.exports = bookRouter;
