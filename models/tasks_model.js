const mongoose = require("mongoose");
const subTask = require("./subtasks_model");

const taskSchema = new mongoose.Schema({
  title: { type: String, require: true },
  descprition: { type: String, require: true },
  status: { type: String, enum: ["Todo", "Doing", "Done"], default: "Todo" },
  subtasks: [{ type: mongoose.Schema.Types.ObjectId, ref: "Subtask" }],
});

const Task = mongoose.model("Task", taskSchema);

taskSchema.pre("remove", async function (next) {
  try {
    await subTask.deleteMany({ _id: { $in: this.subtasks } });
    next();
  } catch (error) {
    next(error);
  }
});

module.exports = Task;




