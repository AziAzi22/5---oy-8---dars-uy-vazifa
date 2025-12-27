const authorSchema = require("../schema/author.schema");
const BookQuotesSchema = require("../schema/book-quotes.schema");
const BookSchema = require("../schema/book.schema");
const CustomErrorHandler = require("../utils/custom-error-handler");

/// get all

const getAllBooks = async (req, res, next) => {
  try {
    const books = await BookSchema.find().populate("author_id", "-_id");
    // .select("-_id")
    // .select("title genre")
    // .limit(2)
    // .skip(1)

    res.status(200).json(books);
  } catch (error) {
    next(error);
  }
};

// add author

const addBook = async (req, res, next) => {
  try {
    const {
      title,
      pages,
      published_year,
      image_url,
      description,
      genre,
      period,
      published_home,
      publishers_phone_number,
      author_id,
    } = req.body;

    const author = await authorSchema.findById(author_id);
    if (!author) {
      throw CustomErrorHandler.BadRequest("Author not found");
    }

    await BookSchema.create({
      title,
      pages,
      published_year,
      image_url,
      description,
      genre: genre.split(",").map((g) => g.trim().toLowerCase()),
      period,
      published_home,
      publishers_phone_number,
      author_id,
    });

    res.status(201).json({
      message: "Added new Book",
    });
  } catch (error) {
    next(error);
  }
};

/// get one

const getOneBook = async (req, res, next) => {
  try {
    const { id } = req.params;
    const book = await BookSchema.findById(id);

    if (!book) {
      throw CustomErrorHandler.NotFound("Book not found");
    }

    const quotes = await BookQuotesSchema.find({ book_id: id })
      .select("text -_id")
      .populate("admin_id", "username -_id");

    const bookQuotes = quotes.map((q) => ({
      text: q.text,
      admin: q.admin_id.username,
    }));

    res.status(200).json({
      ...book.toObject(),
      quotes: bookQuotes,
    });
  } catch (error) {
    next(error);
  }
};

// update author

async function updateBook(req, res, next) {
  try {
    const { id } = req.params;
    const book = await BookSchema.findById(id);

    if (!book) {
      throw CustomErrorHandler.NotFound("Book not found");
    }

    const {
      title,
      pages,
      published_year,
      image_url,
      description,
      genre,
      period,
      published_home,
      publishers_phone_number,
      author_id,
    } = req.body;

    await BookSchema.findByIdAndUpdate(id, {
      title,
      pages,
      published_year,
      image_url,
      description,
      genre,
      period,
      published_home,
      publishers_phone_number,
      author_id,
    });

    res.status(200).json({
      message: "Book updated",
    });
  } catch (error) {
    next(error);
  }
}

// delete

async function deleteBook(req, res, next) {
  try {
    const { id } = req.params;
    const book = await BookSchema.findById(id);

    if (!book) {
      throw CustomErrorHandler.NotFound("Book not found");
    }

    await BookSchema.findByIdAndDelete(id);

    res.status(200).json({
      message: "Book deleted",
    });
  } catch (error) {
    next(error);
  }
}

module.exports = {
  getAllBooks,
  addBook,
  getOneBook,
  updateBook,
  deleteBook,
};
