require("dotenv").config();
const mongoose = require("mongoose");
const timeElapsed = Date.now();
const today = new Date(timeElapsed);
const { v4: uuidv4 } = require("uuid");

mongoose.connect(process.env.DB_URL, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});
const db = mongoose.connection;
db.on("error", (error) => {
  console.log(error);
});
const taskSchema = new mongoose.Schema(
  {
    username: {
      type: String,
      required: true,
    },
    task: [
      {
        id: {
          type: String,
          required: true,
          default: uuidv4(),
        },
        name: {
          type: String,
          required: true,
          default: "Example Task",
        },
        date: {
          type: String,
          required: true,
          default: today.toLocaleDateString(),
        },
      },
    ],
  },
  {
    versionKey: false,
  }
);

const Task = mongoose.model("Task", taskSchema);

module.exports = Task;
