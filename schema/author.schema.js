const { Schema, model, set } = require("mongoose");

const AuthorSchema = new Schema(
  {
    full_name: {
      type: String,
      required: [true, "full name is required"],
      unique: true,
      trim: true,
      minLength: [4, "full name must minimum 4 letters"],
      maxLength: [45, "full name must maximum 50 letters"],
      match: [/^[a-zA-Z\s]+$/, "full name can only contain letters"],
      // alias: "to'liq ism",
    },
    birt_year: {
      type: Number,
      required: true,
      max: [
        new Date().getFullYear() - 18,
        "Author must be older than 18 years",
      ],
      trim: true,
    },
    death_year: {
      type: String,
      required: false,
      default: null,
      max: [
        new Date().getFullYear(),
        "Death year cannot be greater than current year",
      ],
      trim: true,
    },
    image_url: {
      type: String,
      required: false,
      minLength: [15, "length must be minimum 15 characters"],
    },
    bio: {
      type: String,
      required: false,
      maxLength: [1000, "length must be maximum 1000 characters"],
      trim: true,
    },
    genre: {
      type: String,
      required: false,
      trim: true,
      set: (genre) => genre.toLowerCase(),
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
          "childrens literatur",
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
    creativity: {
      type: String,
      required: true,
      maxLength: [1000, "length must be maximum 1000 characters"],
      trim: true,
    },
    region: {
      type: String,
      required: true,
      maxLength: [50, "length must be maximum 50 characters"],
      trim: true,
    },
  },
  {
    timestamps: true,
    versionKey: false,
    toJSON: {
      virtuals: true,
      transform: (_, ret) => {
        delete ret.id;
      },
    },
    toObject: {
      virtuals: true,
      transform: (_, ret) => {
        delete ret.id;
      },
    },
  }
);

AuthorSchema.virtual("books", {
  ref: "Book", // model name
  localField: "_id", // Author._id
  foreignField: "author_id", // Book.author_id
});

// Author.static.findByFullName = function (name) {
//   return this.find({ full_name: name });
// };

module.exports = model("Author", AuthorSchema);
