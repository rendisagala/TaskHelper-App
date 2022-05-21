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
