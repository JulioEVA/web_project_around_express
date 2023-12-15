const mongoose = require("mongoose");
const { testRegex } = require("../utils/utils");

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    minlength: 2,
    maxlength: 30,
  },
  about: {
    type: String,
    required: true,
    minlength: 2,
    maxlength: 30,
  },
  avatar: {
    type: String,
    required: true,
    validate: {
      validator: (value) => testRegex(value),
      message: "Invalid avatar URL",
    },
  },
});

module.exports = mongoose.model("user", userSchema);
