const express = require("express");
const { body } = require("express-validator");
const User = require("../models/user");

const router = express.Router();
const userController = require("../controllers/user");

router.post(
  "/signup",
  [
    body("username")
      .isLength({ min: 2 })
      .withMessage("Username is required , must be more than 3 caracter"),
    body("email")
      .isEmail()
      .withMessage("Please enter a valid email.")
      .custom((value, { req }) => {
        return User.findOne({ email: value }).then((user) => {
          if (user) {
            return Promise.reject("E-Mail address already exists!");
          }
        });
      })
      .normalizeEmail(),
    body("password")
      .isLength({ min: 6 })
      .withMessage("Password is required , must be more than 6 caracter"),
  ],
  userController.singup
);

router.post(
  "/login",
  [
    body("email").isEmail().withMessage("Please enter a valid email."),
    body("password")
      .isLength({ min: 6 })
      .withMessage("Password is required , must be more than 6 caracter"),
  ],
  userController.login
);

module.exports = router;
