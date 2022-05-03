const User = require("../models/users");
const verifyToken = require("../middleware/verifyToken");
const bcrypt = require("bcrypt");
const { v4: uuidv4 } = require("uuid");
const jwt = require("jsonwebtoken");
require("dotenv").config();
const validation = require("../middleware/validation");

let controller = {
  register: async (req, res) => {
    try {
      const email = req.body.email;
      const username = req.body.username;
      const password = req.body.password;
      // validate
      const { error } = validation(req.body);
      if (error) return console.log(error);
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
    } catch (error) {
      console.log(error);
    }
  },
  login: async (req, res, next) => {
    try {
      const username = req.body.username;
      const password = req.body.password;

      const getUsername = await User.findOne(
        {
          username: username,
        },
        (err, result) => {
          if (err) res.send("WRONG USERNAME");
        }
      ).clone();
      const match = bcrypt.compareSync(password, getUsername.password);
      if (!match) {
        req.flash("error", "username or password incorrect");
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
        console.log("Login Succes!!");
        console.log(token);
        next();
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
    res.render("login", { message: req.flash("error") });
  },
  showIndex: (req, res) => {
    res.render("index");
  },
  showRegister: (req, res) => {
    res.render("register");
  },
};

module.exports = controller;
