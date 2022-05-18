const jwt = require("jsonwebtoken");
require("dotenv").config();

const auth = (req, res, next) => {
  const token = req.cookies.access_token;
  if (!token) {
    return res.redirect("/login");
  }
  try {
    const data = jwt.verify(token, process.env.SECRET_TOKEN);
    req.username = data.username;
    return next();
  } catch {
    return res.redirect("/login");
  }
};

module.exports = auth;
