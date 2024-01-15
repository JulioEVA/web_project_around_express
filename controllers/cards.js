const Card = require("../models/card");
const { catchError } = require("../utils/utils");

/**
 * Gets all cards from the database.
 * @param {*} req The request object
 * @param {*} res The response object
 */
module.exports.getCards = (req, res) => {
  Card.find({})
    .orFail()
    .then((cards) => {
      res.send(cards);
    })
    .catch((err) => catchError(err, res));
};

/**
 * Creates a card in the database.
 * @param {*} req The request object
 * @param {*} res The response object
 */
module.exports.createCard = (req, res) => {
  const { name, link, owner } = req.body;

  Card.create({ name, link, owner })
    .then((card) => {
      res.send(card);
    })
    .catch((err) => catchError(err, res));
};

/**
 * Deletes a card from the database.
 * @param {*} req The request object
 * @param {*} res The response object
 */
module.exports.deleteCard = (req, res) => {
  const { cardId } = req.params;
  Card.findById(cardId)
    .orFail()
    .then((card) => {
      if (card.owner.toString() !== req.user._id) {
        res.status(403).send({ message: "Forbidden" });
      }
    })
    .catch((err) => catchError(err, res));

  Card.findByIdAndDelete(cardId)
    .orFail()
    .then((card) => {
      res.send(card);
    })
    .catch((err) => catchError(err, res));
};

/**
 * Adds a like to a card in the database
 * @param {*} req The request object
 * @param {*} res The response object
 */
module.exports.likeCard = (req, res) => {
  const { cardId } = req.params;
  Card.findByIdAndUpdate(
    cardId,
    { $addToSet: { likes: req.user._id } },
    { new: true, runValidators: true },
  )
    .orFail()
    .then((card) => {
      res.send(card);
    })
    .catch((err) => catchError(err, res));
};

/**
 * Removes a like from a card in the database
 * @param {*} req The request object
 * @param {*} res The response object
 */
module.exports.dislikeCard = (req, res) => {
  const { cardId } = req.params;
  Card.findByIdAndUpdate(
    cardId,
    { $pull: { likes: req.user._id } },
    { new: true, runValidators: true },
  )
    .orFail()
    .then((card) => {
      res.send(card);
    })
    .catch((err) => catchError(err, res));
};
