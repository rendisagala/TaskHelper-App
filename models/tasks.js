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
const taskSchema = new mongoose.Schema({
  task: {
    type: String,
    trim: true,
  },
  done: {
    type: Boolean,
    default: false,
  },
});
