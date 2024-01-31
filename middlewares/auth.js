const jwt = require("jsonwebtoken");

const { NODE_ENV, JWT_SECRET } = process.env;

/**
 * Handles authentication errors.
 * @param {*} res The response object
 */
const handleAuthError = (res) => {
  res.status(403).send({ message: "Authentication error" });
};

/**
 * Extracts the token from the request header.
 * @param {*} header The request header
 */
const extractBearerToken = (header) => header.replace("Bearer ", "");

/**
 * Validates user permissions.
 * @param {*} req The request object
 * @param {*} res The response object
 */
module.exports = (req, res, next) => {
  const { authorization } = req.headers;

  if (!authorization || !authorization.startsWith("Bearer ")) {
    return handleAuthError(res);
  }

  const token = extractBearerToken(authorization);
  let payload;

  try {
    payload = jwt.verify(
      token,
      NODE_ENV === "production" ? JWT_SECRET : "dev-secret",
    );
  } catch (err) {
    return handleAuthError(res);
  }
  req.user = payload;

  next(req, res);
  return true;
};
