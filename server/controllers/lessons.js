// server/controllers/lessons.js
const Lesson = require('../models/Lesson');
const asyncHandler = require('../middleware/async');
const ErrorResponse = require('../utils/errorResponse');

// 기존 컨트롤러 함수들 유지...

// @desc    Get lessons for specific course and unit
// @route   GET /api/lessons/course/:courseId/unit/:unitNumber
// @access  Private (구매한 사용자만)
exports.getLessonsByCourseAndUnit = asyncHandler(async (req, res, next) => {
  const { courseId, unitNumber } = req.params;
  
  // 사용자의 구매/수강 상태 확인
  const user = req.user;
  const hasAccess = await checkCourseAccess(user.id, courseId);
  
  if (!hasAccess) {
    return next(
      new ErrorResponse(`You do not have access to this course. Please purchase to continue.`, 403)
    );
  }
  
  // 해당 과목과 유닛의 모든 레슨 조회
  const lessons = await Lesson.find({
    courseId: courseId,
    unitNumber: parseInt(unitNumber)
  }).sort({ lessonNumber: 1 }); // 레슨 번호 순으로 정렬
  
  if (!lessons || lessons.length === 0) {
    return next(
      new ErrorResponse(`No lessons found for course ${courseId} unit ${unitNumber}`, 404)
    );
  }
  
  res.status(200).json({
    success: true,
    count: lessons.length,
    data: lessons
  });
});

// @desc    Get all lessons for a specific course
// @route   GET /api/lessons/course/:courseId
// @access  Private
exports.getLessonsByCourse = asyncHandler(async (req, res, next) => {
  const { courseId } = req.params;
  
  // 사용자의 구매/수강 상태 확인
  const user = req.user;
  const hasAccess = await checkCourseAccess(user.id, courseId);
  
  if (!hasAccess) {
    // 무료 샘플 레슨만 반환
    const freeLessons = await Lesson.find({
      courseId: courseId,
      isPremium: false
    }).select('title subtitle description unitNumber lessonNumber duration imageUrl');
    
    return res.status(200).json({
      success: true,
      isLimited: true,
      message: 'Showing preview lessons only. Purchase the course for full access.',
      count: freeLessons.length,
      data: freeLessons
    });
  }
  
  // 전체 레슨 반환
  const lessons = await Lesson.find({ courseId })
    .sort({ unitNumber: 1, lessonNumber: 1 });
  
  res.status(200).json({
    success: true,
    count: lessons.length,
    data: lessons
  });
});

// @desc    Get single lesson with full content
// @route   GET /api/lessons/:id/full
// @access  Private
exports.getFullLesson = asyncHandler(async (req, res, next) => {
  const lesson = await Lesson.findById(req.params.id);
  
  if (!lesson) {
    return next(
      new ErrorResponse(`Lesson not found with id of ${req.params.id}`, 404)
    );
  }
  
  // 유료 레슨인 경우 접근 권한 확인
  if (lesson.isPremium) {
    const user = req.user;
    const hasAccess = await checkCourseAccess(user.id, lesson.courseId);
    
    if (!hasAccess) {
      return next(
        new ErrorResponse(`This is a premium lesson. Please purchase the course to access.`, 403)
      );
    }
  }
  
  // 조회수 증가
  lesson.listeners += 1;
  await lesson.save();
  
  res.status(200).json({
    success: true,
    data: lesson
  });
});

// @desc    Create bulk lessons for a course unit
// @route   POST /api/lessons/bulk
// @access  Private (Admin only)
exports.createBulkLessons = asyncHandler(async (req, res, next) => {
  const lessons = req.body.lessons;
  
  if (!lessons || !Array.isArray(lessons)) {
    return next(
      new ErrorResponse('Please provide an array of lessons', 400)
    );
  }
  
  const createdLessons = await Lesson.insertMany(lessons, { 
    ordered: false,
    rawResult: false 
  });
  
  res.status(201).json({
    success: true,
    count: createdLessons.length,
    data: createdLessons
  });
});

// Helper function: 사용자의 코스 접근 권한 확인
async function checkCourseAccess(userId, courseId) {
  // 여기에 실제 구매/수강 확인 로직 구현
  // 예시: User 모델의 purchasedCourses 또는 enrollments 확인
  const User = require('../models/User');
  const user = await User.findById(userId);
  
  if (!user) return false;
  
  // 구매한 코스 목록에 있는지 확인
  if (user.purchasedCourses && user.purchasedCourses.includes(courseId)) {
    return true;
  }
  
  // 수강 중인 코스 목록에 있는지 확인
  if (user.enrolledCourses && user.enrolledCourses.some(course => course.courseId === courseId)) {
    return true;
  }
  
  // 관리자인 경우 모든 접근 허용
  if (user.role === 'admin') {
    return true;
  }
  
  return false;
}

// 기존 exports 유지
exports.getLessons = asyncHandler(async (req, res, next) => {
  // 기존 코드 유지
});

exports.getLesson = asyncHandler(async (req, res, next) => {
  // 기존 코드 유지
});

exports.createLesson = asyncHandler(async (req, res, next) => {
  // 기존 코드 유지
});

exports.updateLesson = asyncHandler(async (req, res, next) => {
  // 기존 코드 유지
});

exports.deleteLesson = asyncHandler(async (req, res, next) => {
  // 기존 코드 유지
});

module.exports = exports;