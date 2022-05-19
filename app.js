require("dotenv").config();
const express = require("express");
const routes = require("./routes/routes.js");
const session = require("express-session");
const sessionStorage = new session.MemoryStore();
const flash = require("connect-flash");
const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");

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
    cookie: { httpOnly: true, maxAge: 60000 },
    resave: false,
    saveUninitialized: false,
    rolling: true,
    store: sessionStorage,
  })
);
app.use(flash());
//route prefix
app.use(routes);

app.listen(process.env.PORT || 3000, () => {
  console.log(`Server is running on http://localhost:3000`);
});
