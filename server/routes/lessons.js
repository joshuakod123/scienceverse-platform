// server/routes/lessons.js
const express = require('express');
const router = express.Router();
const {
  getLessons,
  getLesson,
  createLesson,
  updateLesson,
  deleteLesson,
  getLessonsByCourseAndUnit,
  getLessonsByCourse,
  getFullLesson,
  createBulkLessons
} = require('../controllers/lessons');

const { protect, authorize } = require('../middleware/auth');

// Public routes
router.get('/', getLessons);
router.get('/:id', getLesson);

// Protected routes - 로그인 필요
router.get('/course/:courseId', protect, getLessonsByCourse);
router.get('/course/:courseId/unit/:unitNumber', protect, getLessonsByCourseAndUnit);
router.get('/:id/full', protect, getFullLesson);

// Admin only routes
router.post('/', protect, authorize('admin'), createLesson);
router.post('/bulk', protect, authorize('admin'), createBulkLessons);
router.put('/:id', protect, authorize('admin'), updateLesson);
router.delete('/:id', protect, authorize('admin'), deleteLesson);

module.exports = router;