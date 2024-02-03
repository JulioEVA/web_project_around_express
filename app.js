const express = require("express");
const mongoose = require("mongoose");
const dotenv = require("dotenv").config();
const { errors } = require("celebrate");
const cors = require("cors");
const bodyParser = require("body-parser");
const { requestLogger, errorLogger } = require("./middlewares/logger");
const cards = require("./routes/cards");
const users = require("./routes/users");
const { login, createUser } = require("./controllers/users");
const auth = require("./middlewares/auth");

const app = express();
const { PORT = 3000 } = process.env;

app.use(cors());
app.options("*", cors());

mongoose.connect("mongodb://localhost:27017/aroundb");
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.use(requestLogger);

app.get("/crash-test", () => {
  setTimeout(() => {
    throw new Error("El servidor va a caer");
  }, 0);
});

app.post("/signin", login);
app.post("/signup", createUser);

app.use("/cards", auth, cards);
app.use("/users", auth, users);

app.use(errorLogger);

app.use(errors());

app.use((req, res) => {
  res.status(404).send({ message: "Requested resource not found" });
});
app.use((err, req, res, next) => {
  const { statusCode = 500, message } = err;
  res.status(statusCode).send({
    message:
      statusCode === 500 ? "An error has ocurred in the server" : message,
  });
});

app.listen(PORT, () => {
  console.log(`App listening on port ${PORT}`);
});
