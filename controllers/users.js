const User = require("../models/user");
const { catchError } = require("../utils/utils");

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
  const { name, about, avatar } = req.body;

  User.create({ name, about, avatar })
    .then((user) => {
      res.send(user);
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
