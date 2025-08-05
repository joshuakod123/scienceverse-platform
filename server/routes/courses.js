// server/routes/courses.js
const express = require('express');
const {
  getCourses,
  getCourse,
  createCourse,
  updateCourse,
  deleteCourse,
  getCoursesByCategory,
  getUserCourses,
  enrollInCourse,
  updateCourseProgress
} = require('../controllers/courses');

const router = express.Router();

const { protect, authorize } = require('../middleware/auth');

// Public routes
router.route('/').get(getCourses);
router.route('/:id').get(getCourse);
router.route('/category/:category').get(getCoursesByCategory);

// Protected routes
router.use(protect);

router.route('/user').get(getUserCourses);
router.route('/:id/enroll').post(enrollInCourse);
router.route('/:id/progress').put(updateCourseProgress);

// Admin only routes
router.use(authorize('admin'));

router.route('/').post(createCourse);
router.route('/:id').put(updateCourse).delete(deleteCourse);

module.exports = router;