const router = require("express").Router();
const { celebrate, Joi } = require("celebrate");
const { validateURL } = require("../utils/utils");

const {
  getCards,
  createCard,
  deleteCard,
  likeCard,
  dislikeCard,
} = require("../controllers/cards");

/**
 * Validates the card ID.
 */
function validateCardId(req, res, next) {
  return celebrate({
    params: Joi.object().keys({
      cardId: Joi.string().hex().length(24),
    }),
  })(req, res, next);
}

router.get("/", getCards);
router.post(
  "/",
  celebrate({
    body: Joi.object().keys({
      name: Joi.string().required().min(2).max(30),
      link: Joi.string()
        .required()
        .custom((value, helpers) => {
          if (!validateURL(value)) {
            return helpers.message("Invalid URL format");
          }
          return value;
        }),
      owner: Joi.string().hex().length(24),
    }),
  }),
  createCard,
);
router.put("/:cardId/likes", validateCardId, likeCard);
router.delete("/:cardId/likes", validateCardId, dislikeCard);
router.delete("/:cardId", validateCardId, deleteCard);

module.exports = router;
