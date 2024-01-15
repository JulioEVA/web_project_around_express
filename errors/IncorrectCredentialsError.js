class IncorrectCredentialsError extends Error {
  constructor(message) {
    super(message);
    this.name = "IncorrectCredentialsError";
    this.statusCode = 401;
  }
}

module.exports = IncorrectCredentialsError;
