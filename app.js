const express = require("express");
const mongoose = require("mongoose");
const dotenv = require("dotenv").config();
const { errors } = require("celebrate");
const cors = require("cors");
const { requestLogger, errorLogger } = require("./middlewares/logger");
const cards = require("./routes/cards");
const users = require("./routes/users");
const { login, createUser } = require("./controllers/users");
const auth = require("./middlewares/auth");

const app = express();
const { PORT = 3000 } = process.env;

mongoose.connect("mongodb://localhost:27017/aroundb");
app.use(express.json());
app.use(cors());

/* const allowedCors = [
  "https://www.around.traveling.com.ar",
  "http://www.around.traveling.com.ar",
  "https://around.traveling.com.ar",
  "http://around.traveling.com.ar",
  "http://localhost:3000",
];
*/
app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE");
  res.header("Access-Control-Allow-Headers", "Content-Type, Authorization");
  next();
});

/*
app.use(
  cors({
    origin: (origin, callback) => {
      if (allowedCors.includes(origin)) {
        callback(null, true);
      } else {
        callback(new Error("Not allowed by CORS"));
      }
    },
  }),
); */

app.options("*", cors());

app.use(requestLogger);

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
