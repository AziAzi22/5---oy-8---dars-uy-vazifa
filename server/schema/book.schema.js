const { Schema, model } = require("mongoose");

const Book = new Schema(
  {
    title: {
      type: String,
      required: true,
      unique: true,
      set: (title) => title.trim().toUpperCase(),
      minLength: [3, "title must minimum 3 letters"],
      maxLength: [50, "title must maximum 50 letters"],
    },
    pages: {
      type: Number,
      required: true,
      min: [1, "pages must be greater than 0"],
      match: [/^\d+$/, "pages can only contain numbers"],
    },
    published_year: {
      type: Number,
      required: true,
      max: [
        new Date().getFullYear(),
        "published year cannot be greater than current year",
      ],
    },
    image_url: {
      type: String,
      required: false,
      minLength: [15, "length must be minimum 15 characters"],
    },
    description: {
      type: String,
      required: false,
      maxLength: [1000, "length must be maximum 1000 characters"],
      trim: true,
    },
    genre: {
      type: [String],
      required: false,
      enum: {
        values: [
          "romance",
          "detective",
          "horror",
          "crime",
          "fantasy",
          "science fiction",
          "biography",
          "adventure",
          "drama",
          "thriller",
          "mystery",
          "humor",
          "poetry",
          "autobiography",
          "philosophy",
          "medical",
          "history",
          "novel",
          "satire",
          "melodrama",
          "action",
          "epic",
          "travel",
          "education",
          "dystopian",
          "childrens literature",
          "young adult",
        ],
        message: "{VALUE} is not supported",
      },
    },
    period: {
      type: String,
      required: false,
      trim: true,
      set: (period) => period.toLowerCase(),
      enum: {
        values: [
          "temuriylar davri",
          "jadid adabiyoti",
          "sovet davri",
          "mustaqillik davri",
        ],
        message: "{VALUE} is not supported",
      },
    },
    published_home: {
      type: String,
      required: true,
      trim: true,
      minLength: [3, "length must be minimum 3 characters"],
      maxLength: [50, "length must be maximum 50 characters"],
    },

    publishers_phone_number: {
      type: String,
      required: false,
      validate: {
        validator: function (value) {
          return /^\+998 \d{2} \d{3} \d{2} \d{2}/.test(value);
        },
        message: "invalid phone number",
      },
    },
    author_id: {
      type: Schema.ObjectId,
      ref: "Author",
      required: true,
    },
  },
  {
    timestamps: true,
    versionKey: false,
  }
);

const BookSchema = model("Book", Book);

module.exports = BookSchema;
