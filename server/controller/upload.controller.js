const CustomErrorHandler = require("../utils/custom-error-handler");
const upload = require("../utils/multer");
require("dotenv").config();
const PORT = process.env.PORT;

// single upload

const singleUpload = (req, res, next) => {
  try {
    if (!req.file) {
      throw CustomErrorHandler.BadRequest("No file uploaded");
    }
    res.status(201).json({
      filePath: "http://localhost:" + PORT + "/images/" + req.file.filename,
    });
  } catch (error) {
    next(error);
  }
};

const multiUpload = (req, res, next) => {
  try {
    if (!req.files || req.files.length === 0) {
      throw CustomErrorHandler.BadRequest("No files uploaded");
    }
    res.status(201).json({
      filePath: req.files.map(
        (img) => "http://localhost:" + PORT + "/images/" + img.filename
      ),
    });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  singleUpload,
  multiUpload,
};
