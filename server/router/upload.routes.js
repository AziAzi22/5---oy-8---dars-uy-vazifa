const { Router } = require("express");
const {
  singleUpload,
  multiUpload,
} = require("../controller/upload.controller");
const uploadRouter = Router();
const upload = require("../utils/multer");
const authorization = require("../middleware/authorization");

uploadRouter.post(
  "/single_upload",
  authorization,
  upload.single("file"),
  singleUpload
);
uploadRouter.post(
  "/multi_upload",
  authorization,
  upload.array("files"),
  multiUpload
);

module.exports = uploadRouter;
