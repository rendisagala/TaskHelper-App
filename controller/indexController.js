const auth = require("../middleware/auth");
const Task = require("../models/tasks");
const { v4: uuidv4 } = require("uuid");
const timeElapsed = Date.now();
const today = new Date(timeElapsed);
const { validationTask } = require("../middleware/validation");

exports.showIndex = [
  auth,
  (req, res) => {
    Task.findOne({ username: req.username })
      .lean()
      .exec(function (err, data) {
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
  async (req, res) => {
    const { error } = await validationTask(req.body);
    if (error) {
      console.log(error.details[0].message);
      return res.redirect("/index");
    } else {
      const addTask = Task.findOneAndUpdate(
        { username: req.username },
        {
          $push: {
            task: {
              id: uuidv4(),
              name: req.body.task,
              date: today.toLocaleDateString(),
            },
          },
        },
        (error, data) => {
          if (error) {
            console.log(error);
          } else {
            console.log(data);
          }
        }
      );

      return res.redirect("/index");
    }
  },
];
exports.removeTask = [
  auth,
  (req, res) => {
    const removeTask = Task.updateOne(
      { username: req.username },
      { $pull: { task: { id: { $in: req.params.id } } } },
      (error, data) => {
        if (error) {
          console.log(error);
        } else {
          console.log(data);
          res.redirect("/index");
        }
      }
    );
  },
];
exports.removeAllTask = [
  auth,
  (req, res) => {
    const removeAllTask = Task.update(
      { username: req.username },
      { $set: { task: [] } },
      (error, data) => {
        if (error) {
          console.log(error);
        } else {
          console.log(data);
          res.redirect("/index");
        }
      }
    );
  },
];
