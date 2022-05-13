const auth = require("../middleware/auth");

exports.showIndex = [
  auth,
  (req, res) => {
    res.render("index");
  },
];
