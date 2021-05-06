const express = require("express");
const xss = require("xss");
const usersRouter = express.Router();
const UsersService = require("./users-service");
const { requireAuth } = require("../middleware/jwt-auth");

const serializeUser = (user) => {
  return {
    id: user.id,
    email: xss(user.email),
    username: xss(user.username),
    password: xss(user.password),
    dat_created: user.dat_created,
    user_type: user.user_type,
    address: user.address,
    city: user.city,
    state: user.state,
    zip: user.zip,
    user_url: user.user_url,
  };
};

usersRouter
  .route("/")
  .all((req, res, next) => {
    knexInstance = req.app.get("db");
    next();
  })
  .get(requireAuth, (req, res) => {
    res.json(serializeUser(req.user));
  })
  .post((req, res) => {
    const { username, password } = req.body;
    const REGEX_UPPER_LOWER_NUMBER_SPECIAL = /(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&])[\S]+/;
    for (const field of ["username", "password"]) {
      if (!req.body[field]) {
        return res.status(400).json({
          error: `Missing ${field}`,
        });
      }
    }

    if (password.length < 8) {
      return res.status(400).json({
        error: `Password must be 8 or more characters`,
      });
    }

    if (!REGEX_UPPER_LOWER_NUMBER_SPECIAL.test(password)) {
      return res.status(400).json({
        error: `Password must contain one upper case character, one lower case character, one number, and one special character`,
      });
    }
    UsersService.hasUserWithUsername(knexInstance, username).then((hasUser) => {
      if (hasUser) {
        return res.status(400).json({
          error: `Username already exists`,
        });
      }

      return UsersService.hashPassword(password).then((hashedPassword) => {
        const newUser = {
          username,
          password: hashedPassword,
        };

        return UsersService.insertUser(knexInstance, newUser).then((user) => {
          res.status(201).json(serializeUser(user));
        });
      });
    });
  });

module.exports = usersRouter;
