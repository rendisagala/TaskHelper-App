require("dotenv").config();
const mongoose = require("mongoose");
const timeElapsed = Date.now();
const today = new Date(timeElapsed);

mongoose
  .connect(process.env.DB_URL, {
    useNewUrlParser: true,
  })
  .then((connect) => console.log("connected to mongodb.."))
  .catch((e) => console.log("could not connect to mongodb", e));

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
    type: String,
    required: true,
    default: today.toLocaleDateString(),
  },
});

const User = mongoose.model("User", userSchema);

module.exports = User;
