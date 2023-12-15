const express = require("express");
const mongoose = require("mongoose");
const cards = require("./routes/cards");
const users = require("./routes/users");

const app = express();
const { PORT = 3000 } = process.env;

mongoose.connect("mongodb://localhost:27017/aroundb");
app.use(express.json());
app.use((req, res, next) => {
  req.user = {
    _id: "657bc669eb43009faff9b1ab",
  };

  next();
});

app.use("/cards", cards);
app.use("/users", users);

app.use((req, res) => {
  res.status(404).send({ message: "Requested resource not found" });
});

app.listen(PORT, () => {
  console.log(`App listening on port ${PORT}`);
});
