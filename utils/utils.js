const ValidationError = require("../errors/ValidationError");
const DocumentNotFoundError = require("../errors/DocumentNotFoundError");
const ForbiddenError = require("../errors/ForbiddenError");
const IncorrectCredentialsError = require("../errors/IncorrectCredentialsError");
const CastError = require("../errors/CastError");

/**
 * Checks the nature of an error and sends the appropriate response.
 * @param {*} err The error object
 * @param {*} res The response object
 */
module.exports.catchError = (err, req, res, next) => {
  switch (err.name) {
    case "ValidationError":
      return next(new ValidationError(err.message));
    case "CastError":
      return next(new CastError("Invalid ID"));
    case "IncorrectCredentialsError":
      return next(new IncorrectCredentialsError(err.message));
    case "ForbiddenError":
      return next(new ForbiddenError(err.message));
    case "DocumentNotFoundError":
      return next(new DocumentNotFoundError(err.message));
    default:
      return next(err);
  }
};

/**
 * Checks if a string is a valid URL.
 * @param {*} value The string to check
 */
module.exports.validateURL = function (value) {
  const urlRegex =
    /^(https?:\/\/)[-a-zA-Z0-9@:%._+~#=]{2,256}\.[a-z]{2,6}\b([-a-zA-Z0-9@:%_+.~#?& //=]*)$/;
  return urlRegex.test(value);
};

module.exports.validateEmail = function (value) {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(value);
};
