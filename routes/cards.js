const router = require("express").Router();
const fs = require("fs");
const path = require("path");

// The path to our json file
const dataPath = path.join(__dirname, "../data/cards.json");

router.get("/cards", (req, res) => {
  fs.readFile(dataPath, "utf8", (err, file) => {
    if (err) {
      console.error(err);
      res.status(500).send("Internal Server Error");
      return;
    }
    res.send(JSON.parse(file));
  });
});

module.exports = router;
