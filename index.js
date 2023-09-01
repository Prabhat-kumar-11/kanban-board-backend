const express = require("express");
const connectDB = require("./db")

const cors = require("cors");
const BoardRouter = require("./routers/boardRouter");
const TaskRouter = require("./routers/tasksRouter");
const SubTaskRouter = require("./routers/subtaskRouter");
const KanbanRouter = require("./routers/kanbanRouter");


const app = express();
app.use(express.json());
app.use(cors());

app.get("/", (req, res) => {
  res.send("Kanban board");
});

app.use("/board", BoardRouter);
app.use("/task" ,TaskRouter);
app.use("/subtask",SubTaskRouter);
app.use("/kanban-data", KanbanRouter);

app.listen(8080, async () => {
  try {
    await connectDB();
    console.log("mongodb connected..");
  } catch {
    console.log("error in mongodb connection ");
  }

  console.log("server is start");
});
