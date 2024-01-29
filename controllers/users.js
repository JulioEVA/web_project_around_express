const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const User = require("../models/user");
const { catchError } = require("../utils/utils");
const ForbiddenError = require("../errors/ForbiddenError");

const { NODE_ENV, JWT_SECRET } = process.env;

/**
 * Validates user permissions.
 * @param {*} req The request object
 * @param {*} res The response object
 */
async function validateUserPermissions(req, res, next) {
  return User.findById(req.user._id)
    .orFail()
    .then((user) => {
      if (user._id !== req.user._id) {
        throw new ForbiddenError("You can only update your own profile");
      }
    })
    .catch((err) => next(catchError(err)));
}

/**
 * Gets an user by ID from the database
 * @param {*} req The request object
 * @param {*} res The response object
 */
module.exports.getUser = (req, res, next) => {
  const { userId } = req.params;
  User.findById(userId)
    .orFail()
    .then((user) => {
      res.send(user);
    })
    .catch((err) => next(catchError(err)));
};

/**
 * Gets all users from the database.
 * @param {*} req The request object
 * @param {*} res The response object
 */
module.exports.getUsers = (req, res, next) => {
  User.find({})
    .orFail()
    .then((users) => {
      res.send(users);
    })
    .catch((err) => next(catchError(err)));
};

/**
 * Creates an user in the database.
 * @param {*} req The request object
 * @param {*} res The response object
 */
module.exports.createUser = (req, res, next) => {
  const {
    name = "Jacques Cousteau",
    about = "Sailor, researcher",
    avatar = "https://practicum-content.s3.us-west-1.amazonaws.com/resources/moved_avatar_1604080799.jpg",
    email,
    password,
  } = req.body;

  bcrypt
    .hash(password, 10)
    .then((hash) => {
      User.create({
        name,
        about,
        avatar,
        email,
        password: hash,
      })
        .then((user) => {
          res.send(user);
        })
        .catch((err) => next(catchError(err)));
    })
    .catch((err) => next(catchError(err)));
};

/**
 * Updates an user in the database.
 * @param {*} req The request object
 * @param {*} res The response object
 */
module.exports.updateUser = (req, res, next) => {
  const { name, about } = req.body;

  validateUserPermissions(req, res).catch((err) => next(catchError(err)));

  User.findByIdAndUpdate(
    req.user._id,
    { name, about },
    { new: true, runValidators: true },
  )
    .orFail()
    .then((user) => {
      res.send(user);
    })
    .catch((err) => next(catchError(err)));
};

/**
 * Updates an user's avatar in the database.
 * @param {*} req The request object
 * @param {*} res The response object
 */
module.exports.updateAvatar = (req, res, next) => {
  const { avatar } = req.body;

  validateUserPermissions(req, res).then((err) => next(catchError(err)));

  User.findByIdAndUpdate(
    req.user._id,
    { avatar },
    { new: true, runValidators: true },
  )
    .orFail()
    .then((user) => {
      res.send(user);
    })
    .catch((err) => next(catchError(err)));
};

/**
 * Logs in an user.
 * @param {*} req The request object
 * @param {*} res The response object
 */
module.exports.login = (req, res, next) => {
  const { email, password } = req.body;
  User.findUserByCredentials(email, password)
    .then((user) => {
      const token = jwt.sign(
        { _id: user._id.toString() },
        NODE_ENV === "production" ? JWT_SECRET : "dev-secret",
        { expiresIn: "7d" },
      );
      res.send({
        token,
      });
    })
    .catch((err) => next(catchError(err)));
};

/**
 * Gets the current user.
 * @param {*} req The request object
 * @param {*} res The response object
 */
module.exports.getMe = (req, res, next) => {
  User.findById(req.user._id)
    .orFail()
    .then((data) => {
      console.log("Response after getMe", data);
      return data.json();
    })
    .then((user) => {
      res.send(user);
    })
    .catch((err) => next(catchError(err)));
};
