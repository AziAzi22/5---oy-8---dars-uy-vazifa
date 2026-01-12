const { Schema, model } = require("mongoose");

const bookQuotes = new Schema(
  {
    text: {
      type: String,
      set: (value) => value.trim(),
      minLength: [20, "length must be minimum 20 characters"],
      maxLength: [1000, "length must be maximum 1000 characters"],
      required: true,
    },
    book_id: {
      type: Schema.ObjectId,
      ref: "Book",
      required: true,
    },
    admin_id: {
      type: Schema.ObjectId,
      ref: "Auth",
      required: true,
    },
  },
  {
    timestamps: true,
    versionKey: false,
  }
);

const BookQuotesSchema = model("BookQuotes", bookQuotes);

module.exports = BookQuotesSchema;
