const Joi = require("joi");

exports.BookValidator = async function (data) {
  const schema = Joi.object({
    title: Joi.string()
      .trim()
      .pattern(/^[a-zA-Z0-9 ]{3,80}$/)
      .required(),
    pages: Joi.number().min(3).integer().required(),
    published_year: Joi.number()
      .integer()
      .max(new Date().getFullYear())
      .required(),
    image_url: Joi.string().min(15).required(),
    description: Joi.string().max(10000).required(),
    genre: Joi.array()
      .items(
        Joi.string()
          .lowercase()
          .valid(
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
            "young adult"
          )
      )
      .required(),
    period: Joi.string()
      .lowercase()
      .valid(
        "temuriylar davri",
        "jadid adabiyoti",
        "sovet davri",
        "mustaqillik davri"
      )
      .required(),
    published_home: Joi.string().min(3).max(100).required(),
    publishers_phone_number: Joi.string().required(),
    author_id: Joi.string().max(24).required(),
  });

  return schema.validate(data, { abortEarly: false });
};
