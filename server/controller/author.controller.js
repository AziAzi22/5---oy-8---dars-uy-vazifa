const AuthorSchema = require("../schema/author.schema");
const BookSchema = require("../schema/book.schema");
const CustomErrorHandler = require("../utils/custom-error-handler");

/// get all

const getAllAuthor = async (req, res, next) => {
  try {
    const authors = await AuthorSchema.find().populate({
      path: "books",
      select: "-_id -author_id title genre",
    });
    res.status(200).json(authors);
  } catch (error) {
    next(error);
  }
};

/// search

async function search(req, res, next) {
  try {
    const { name } = req.query;

    const searchingResult = await AuthorSchema.find({
      full_name: {
        $regex: name,
        $options: "i",
      },
    });

    res.status(200).json(searchingResult);
  } catch (error) {
    next(error);
  }
}

// add author

const addAuthor = async (req, res, next) => {
  try {
    const {
      full_name,
      birth_year,
      death_year,
      image_url,
      bio,
      genre,
      period,
      creativity,
      region,
    } = req.body;

    await AuthorSchema.create({
      full_name,
      birth_year,
      death_year,
      image_url,
      bio,
      genre,
      period,
      creativity,
      region,
    });

    res.status(201).json({
      message: "Added new Author",
    });
  } catch (error) {
    next(error);
  }
};

/// get one

const getOneAuthor = async (req, res, next) => {
  try {
    const { id } = req.params;
    const author = await AuthorSchema.findById(id).populate(
      "books",
      "-_id -author_id title genre"
    );

    if (!author) {
      throw CustomErrorHandler.NotFound("Author not found");
    }

    // const authorObj = author.toObject();
    // authorObj.books = books;

    // authorObj.books = books.map((book) => ({
    //   _id: book._id,
    //   title: book.title,
    // }));

    res.status(200).json(author);
  } catch (error) {
    next(error);
  }
};

// update author

async function updateAuthor(req, res, next) {
  try {
    const { id } = req.params;
    const author = await AuthorSchema.findById(id);

    if (!author) {
      throw CustomErrorHandler.NotFound("Author not found");
    }

    const {
      full_name,
      birth_year,
      death_year,
      image_url,
      bio,
      genre,
      period,
      creativity,
      region,
    } = req.body;

    await AuthorSchema.findByIdAndUpdate(id, {
      full_name,
      birth_year,
      death_year,
      image_url,
      bio,
      genre,
      period,
      creativity,
      region,
    });

    res.status(200).json({
      message: "Author updated",
    });
  } catch (error) {
    next(error);
  }
}

// delete

async function deleteAuthor(req, res, next) {
  try {
    const { id } = req.params;
    const author = await AuthorSchema.findById(id);

    if (!author) {
      throw CustomErrorHandler.NotFound("Author not found");
    }

    await AuthorSchema.findByIdAndDelete(id);

    res.status(200).json({
      message: "Author deleted",
    });
  } catch (error) {
    next(error);
  }
}

module.exports = {
  getAllAuthor,
  addAuthor,
  getOneAuthor,
  updateAuthor,
  deleteAuthor,
  search,
};
