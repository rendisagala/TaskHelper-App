require("dotenv").config();
const mongoose = require("mongoose");

mongoose.connect(process.env.DB_URL_USER, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});
const db = mongoose.connection;
db.on("error", (error) => {
  console.log(error);
});