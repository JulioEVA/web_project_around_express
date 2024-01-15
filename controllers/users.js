const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const User = require("../models/user");
const { catchError } = require("../utils/utils");

const { NODE_ENV, JWT_SECRET } = process.env;

/**
 * Validates user permissions.
 * @param {*} req The request object
 * @param {*} res The response object
 */
async function validateUserPermissions(req, res) {
  return User.findById(req.user._id)
    .orFail()
    .then((user) => {
      if (user._id !== req.user._id) {
        res.status(403).send({ message: "Forbidden" });
        const err = new Error("Forbidden");
        err.message = "ForbiddenError";
        throw err;
      }
    })
    .catch((err) => catchError(err, res));
}

/**
 * Gets an user by ID from the database
 * @param {*} req The request object
 * @param {*} res The response object
 */
module.exports.getUser = (req, res) => {
  const { userId } = req.params;
  User.findById(userId)
    .orFail()
    .then((user) => {
      res.send(user);
    })
    .catch((err) => catchError(err, res));
};

/**
 * Gets all users from the database.
 * @param {*} req The request object
 * @param {*} res The response object
 */
module.exports.getUsers = (req, res) => {
  User.find({})
    .orFail()
    .then((users) => {
      res.send(users);
    })
    .catch((err) => catchError(err, res));
};

/**
 * Creates an user in the database.
 * @param {*} req The request object
 * @param {*} res The response object
 */
module.exports.createUser = (req, res) => {
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
        .catch((err) => catchError(err, res));
    })
    .catch((err) => catchError(err, res));
};

/**
 * Updates an user in the database.
 * @param {*} req The request object
 * @param {*} res The response object
 */
module.exports.updateUser = (req, res) => {
  const { name, about } = req.body;

  validateUserPermissions(req, res).catch((err) => catchError(err, res));

  User.findByIdAndUpdate(
    req.user._id,
    { name, about },
    { new: true, runValidators: true },
  )
    .orFail()
    .then((user) => {
      res.send(user);
    })
    .catch((err) => catchError(err, res));
};

/**
 * Updates an user's avatar in the database.
 * @param {*} req The request object
 * @param {*} res The response object
 */
module.exports.updateAvatar = (req, res) => {
  const { avatar } = req.body;

  validateUserPermissions(req, res).then((err) => catchError(err, res));

  User.findByIdAndUpdate(
    req.user._id,
    { avatar },
    { new: true, runValidators: true },
  )
    .orFail()
    .then((user) => {
      res.send(user);
    })
    .catch((err) => catchError(err, res));
};

/**
 * Logs in an user.
 * @param {*} req The request object
 * @param {*} res The response object
 */
module.exports.login = (req, res) => {
  const { email, password } = req.body;

  User.findUserByCredentials(email, password)
    .then((user) => {
      res.send({
        token: jwt.sign(
          { _id: user._id },
          NODE_ENV === "production" ? JWT_SECRET : "dev-secret",
          {
            expiresIn: "7d",
          },
        ),
      });
    })
    .catch((err) => catchError(err, res));
};

/**
 * Gets the current user.
 * @param {*} req The request object
 * @param {*} res The response object
 */
module.exports.getMe = (req, res) => {
  User.findById(req.user._id)
    .orFail()
    .then((user) => {
      res.send(user);
    })
    .catch((err) => catchError(err, res));
};
