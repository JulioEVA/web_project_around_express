const ForbiddenError = require("../errors/ForbiddenError");
const Card = require("../models/card");
const { catchError } = require("../utils/utils");

/**
 * Gets all cards from the database.
 * @param {*} req The request object
 * @param {*} res The response object
 */
module.exports.getCards = (req, res, next) => {
  Card.find({})
    .orFail()
    .then((cards) => {
      res.send(cards);
    })
    .catch((err) => next(catchError(err)));
};

/**
 * Creates a card in the database.
 * @param {*} req The request object
 * @param {*} res The response object
 */
module.exports.createCard = (req, res, next) => {
  const { name, link, owner } = req.body;

  Card.create({ name, link, owner })
    .then((card) => {
      res.send(card);
    })
    .catch((err) => next(catchError(err)));
};

/**
 * Deletes a card from the database.
 * @param {*} req The request object
 * @param {*} res The response object
 */
module.exports.deleteCard = (req, res, next) => {
  const { cardId } = req.params;
  Card.findById(cardId)
    .orFail()
    .then((card) => {
      if (card.owner.toString() !== req.user._id) {
        throw new ForbiddenError("You can only delete your own cards");
      }
    })
    .catch((err) => next(catchError(err)));

  Card.findByIdAndDelete(cardId)
    .orFail()
    .then((card) => {
      res.send(card);
    })
    .catch((err) => next(catchError(err)));
};

/**
 * Adds a like to a card in the database
 * @param {*} req The request object
 * @param {*} res The response object
 */
module.exports.likeCard = (req, res, next) => {
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
    .catch((err) => next(catchError(err)));
};

/**
 * Removes a like from a card in the database
 * @param {*} req The request object
 * @param {*} res The response object
 */
module.exports.dislikeCard = (req, res, next) => {
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
    .catch((err) => next(catchError(err)));
};
