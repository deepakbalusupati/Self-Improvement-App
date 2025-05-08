const express = require('express');
const router = express.Router();
const {
  getTodos,
  createTodo,
  updateTodo,
  deleteTodo,
} = require('../controllers/todoController');
const { protect } = require('../middlewares/authMiddleware');

router.route('/:behaviorId/todos').get(protect, getTodos).post(protect, createTodo);
router.route('/todos/:id').put(protect, updateTodo).delete(protect, deleteTodo);

module.exports = router;