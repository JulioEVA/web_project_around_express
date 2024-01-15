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
module.exports.catchError = (err) => {
  switch (err.name) {
    case "ValidationError":
      return new ValidationError(err.message);
    case "CastError":
      return new CastError("Invalid ID");
    case "IncorrectCredentialsError":
      return new IncorrectCredentialsError(err.message);
    case "ForbiddenError":
      return new ForbiddenError(err.message);
    case "DocumentNotFoundError":
      return new DocumentNotFoundError(err.message);
    default:
      return err;
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
