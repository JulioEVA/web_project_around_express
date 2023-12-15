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
    case "DocumentNotFoundError":
      res.status(404).send({ message: `Provided ID not found` });
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
module.exports.testRegex = function (value) {
  const urlRegex =
    /^(https?:\/\/)[-a-zA-Z0-9@:%._+~#=]{2,256}\.[a-z]{2,6}\b([-a-zA-Z0-9@:%_+.~#?& //=]*)$/;
  return urlRegex.test(value);
};
