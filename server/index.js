const express = require("express");
const cors = require("cors");
const connectDB = require("./config/db.config");

const authorRouter = require("./router/author.routes");
const bookRouter = require("./router/book.routes");
const uploadRouter = require("./router/upload.routes");
const authRouter = require("./router/auth.routes");
const adminRouter = require("./router/admin.routes");
const errorMiddleware = require("./middleware/error.middleware");
const cookieParser = require("cookie-parser");
const bookQuotesRouter = require("./router/book-qutes.routes");

require("dotenv").config();

const app = express();

app.use(cors({ origin: true, credentials: true }));
app.use(express.json());
app.use(cookieParser());

connectDB();

// routes
app.use(authorRouter);
app.use(bookRouter);
app.use(uploadRouter);
app.use(authRouter);
app.use(adminRouter);
app.use(bookQuotesRouter);

// error handler

app.use(errorMiddleware); 

// multer/
app.use("/images", express.static("upload/images"));

const PORT = +process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log("Server going on", PORT);
});
