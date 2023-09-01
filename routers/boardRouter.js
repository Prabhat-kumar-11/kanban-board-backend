const { Router } = require("express");
const Board = require("../models/board_model");
const BoardRouter = Router();

BoardRouter.post("/", async (req, res) => {
  try {
    const { name } = req.body;
    const board = await Board.create({
      name,
    });
    await board.save();
    res.status(201).json({ success: true, board });
  } catch (error) {
    res.status(500).json({ error: "Internal server error" });
  }
});

BoardRouter.get("/", async (req, res) => {
  try {
    const boards = await Board.find();

    res.status(201).json({ success: true, boards });
  } catch (error) {
    res.status(500).json({ error: "cannot get data" });
  }
});

BoardRouter.patch("/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const { name } = req;
    const board = await Board.findByIdAndUpdate(id, { name });
    await board.save();
    if (!board) {
      return res.status(404).json({ error: "Board not found" });
    }
  } catch (error) {
    res.status(500).json({ error: "cannot update data" });
  }
});

BoardRouter.delete("/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const deletedBoard = await Board.findByIdAndDelete(id);

    if (!deletedBoard) {
      return res.status(404).json({ error: "Board not found" });
    }
    res.status(200).json({ msg: `The Board with id:${id} has been deleted` });
  } catch (error) {
    res.status(500).json({ error: "Error deleting board" });
  }
});

module.exports = BoardRouter;
