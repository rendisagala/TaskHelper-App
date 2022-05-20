const User = require("../models/users");
const Task = require("../models/tasks");
const bcrypt = require("bcrypt");
const { v4: uuidv4 } = require("uuid");
const jwt = require("jsonwebtoken");
require("dotenv").config();
const { validation } = require("../middleware/validation");
const auth = require("../middleware/auth");

exports.showLogin = [
  (req, res) => {
    res.render("login", {
      error: req.flash("error"),
      success: req.flash("success"),
    });
  },
];

exports.showRegister = [
  (req, res) => {
    res.render("register", {
      error: req.flash("error"),
    });
  },
];

exports.register = [
  async (req, res) => {
    try {
      const email = req.body.email;
      const username = req.body.username;
      const password = req.body.password;
      // validate
      const { error } = await validationRegister(req.body);

      const userExist = await User.find({ username: username });
      const emailExist = await User.find({ email: email });
      if (error) {
        req.flash("error", error.details[0].message);
        res.redirect("/register");
      } else if (emailExist.length > 0) {
        req.flash("error", "Email already exist");
        res.redirect("/register");
      } else if (userExist.length > 0) {
        req.flash("error", "Username already exist");
        res.redirect("/register");
      } else {
        const hashedPassword = await bcrypt.hash(password, 10);

        const inputUser = new User({
          id: uuidv4(),
          email: email,
          username: username,
          password: hashedPassword,
        });
        inputUser.save((err, user) => {
          if (err) {
            return res.redirect("/register");
          }
          console.log(user);
          return res.redirect("/login");
        });
        const taskUser = new Task({
          username: username,
        });
        taskUser.save();
      }
    } catch (error) {
      console.log(error);
    }
  },
];
exports.login = [
  async (req, res) => {
    try {
      // Get user input
      const { username, password } = req.body;

      // Validate user input
      if (!(username && password)) {
        req.flash("error", "Please provide username and password");
      }
      // Validate if user exist in mongodb
      const user = await User.findOne({ username });

      if (user && (await bcrypt.compare(password, user.password))) {
        // Create token
        const token = await jwt.sign(
          { username: username },
          process.env.SECRET_TOKEN,
          { algorithm: "HS256", expiresIn: "2h" }
        );
        console.log("LOGGED IN");
        res.cookie("access_token", token, {
          secure: true,
        });
        return res.redirect("/index");
      } else {
        req.flash("error", "Username or password incorrect");
        res.redirect("/login");
      }
    } catch (err) {
      console.log(err);
    }
  },
];
exports.logout = [
  auth,
  (req, res) => {
    const token = req.cookies.access_token;
    if (!token) {
      return res.redirect("/login");
    }
    res.clearCookie("access_token");
    return res.redirect("/login");
  },
];
