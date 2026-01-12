const { text } = require("express");
const Joi = require("joi");

exports.BookQuotesValidator = (data) =>{
    const schema = Joi.object({
        text: Joi.string().trim().min(20).max(1000).required(),
        book_id: Joi.string().max(24).required(),
    })

      return schema.validate(data, { abortEarly: false });
}