const AuthorSchema = require("../schema/author.schema");
const BookSchema = require("../schema/book.schema");

/// get all

const getAllAuthor = async (req, res) => {
  try {
    const authors = await AuthorSchema.find().populate({
      path: "books",
      select: "-_id -author_id title genre",
    });
    res.status(200).json(authors);
  } catch (error) {
    console.log(error.message);
  }
};

/// search

async function search(req, res) {
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
    console.log(error.message);
  }
}

// add author

const addAuthor = async (req, res) => {
  try {
    const {
      full_name,
      birt_year,
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
      birt_year,
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
    console.log(error.message);
  }
};

/// get one

const getOneAuthor = async (req, res) => {
  try {
    const { id } = req.params;
    const author = await AuthorSchema.findById(id).populate(
      "books",
      "-_id -author_id title genre"
    );

    if (!author) {
      return res.status(404).json({
        message: "Author not found",
      });
    }

    // const authorObj = author.toObject();
    // authorObj.books = books;

    // authorObj.books = books.map((book) => ({
    //   _id: book._id,
    //   title: book.title,
    // }));

    res.status(200).json(author);
  } catch (error) {
    console.log(error.message);
  }
};

// update author

async function updateAuthor(req, res) {
  try {
    const { id } = req.params;
    const author = await AuthorSchema.findById(id);

    if (!author) {
      return res.status(404).json({
        message: "Author not found",
      });
    }

    const {
      full_name,
      birt_year,
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
      birt_year,
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
    console.log(error.message);
  }
}

// delete

async function deleteAuthor(req, res) {
  try {
    const { id } = req.params;
    const author = await AuthorSchema.findById(id);

    if (!author) {
      return res.status(404).json({
        message: "Author not found",
      });
    }

    await AuthorSchema.findByIdAndDelete(id);

    res.status(200).json({
      message: "Author deleted",
    });
  } catch (error) {
    console.log(error.message);
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
