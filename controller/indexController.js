const auth = require("../middleware/auth");
const Task = require("../models/tasks");
const { v4: uuidv4 } = require("uuid");
const timeElapsed = Date.now();
const today = new Date(timeElapsed);

exports.showIndex = [
  auth,
  (req, res) => {
    Task.findOne({ username: req.username })
      .lean()
      .exec(function (err, data) {
        console.log(data.task);
        req.flash("username", req.username);
        res.render("index", {
          username: req.flash("username"),
          data: data.task,
        });
      });
  },
];

exports.addTask = [
  auth,
  (req, res) => {
    const addTask = Task.findOneAndUpdate(
      { username: req.username },
      {
        $push: {
          task: {
            id: uuidv4(),
            name: req.body.task,
            done: false,
            date: today.toLocaleDateString(),
            status: "in progress",
          },
        },
      },
      (error, success) => {
        if (error) {
          console.log(error);
        } else {
          console.log(success);
        }
      }
    );

    res.redirect("/index");
  },
];
exports.removeTask = [
  auth,
  (req, res) => {
    res.redirect("/index");
  },
];
exports.finishTask = [
  auth,
  (req, res) => {
    res.redirect("/index");
  },
];
