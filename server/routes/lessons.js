const express = require('express');
const {
  getLessons,
  getLesson,
  createLesson,
  updateLesson,
  deleteLesson,
  getLessonsByCategory,
  updateLessonProgress
} = require('../controllers/lessons');

const router = express.Router();

const { protect, authorize } = require('../middleware/auth');
const { trackProgress, checkPrerequisites } = require('../middleware/progress');

// Public routes
router.route('/category/:category').get(getLessonsByCategory);

// Routes that use authentication
router.route('/').get(getLessons).post(protect, authorize('admin'), createLesson);

router.route('/:id')
  .get(protect, checkPrerequisites, trackProgress, getLesson)
  .put(protect, authorize('admin'), updateLesson)
  .delete(protect, authorize('admin'), deleteLesson);

router.route('/:id/progress').put(protect, updateLessonProgress);

module.exports = router;