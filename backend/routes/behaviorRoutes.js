const express = require('express');
const router = express.Router();
const {
  getTopBehaviors,
  getBehaviors,
  createBehavior,
  deleteBehavior,
} = require('../controllers/behaviorController');
const { protect } = require('../middlewares/authMiddleware');

router.get('/top', protect, getTopBehaviors);
router.route('/').get(protect, getBehaviors).post(protect, createBehavior);
router.route('/:id').delete(protect, deleteBehavior);

module.exports = router;