const Task = require("../models/Task");
const asyncWrapper = require("../middleware/async-wrapper");
const { createCustomError } = require("../errors/custom-error");

const getAllsTasks = asyncWrapper(async (req, res) => {
  const tasks = await Task.find({});
  res.status(200).json({ status: "success", tasks, total: tasks.length });
});

const createTask = asyncWrapper(async (req, res) => {
  const task = await Task.create(req.body);
  res.status(201).json({ task });
});

const getTask = asyncWrapper(async (req, res, next) => {
  const { id } = req.params;
  const task = await Task.findOne({ _id: id });

  if (!task) {
    return next(createCustomError(404, `No task with id: ${id}`));
  }
  res.status(200).json({ task });
});

const updateTask = asyncWrapper(async (req, res) => {
  const { id } = req.params;
  const task = await Task.findOneAndUpdate({ _id: id }, req.body, {
    new: true,
    runValidators: true,
  });

  if (!task) {
    return next(createCustomError(404, `No task with id: ${id}`));
  }
  res.status(200).json({ status: "success" });
});

const deleteTask = asyncWrapper(async (req, res) => {
  const { id } = req.params;
  const task = await Task.findOneAndDelete({ _id: id });

  if (!task) {
    return next(createCustomError(404, `No task with id: ${id}`));
  }
  res.status(200).json({ status: "success" });
});

module.exports = { getAllsTasks, createTask, getTask, updateTask, deleteTask };
