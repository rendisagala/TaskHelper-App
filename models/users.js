require("dotenv").config();
const mongoose = require("mongoose");
const timeElapsed = Date.now();
const today = new Date(timeElapsed);

const connectDatabase = async () => {
  try {
    mongoose.set("useNewUrlParser", true);

    await mongoose.connect(process.env.DB_URL);

    console.log("connected to database");
  } catch (error) {
    console.log(error);
    process.exit(1);
  }
};
connectDatabase();

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
