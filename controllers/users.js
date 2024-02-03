const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const User = require("../models/user");
const { catchError } = require("../utils/utils");

const { NODE_ENV, JWT_SECRET } = process.env;

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
    .catch((err) => catchError(err, req, res));
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
    .catch((err) => catchError(err, req, res));
};

/**
 * Creates an user in the database.
 * @param {*} req The request object
 * @param {*} res The response object
 */
module.exports.createUser = (req, res, next) => {
  const { name, about, avatar, email, password } = req.body;

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
    .catch((err) => catchError(err, req, res));
};

/**
 * Updates an user in the database.
 * @param {*} req The request object
 * @param {*} res The response object
 */
module.exports.updateUser = (req, res, next) => {
  const { name, about } = req.body;

  User.findByIdAndUpdate(
    req.user._id,
    { name, about },
    { new: true, runValidators: true },
  )
    .orFail()
    .then((user) => {
      res.send(user);
    })
    .catch((err) => catchError(err, req, res));
};

/**
 * Updates an user's avatar in the database.
 * @param {*} req The request object
 * @param {*} res The response object
 */
module.exports.updateAvatar = (req, res, next) => {
  const { avatar } = req.body;

  User.findByIdAndUpdate(
    req.user._id,
    { avatar },
    { new: true, runValidators: true },
  )
    .orFail()
    .then((user) => {
      res.send(user);
    })
    .catch((err) => catchError(err, req, res));
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
    .catch((err) => catchError(err, req, res));
};

/**
 * Gets the current user.
 * @param {*} req The request object
 * @param {*} res The response object
 */
module.exports.getMe = async (req, res, next) => {
  try {
    const user = await User.findById(req.user._id);
    res.status(200).send({ data: user });
  } catch (error) {
    next(catchError(error, req, res));
  }
};
