require("dotenv").config();
const express = require("express");
const routes = require("./routes/routes.js");
const session = require("express-session");
const sessionStorage = new session.MemoryStore();
const flash = require("connect-flash");
const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");
import sslRedirect from "heroku-ssl-redirect";

const app = express();

// ejs setup
app.set("view engine", "ejs");
app.use(express.urlencoded({ extended: false }));
app.use(express.static("public"));
app.use(express.json());
app.use(bodyParser.json());
app.use(cookieParser());
app.use(
  session({
    name: process.env.SESSION_NAME,
    secret: process.env.SECRET_SESSION,
    cookie: { maxAge: 60000 },
    resave: false,
    saveUninitialized: false,
    rolling: true,
    store: sessionStorage,
  })
);
app.use(sslRedirect());
app.use(flash());
//route prefix
app.use(routes);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
