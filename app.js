require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const routes = require("./routes/routes.js");
const session = require("express-session");
const flash = require("connect-flash");

const app = express();
const PORT = process.env.PORT;

// ejs setup
app.set("view engine", "ejs");
app.use(express.urlencoded({ extended: false }));
app.use(express.static("public"));
app.use(express.json());
app.use(
  session({
    secret: process.env.SECRET_SESSION,
    cookie: { maxAge: 60000 },
    resave: false,
    saveUninitialized: false,
  })
);
app.use(flash());

// database

//route prefix
app.use(routes);

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
