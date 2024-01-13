const mongoose = require("mongoose");
const { celebrate, Joi } = require("celebrate");
const { validateURL, validateEmail } = require("../utils/utils");

const userSchema = celebrate(
  {
    body: Joi.object().keys({
      name: Joi.string().min(2).max(30),
      about: Joi.string().min(2).max(30),
      avatar: Joi.string().custom(validateURL),
      email: Joi.string().required().custom(validateEmail),
      password: Joi.string().required().min(6),
    }),
  },
  { abortEarly: false },
);

module.exports = mongoose.model("user", userSchema);
