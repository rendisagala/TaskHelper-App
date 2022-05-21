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
    date: {
      type: String,
      required: true,
      default: today.toLocaleDateString(),
    },
  },
});

const Task = mongoose.model("Task", taskSchema);

module.exports = Task;
