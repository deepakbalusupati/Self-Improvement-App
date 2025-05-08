const Todo = require('../models/Todo');
const Behavior = require('../models/Behavior');
const asyncHandler = require('express-async-handler');

const getTodos = asyncHandler(async (req, res) => {
  const behavior = await Behavior.findById(req.params.behaviorId);

  if (!behavior) {
    res.status(404);
    throw new Error('Behavior not found');
  }

  if (behavior.user.toString() !== req.user._id.toString()) {
    res.status(401);
    throw new Error('Not authorized');
  }

  const todos = await Todo.find({ behavior: behavior._id });
  res.json(todos);
});

const createTodo = asyncHandler(async (req, res) => {
  const behavior = await Behavior.findById(req.params.behaviorId);

  if (!behavior) {
    res.status(404);
    throw new Error('Behavior not found');
  }

  if (behavior.user.toString() !== req.user._id.toString()) {
    res.status(401);
    throw new Error('Not authorized');
  }

  const todo = await Todo.create({
    text: req.body.text,
    behavior: behavior._id,
    user: req.user._id,
  });

  res.status(201).json(todo);
});

const updateTodo = asyncHandler(async (req, res) => {
  const todo = await Todo.findById(req.params.id);

  if (!todo) {
    res.status(404);
    throw new Error('Todo not found');
  }

  if (todo.user.toString() !== req.user._id.toString()) {
    res.status(401);
    throw new Error('Not authorized');
  }

  todo.text = req.body.text || todo.text;
  todo.completed = req.body.completed !== undefined ? req.body.completed : todo.completed;

  const updatedTodo = await todo.save();
  res.json(updatedTodo);
});

const deleteTodo = asyncHandler(async (req, res) => {
  const todo = await Todo.findById(req.params.id);

  if (!todo) {
    res.status(404);
    throw new Error('Todo not found');
  }

  if (todo.user.toString() !== req.user._id.toString()) {
    res.status(401);
    throw new Error('Not authorized');
  }

  await todo.remove();
  res.json({ message: 'Todo removed' });
});

module.exports = {
  getTodos,
  createTodo,
  updateTodo,
  deleteTodo,
};