const router = require("express").Router();
const fs = require("fs");
const path = require("path");

// The path to our json file
const dataPath = path.join(__dirname, "../data/users.json");

function checkError(err, res) {
  if (err) {
    console.error(err);
    res.status(500).send("Internal Server Error");
  }
}

router.get("/users/:id", (req, res) => {
  fs.readFile(dataPath, "utf8", (err, file) => {
    checkError(err, res);

    const { id } = req.params;
    const users = JSON.parse(file);
    const user = users.find((currentUser) => currentUser._id === id);

    if (!user) {
      res.status(404).send({ message: `User ID ${id} not found` });
      return;
    }

    res.send(user);
  });
});

router.get("/users", (req, res) => {
  fs.readFile(dataPath, "utf8", (err, file) => {
    checkError(err, res);

    const users = JSON.parse(file);
    res.send(users);
  });
});

module.exports = router;
