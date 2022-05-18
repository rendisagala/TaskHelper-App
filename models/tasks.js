require("dotenv").config();
const mongoose = require("mongoose");
const timeElapsed = Date.now();
const today = new Date(timeElapsed);

mongoose.connect(process.env.DB_URL, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});
const db = mongoose.connection;
db.on("error", (error) => {
  console.log(error);
});
const taskSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
  },
  task: {
    id: {
      type: String,
      required: true,
    },
    name: {
      type: String,
      required: true,
    },
    done: {
      type: Boolean,
      default: false,
    },
    date: {
      type: String,
      required: true,
      default: today.toLocaleDateString(),
    },
    status: {
      type: String,
      required: true,
      default: "in progress",
    },
  },
});

const Task = mongoose.model("Task", taskSchema);

module.exports = Task;
