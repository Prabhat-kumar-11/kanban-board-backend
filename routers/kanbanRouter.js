const { Router } = require("express");
const Board = require("../models/board_model");
const KanbanRouter = Router();

const createBoardIfDoesntExist = async () => {
  const length = await Board.countDocuments();
  console.log(length, "sdf")
  try {
    if (length == 0) {
      const board = await Board.create({
        name: "Board 1",
      });

      await board.save();
    }
  } catch (err) {
    console.log(err);
  }
};

KanbanRouter.get("/", async (req, res) => {
  try {
    await createBoardIfDoesntExist();
    const data = await Board.find().populate({
      path: "tasks",
      populate: {
        path: "subtasks",
        model: "Subtask", // Model name for subtasks
      },
    });
    return res.json({ success: true, data: { boards: data } });
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "cannot get data" });
  }
});

module.exports = KanbanRouter;
