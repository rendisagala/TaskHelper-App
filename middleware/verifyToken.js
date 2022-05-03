const jwt = require("jsonwebtoken");
require("dotenv").config();

let auth = {
  verifyToken: (req, res, next) => {
    const token = req.header("auth-token");
    if (!token) console.log("NO TOKEN");
    try {
      const verify = jwt.verify(token, process.env.SECRET_TOKEN);
      req.user = verify;
      next();
    } catch (error) {
      res.redirect("/login");
    }
  },
};

module.exports = auth;
