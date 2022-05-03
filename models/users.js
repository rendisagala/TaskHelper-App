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

const userSchema = new mongoose.Schema({
  id: { type: String, required: true },
  username: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  created: {
    type: Date,
    required: true,
    default: Date.now(),
  },
});

const User = mongoose.model("User", userSchema);

module.exports = User;
