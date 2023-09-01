const mongoose = require("mongoose");

const subTaskSchema = new mongoose.Schema({
  title: { type: String, require: true },
  isCompleted: { type: Boolean, require: true },
});

const SubTask = mongoose.model("Subtask", subTaskSchema);

module.exports = SubTask;
