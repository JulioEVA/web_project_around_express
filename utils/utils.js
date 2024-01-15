/**
 * Checks the nature of an error and sends the appropriate response.
 * @param {*} err The error object
 * @param {*} res The response object
 */
module.exports.catchError = (err, res) => {
  switch (err.name) {
    case "ValidationError":
      res.status(400).send({ message: err.message });
      return;
    case "CastError":
      res.status(400).send({ message: "Invalid ID" });
      return;
    case "IncorrectCredentialsError":
      res.status(401).send({ message: err.message });
      return;
    case "ForbiddenError":
      res.status(403).send({ message: err.message });
      return;
    case "DocumentNotFoundError":
      res.status(404).send({
        message: `Document was not found, maybe try creating them in the database first?`,
      });
      return;
    default:
      console.error(err);
      res.status(500).send("Internal Server Error");
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
