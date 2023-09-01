const { Router } = require("express");
const SubTask = require("../models/subtasks_model");

const SubTaskRouter = Router();

SubTaskRouter.post("/", async (req, res) => {
  try {
    const { title, isCompleted } = req.body;
    const subtask = await SubTask.create({
      title,
      isCompleted,
    });

    await subtask.save();
    res.status(201).json({ success: true, subtask });
  } catch (error) {
    res.status(500).json({ error: "Internal server error" });
  }
});

SubTaskRouter.get("/", async (req, res) => {
  try {
    const subtasks = await SubTask.find();

    res.status(201).json({ success: true, subtasks });
  } catch (error) {
    res.status(500).json({ error: "cannot get data" });
  }
});

SubTaskRouter.patch("/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const { title, isCompleted } = req.body;
    const subtask = await SubTask.findByIdAndUpdate(id, {
      title,
      isCompleted,
    });
    await subtask.save();
  } catch (error) {
    res.status(500).json({ error: "cannot update data" });
  }
});
SubTaskRouter.delete("/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const deletedSubTask = await SubTask.findByIdAndDelete(id);
    if (!deletedSubTask) {
      return res.status(404).json({ error: "Task not found" });
    }
    res.status(200).json({ msg: `The Task with id:${id} has been deleted` });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

module.exports = SubTaskRouter
