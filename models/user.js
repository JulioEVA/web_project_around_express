const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
const { validateURL, validateEmail } = require("../utils/utils");

const userSchema = mongoose.Schema({
  name: {
    type: String,
    required: true,
    minlength: 2,
    maxlength: 30,
    default: "Jacques Cousteau",
  },
  about: {
    type: String,
    required: true,
    minlength: 2,
    maxlength: 30,
    default: "Sailor, researcher",
  },
  avatar: {
    type: String,
    validate: {
      validator: validateURL,
      message: "Invalid URL format",
    },
    default:
      "https://practicum-content.s3.us-west-1.amazonaws.com/resources/moved_avatar_1604080799.jpg",
  },
  email: {
    type: String,
    required: true,
    validate: {
      validator: validateEmail,
      message: "Invalid email format",
    },
  },
  password: {
    type: String,
    required: true,
    select: false,
  },
});

/**
 * Finds an user by its email and password.
 * @param {*} email The email of the user
 * @param {*} password The password of the user
 * @returns The user
 */
userSchema.statics.findUserByCredentials = function findUserByCredentials(
  email,
  password,
) {
  return this.findOne({ email })
    .select("+password")
    .then((user) => {
      if (!user) {
        const err = new Error("Incorrect email or password");
        err.name = "IncorrectCredentialsError";
        return Promise.reject(err);
      }

      return bcrypt.compare(password, user.password).then((matched) => {
        if (!matched) {
          const err = new Error("Incorrect email or password");
          err.name = "IncorrectCredentialsError";
          return Promise.reject(err);
        }

        return user;
      });
    });
};

module.exports = mongoose.model("user", userSchema);
