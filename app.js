const express = require("express");
const mongoose = require("mongoose");
const dotenv = require("dotenv").config();
const { errors } = require("celebrate");
const { requestLogger, errorLogger } = require("./middlewares/logger");
const cards = require("./routes/cards");
const users = require("./routes/users");
const { login, createUser } = require("./controllers/users");
const auth = require("./middlewares/auth");

const app = express();
const { PORT = 3000 } = process.env;

const allowedCors = [
  "https://around.traveling.com.ar",
  "http://around.traveling.com.ar",
  "http://api.around.traveling.com.ar",
  "localhost:3000",
];

app.use((req, res, next) => {
  const { origin } = req.headers;
  const { method } = req; // Save the HTTP method to the corresponding variable

  if (allowedCors.includes(origin)) {
    res.header("Access-Control-Allow-Origin", origin);
  }

  // Default value for the Access-Control-Methods header (allowing all request types)
  const DEFAULT_ALLOWED_METHODS = "GET,HEAD,PUT,PATCH,POST,DELETE";
  // Save the original request headers list
  const requestHeaders = req.headers["access-control-request-headers"];
  // If this is a preflight request, add the required headers
  if (method === "OPTIONS") {
    // Allow cross-origin requests of any type (default)
    res.header("Access-Control-Allow-Methods", DEFAULT_ALLOWED_METHODS);
    // Allow cross-origin requests with these headers
    res.header("Access-Control-Allow-Headers", requestHeaders);
    // Finish processing the request and return the result to the client
    return res.end();
  }

  return next();
});

mongoose.connect("mongodb://localhost:27017/aroundb");
app.use(express.json());

app.use(requestLogger);

app.post("/signin", login);
app.post("/signup", createUser);

app.use(auth);

app.use("/cards", cards);
app.use("/users", users);

app.use(errorLogger);

app.use(errors());

app.use((req, res) => {
  res.status(404).send({ message: "Requested resource not found" });
});
app.use((err, req, res, next) => {
  const { statusCode = 500, message } = err;
  res.status(statusCode).send({
    message:
      statusCode === 500 ? "Se ha producido un error en el servidor" : message,
  });
});

app.listen(PORT, () => {
  console.log(`App listening on port ${PORT}`);
});
