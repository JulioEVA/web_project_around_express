const router = require("express").Router();
const { celebrate, Joi } = require("celebrate");
const { validateURL } = require("../utils/utils");

const {
  getUser,
  getUsers,
  updateUser,
  updateAvatar,
  getMe,
} = require("../controllers/users");

function validateUserId() {
  celebrate({
    params: Joi.object().keys({
      userId: Joi.string().hex().length(24),
    }),
  });
}

router.get("/:userId", validateUserId, getUser);
router.get("/me", getMe);
router.get("/", getUsers);
router.patch(
  "/me",
  celebrate({
    body: Joi.object().keys({
      name: Joi.string().required().min(2).max(30),
      about: Joi.string().required().min(2).max(30),
    }),
  }),
  updateUser,
);
router.patch(
  "/me/avatar",
  celebrate({
    body: Joi.object().keys({
      avatar: Joi.string()
        .required()
        .custom((value, helpers) => {
          if (!validateURL(value)) {
            return helpers.message("Invalid URL format");
          }
          return value;
        }),
    }),
  }),
  updateAvatar,
);

module.exports = router;
