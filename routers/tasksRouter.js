const { Router } = require("express");
const Task = require("../models/tasks_model");
const Board = require("../models/board_model");

const TaskRouter = Router();

TaskRouter.post("/", async (req, res) => {
  try {
    const { title, boardId, descprition, status } = req.body;
    const board = Board.findById(boardId);
    const task = await Task.create({
      title,
      descprition,
      status,
    });
    await task.save();
    board.tasks.push(task.id)
    res.status(201).json({ success: true, task });
  } catch (error) {
    res.status(500).json({ error: "Internal server error" });
  }
});

TaskRouter.get("/", async (req, res) => {
  try {
    const tasks = await Task.find();

    res.status(201).json({ success: true, tasks });
  } catch (error) {
    res.status(500).json({ error: "cannot get data" });
  }
});

TaskRouter.patch("/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const { title, descprition, status } = req.body;
    const task = await Board.findByIdAndUpdate(id, {
      title,
      descprition,
      status,
    });
    await task.save();
   
  } catch (error) {
    res.status(500).json({ error: "cannot update data" });
  }
});

TaskRouter.delete("/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const deletedTask = await Task.findByIdAndDelete(id);
    if (!deletedTask) {
      return res.status(404).json({ error: "Task not found" });
    }
    res.status(200).json({ msg: `The Task with id:${id} has been deleted` });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

module.exports = TaskRouter;
