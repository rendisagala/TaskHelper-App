const User = require("../models/users");
const bcrypt = require("bcrypt");
const { v4: uuidv4 } = require("uuid");
const jwt = require("jsonwebtoken");
require("dotenv").config();
const {
  validation,
  usernameExist,
  emailExist,
} = require("../middleware/validation");

let controller = {
  register: async (req, res) => {
    try {
      const email = req.body.email;
      const username = req.body.username;
      const password = req.body.password;
      // validate
      const { error } = await validation(req.body);

      const userExist = await User.find({ username: username });
      const emailExist = await User.find({ email: email });
      if (error) {
        req.flash("usernameError", error.details[0].message);
        res.redirect("/register");
      } else if (emailExist.length > 0) {
        req.flash("emailError", "Email already exist");
        res.redirect("/register");
      } else if (userExist.length > 0) {
        req.flash("usernameError", "Username already exist");
        res.redirect("/register");
      } else {
        const hashedPassword = await bcrypt.hash(req.body.password, 10);

        const inputUser = new User({
          id: uuidv4(),
          email: req.body.email,
          username: req.body.username,
          password: hashedPassword,
          created: Date.now().toString(),
        });
        inputUser.save((err, user) => {
          if (err) {
            return res.redirect("/register");
          }
          console.log(user);
          return res.redirect("/login");
        });
      }
    } catch (error) {
      console.log(error);
    }
  },
  login: async (req, res) => {
    try {
      const username = req.body.username;
      const password = req.body.password;

      const getUsername = await User.findOne({
        username: username,
      }).clone();
      if (getUsername) {
        const match = bcrypt.compareSync(password, getUsername.password);
        if (!match) {
          req.flash("error", "Username or password incorrect");
          res.redirect("/login");
        } else {
          const token = jwt.sign(
            {
              exp: Math.floor(Date.now() / 1000) + 60 * 60,
              username: getUsername.username,
            },
            process.env.SECRET_TOKEN
          );
          res.header("auth-token", token);
          req.flash("success", "You are logged in.");

          console.log(`LOGGED IN`);
        }
      } else {
        req.flash("error", "Username or password incorrect");
        res.redirect("/login");
      }
    } catch (error) {
      res.redirect("/login");
    }
  },
  logout: (req, res) => {
    req.logOut();
    res.redirect("/login");
  },
  showLogin: (req, res) => {
    res.render("login", {
      error: req.flash("error"),
      success: req.flash("success"),
    });
  },
  showIndex: (req, res) => {
    res.render("index");
  },
  showRegister: (req, res) => {
    res.render("register", {
      usernameError: req.flash("usernameError"),
      emailError: req.flash("emailError"),
      validateError: req.flash("validateError"),
    });
  },
};

module.exports = controller;
