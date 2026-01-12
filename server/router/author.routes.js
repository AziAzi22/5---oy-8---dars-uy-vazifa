const { Router } = require("express");
const {
  getAllAuthor,
  addAuthor,
  getOneAuthor,
  updateAuthor,
  deleteAuthor,
  search,
} = require("../controller/author.controller");
const authorValidationMiddleware = require("../middleware/author-validation.middleware");
const checkAdmin = require("../middleware/check-admin");

const authorRouter = Router();

authorRouter.get("/get_all_authors", getAllAuthor);
authorRouter.get("/get_one_author/:id", getOneAuthor);
authorRouter.post("/add_author", checkAdmin, authorValidationMiddleware, addAuthor);
authorRouter.put("/update_author/:id", checkAdmin, updateAuthor);
authorRouter.delete("/delete_author/:id", checkAdmin, deleteAuthor);
authorRouter.get("/search", search);

module.exports = authorRouter;
