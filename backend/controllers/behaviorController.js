const Behavior = require('../models/Behavior');
const Todo = require('../models/Todo');
const asyncHandler = require('express-async-handler');

const getTopBehaviors = asyncHandler(async (req, res) => {
  const behaviors = await Behavior.aggregate([
    { $match: { user: req.user._id } },
    {
      $lookup: {
        from: 'todos',
        localField: '_id',
        foreignField: 'behavior',
        as: 'todos',
      },
    },
    {
      $project: {
        name: 1,
        todoCount: { $size: '$todos' },
      },
    },
    { $sort: { todoCount: -1 } },
    { $limit: 5 },
  ]);

  res.json(behaviors);
});

const getBehaviors = asyncHandler(async (req, res) => {
  const behaviors = await Behavior.find({ user: req.user._id });
  res.json(behaviors);
});

const createBehavior = asyncHandler(async (req, res) => {
  const { name } = req.body;

  const behavior = await Behavior.create({
    name,
    user: req.user._id,
  });

  res.status(201).json(behavior);
});

const deleteBehavior = asyncHandler(async (req, res) => {
  const behavior = await Behavior.findById(req.params.id);

  if (!behavior) {
    res.status(404);
    throw new Error('Behavior not found');
  }

  if (behavior.user.toString() !== req.user._id.toString()) {
    res.status(401);
    throw new Error('Not authorized');
  }

  await Todo.deleteMany({ behavior: behavior._id });
  await behavior.remove();
  res.json({ message: 'Behavior removed' });
});

module.exports = {
  getTopBehaviors,
  getBehaviors,
  createBehavior,
  deleteBehavior,
};