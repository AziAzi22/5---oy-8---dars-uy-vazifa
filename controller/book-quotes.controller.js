const BookQuotesSchema = require("../schema/book-quotes.schema");
const BookSchema = require("../schema/book.schema");
const CustomErrorHandler = require("../utils/custom-error-handler");

async function getAllBookQuotes(req, res, next) {
  try {
    const bookQuotes = await BookQuotesSchema.find()
      .populate("book_id", "title")
      .populate("admin_id", "username");

    res.status(200).json(bookQuotes);
  } catch (error) {
    next(error);
  }
}

// get one book quote

async function getOneBookQuote(req, res, next) {
  try {
    const { id } = req.params;

    const foundedBookQuote = await BookQuotesSchema.findById(id)
      .populate("book_id", "title")
      .populate("admin_id", "username");

    if (!foundedBookQuote) {
      throw CustomErrorHandler.NotFound("book quote not found");
    }

    res.status(200).json(foundedBookQuote);
  } catch (error) {
    next(error);
  }
}

// add book quote

async function addBookQuote(req, res, next) {
  try {
    const { text, book_id } = req.body;

    const admin_id = req.user.id;
    const username = req.user.username;

    const foundedBook = await BookSchema.findById(book_id);

    if (!foundedBook) {
      throw CustomErrorHandler.NotFound("book not found");
    }

    await BookQuotesSchema.create({ text, book_id, admin_id });

    res.status(201).json({
      message: `New quote from ${foundedBook.title} added by admin ${username}`,
    });
  } catch (error) {
    next(error);
  }
}

// update book quote

async function updateBookQuote(req, res, next) {
  try {
    const { id } = req.params;

    const foundedBookQuote = await BookQuotesSchema.findById(id);

    if (!foundedBookQuote) {
      throw CustomErrorHandler.NotFound("book quote not found");
    }

    const { text } = req.body;

    if (
      foundedBookQuote.admin_id.toString() !== req.user.id &&
      req.user.role !== "superadmin"
    ) {
      throw CustomErrorHandler.Forbidden("you cannot update this quote");
    }

    await BookQuotesSchema.findByIdAndUpdate(id, { text });

    res.status(200).json({
      message: "book quote updated by admin",
    });
  } catch (error) {
    next(error);
  }
}

// delete book quote

async function deleteBookQuote(req, res, next) {
  try {
    const { id } = req.params;

    const foundedBookQuote = await BookQuotesSchema.findById(id);

    if (!foundedBookQuote) {
      throw CustomErrorHandler.NotFound("book quote not found");
    }

    if (
      foundedBookQuote.admin_id.toString() !== req.user.id &&
      req.user.role !== "superadmin"
    ) {
      throw CustomErrorHandler.Forbidden("you cannot delete this quote");
    }

    await BookQuotesSchema.findByIdAndDelete(id);

    res.status(200).json({
      message: "book quote deleted",
    });
  } catch (error) {
    next(error);
  }
}

module.exports = {
  addBookQuote,
  getAllBookQuotes,
  getOneBookQuote,
  updateBookQuote,
  deleteBookQuote,
};
