const mongoose = require("mongoose");
const Task = require("./tasks_model");


const boardSchema = new mongoose.Schema({
  name: { type: String, require: true },
  tasks: [{ type: mongoose.Schema.Types.ObjectId, ref: "Task" }],
});

const Board = mongoose.model("board", boardSchema);

boardSchema.pre("remove", async function (next) {
  try {
    await Task.deleteMany({ _id: { $in: this.tasks } });
    next();
  } catch (error) {
    next(error);
  }
});

module.exports = Board;
