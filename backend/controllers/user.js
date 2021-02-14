const { validationResult } = require("express-validator");
const bcrypt = require("bcryptjs");
const User = require("../models/user");
const jwt = require("jsonwebtoken");
const { SECRET } = require("../config/config");

exports.singup = (req, res, next) => {
  const username = req.body.username;
  const email = req.body.email;
  const password = req.body.password;
  let userOut;

  validation(req);

  bcrypt
    .hash(password, 12)
    .then((hashedPassword) => {
      const user = new User({
        username: username,
        email: email,
        password: hashedPassword,
      });

      userOut = user;
      return user.save();
    })
    .then((result) => {
      res.status(201).json({
        message: "User Created Successfully",
        userId: userOut._id,
      });
    })
    .catch((err) => {
      if (!err.statusCode) {
        err.statusCode = 500;
      }
      next(err);
    });
};

exports.login = (req, res, next) => {
  const email = req.body.email;
  const password = req.body.password;
  let loadedUser;
  validation(req);

  User.findOne({ email: email })
    .then((user) => {
      if (!user) {
        const error = new Error("A user with this email could not be found.");
        error.statusCode = 401;
        throw error;
      }
      loadedUser = user;
      return bcrypt.compare(password, user.password);
    })
    .then((isEqual) => {
      if (!isEqual) {
        const error = new Error("Wrong password!");
        error.statusCode = 401;
        throw error;
      }

      const token = jwt.sign(
        {
          email: loadedUser.email,
          userId: loadedUser._id.toString(),
          username: loadedUser.username,
        },
        SECRET,
        {
          expiresIn: "1h",
        }
      );

      res.status(200).json({
        message: "User Logged In Successfully!!",
        username: loadedUser.username,
        userId: loadedUser._id.toString(),
        token: token,
      });
    })
    .catch((err) => {
      if (!err.statusCode) {
        err.statusCode = 500;
      }
      next(err);
    });
};

//VALIDATIO RESULT
const validation = (req) => {
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    const err = new Error("Validation failed");
    err.statusCode = 422;
    err.data = errors.array();
    throw err;
  }
};
