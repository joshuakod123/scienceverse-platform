// server/controllers/auth.js
const User = require('../models/User');
const ErrorResponse = require('../utils/errorResponse');
const asyncHandler = require('../middleware/async');
const crypto = require('crypto');
const sendEmail = require('../utils/sendEmail');

// @desc    Register user
// @route   POST /api/auth/register
// @access  Public
exports.register = asyncHandler(async (req, res, next) => {
  const { username, email, password } = req.body;

  // Create user
  const user = await User.create({
    username,
    email,
    password
  });

  sendTokenResponse(user, 200, res);
});

// @desc    Login user
// @route   POST /api/auth/login
// @access  Public
exports.login = asyncHandler(async (req, res, next) => {
  const { email, password } = req.body;

  // Validate email & password
  if (!email || !password) {
    return next(new ErrorResponse('Please provide an email and password', 400));
  }

  // Check for user
  const user = await User.findOne({ email }).select('+password');

  if (!user) {
    return next(new ErrorResponse('Invalid credentials', 401));
  }

  // Check if password matches
  const isMatch = await user.matchPassword(password);

  if (!isMatch) {
    return next(new ErrorResponse('Invalid credentials', 401));
  }

  sendTokenResponse(user, 200, res);
});

// @desc    Log user out / clear cookie
// @route   GET /api/auth/logout
// @access  Private
exports.logout = asyncHandler(async (req, res, next) => {
  res.cookie('token', 'none', {
    expires: new Date(Date.now() + 10 * 1000),
    httpOnly: true
  });

  res.status(200).json({
    success: true,
    data: {}
  });
});

// @desc    Get current logged in user
// @route   GET /api/auth/me
// @access  Private
exports.getMe = asyncHandler(async (req, res, next) => {
  const user = await User.findById(req.user.id);

  res.status(200).json({
    success: true,
    data: user
  });
});

// Helper function to get token from model, create cookie and send response
const sendTokenResponse = (user, statusCode, res) => {
  // Create token
  const token = user.getSignedJwtToken();

  const options = {
    expires: new Date(
      Date.now() + process.env.JWT_COOKIE_EXPIRE * 24 * 60 * 60 * 1000
    ),
    httpOnly: true
  };

  if (process.env.NODE_ENV === 'production') {
    options.secure = true;
  }

  res
    .status(statusCode)
    .cookie('token', token, options)
    .json({
      success: true,
      token,
      user: {
        id: user._id,
        username: user.username,
        email: user.email,
        role: user.role,
        isPremium: user.isPremium
      }
    });
};

// server/controllers/courses.js
const Course = require('../models/Course');
const User = require('../models/User');
const Lesson = require('../models/Lesson');
const Payment = require('../models/Payment');
const ErrorResponse = require('../utils/errorResponse');
const asyncHandler = require('../middleware/async');

// @desc    Get all courses
// @route   GET /api/courses
// @access  Public
exports.getCourses = asyncHandler(async (req, res, next) => {
  // Copy req.query
  const reqQuery = { ...req.query };

  // Fields to exclude
  const removeFields = ['select', 'sort', 'page', 'limit'];

  // Loop over removeFields and delete them from reqQuery
  removeFields.forEach(param => delete reqQuery[param]);

  // Create query string
  let queryStr = JSON.stringify(reqQuery);

  // Create operators ($gt, $gte, etc)
  queryStr = queryStr.replace(/\b(gt|gte|lt|lte|in)\b/g, match => `$${match}`);

  // Finding resource
  let query = Course.find(JSON.parse(queryStr));

  // Select Fields
  if (req.query.select) {
    const fields = req.query.select.split(',').join(' ');
    query = query.select(fields);
  }

  // Sort
  if (req.query.sort) {
    const sortBy = req.query.sort.split(',').join(' ');
    query = query.sort(sortBy);
  } else {
    query = query.sort('-createdAt');
  }

  // Pagination
  const page = parseInt(req.query.page, 10) || 1;
  const limit = parseInt(req.query.limit, 10) || 10;
  const startIndex = (page - 1) * limit;
  const endIndex = page * limit;
  const total = await Course.countDocuments();

  query = query.skip(startIndex).limit(limit);

  // Executing query
  const courses = await query;

  // Pagination result
  const pagination = {};

  if (endIndex < total) {
    pagination.next = {
      page: page + 1,
      limit
    };
  }

  if (startIndex > 0) {
    pagination.prev = {
      page: page - 1,
      limit
    };
  }

  res.status(200).json({
    success: true,
    count: courses.length,
    pagination,
    data: courses
  });
});

// @desc    Get single course
// @route   GET /api/courses/:id
// @access  Public
exports.getCourse = asyncHandler(async (req, res, next) => {
  const course = await Course.findById(req.params.id).populate('lessons');

  if (!course) {
    return next(
      new ErrorResponse(`Course not found with id of ${req.params.id}`, 404)
    );
  }

  res.status(200).json({
    success: true,
    data: course
  });
});

// @desc    Create new course
// @route   POST /api/courses
// @access  Private (Admin only)
exports.createCourse = asyncHandler(async (req, res, next) => {
  const course = await Course.create(req.body);

  res.status(201).json({
    success: true,
    data: course
  });
});

// @desc    Update course
// @route   PUT /api/courses/:id
// @access  Private (Admin only)
exports.updateCourse = asyncHandler(async (req, res, next) => {
  let course = await Course.findById(req.params.id);

  if (!course) {
    return next(
      new ErrorResponse(`Course not found with id of ${req.params.id}`, 404)
    );
  }

  course = await Course.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
    runValidators: true
  });

  res.status(200).json({
    success: true,
    data: course
  });
});

// @desc    Delete course
// @route   DELETE /api/courses/:id
// @access  Private (Admin only)
exports.deleteCourse = asyncHandler(async (req, res, next) => {
  const course = await Course.findById(req.params.id);

  if (!course) {
    return next(
      new ErrorResponse(`Course not found with id of ${req.params.id}`, 404)
    );
  }

  await course.deleteOne();

  res.status(200).json({
    success: true,
    data: {}
  });
});

// @desc    Get courses by category
// @route   GET /api/courses/category/:category
// @access  Public
exports.getCoursesByCategory = asyncHandler(async (req, res, next) => {
  const courses = await Course.find({ category: req.params.category });

  res.status(200).json({
    success: true,
    count: courses.length,
    data: courses
  });
});

// @desc    Enroll user in a course
// @route   POST /api/courses/:id/enroll
// @access  Private
exports.enrollInCourse = asyncHandler(async (req, res, next) => {
  const courseId = req.params.id;
  const userId = req.user.id;

  // Check if course exists
  const course = await Course.findById(courseId);
  if (!course) {
    return next(
      new ErrorResponse(`Course not found with id of ${courseId}`, 404)
    );
  }

  // Check if user exists
  const user = await User.findById(userId);
  if (!user) {
    return next(new ErrorResponse(`User not found`, 404));
  }

  // Check if the course is premium and if the user has access
  if (course.isPremium && !user.isPremium) {
    // Check if the user has paid for this specific course
    const payment = await Payment.findOne({
      userId,
      courseId,
      status: 'completed'
    });

    if (!payment) {
      return next(
        new ErrorResponse(
          `You need to purchase this premium course to enroll`,
          403
        )
      );
    }
  }

  // Check if already enrolled
  const alreadyEnrolled = user.enrolledCourses.some(
    enrollment => enrollment.courseId.toString() === courseId
  );

  if (alreadyEnrolled) {
    return res.status(400).json({
      success: false,
      message: 'User already enrolled in this course'
    });
  }

  // Add course to user's enrolled courses
  user.enrolledCourses.push({
    courseId,
    enrollmentDate: Date.now(),
    completedLessons: [],
    progress: 0
  });

  await user.save();

  // Increment course enrollments count
  course.enrollments += 1;
  await course.save();

  res.status(200).json({
    success: true,
    data: user.enrolledCourses.find(
      enrollment => enrollment.courseId.toString() === courseId
    )
  });
});

// @desc    Get user's enrolled courses
// @route   GET /api/courses/enrolled
// @access  Private
exports.getEnrolledCourses = asyncHandler(async (req, res, next) => {
  const user = await User.findById(req.user.id).populate({
    path: 'enrolledCourses.courseId',
    select: 'title subtitle description imageUrl category level duration totalLessons'
  });

  if (!user) {
    return next(new ErrorResponse(`User not found`, 404));
  }

  res.status(200).json({
    success: true,
    count: user.enrolledCourses.length,
    data: user.enrolledCourses
  });
});

// server/controllers/lessons.js
const Lesson = require('../models/Lesson');
const Course = require('../models/Course');
const User = require('../models/User');
const Progress = require('../models/Progress');
const ErrorResponse = require('../utils/errorResponse');
const asyncHandler = require('../middleware/async');

// @desc    Get all lessons for a course
// @route   GET /api/courses/:courseId/lessons
// @access  Public
exports.getLessons = asyncHandler(async (req, res, next) => {
  let query;

  if (req.params.courseId) {
    query = Lesson.find({ courseId: req.params.courseId }).sort('order');
  } else {
    return next(new ErrorResponse(`Course ID is required`, 400));
  }

  const lessons = await query;

  res.status(200).json({
    success: true,
    count: lessons.length,
    data: lessons
  });
});

// @desc    Get single lesson
// @route   GET /api/lessons/:id
// @access  Public (basic info) / Private (full content if premium)
exports.getLesson = asyncHandler(async (req, res, next) => {
  const lesson = await Lesson.findById(req.params.id);

  if (!lesson) {
    return next(
      new ErrorResponse(`Lesson not found with id of ${req.params.id}`, 404)
    );
  }

  // Get the course to check if it's premium
  const course = await Course.findById(lesson.courseId);

  // If not authenticated user, limit the response data
  if (!req.user) {
    // Strip out premium content for non-authenticated users
    const limitedLesson = {
      _id: lesson._id,
      title: lesson.title,
      courseId: lesson.courseId,
      order: lesson.order,
      duration: lesson.duration,
      isPremium: lesson.isPremium
    };

    return res.status(200).json({
      success: true,
      data: limitedLesson,
      message: 'Login to access full lesson content'
    });
  }

  // Check if user is enrolled in the course
  const user = await User.findById(req.user.id);
  const isEnrolled = user.enrolledCourses.some(
    enrollment => enrollment.courseId.toString() === lesson.courseId.toString()
  );

  // If lesson is premium, check user access
  if (lesson.isPremium || (course && course.isPremium)) {
    // Check if user has premium access or has specifically paid for this course
    if (!user.isPremium && !isEnrolled) {
      // Provide limited data for premium content
      const limitedLesson = {
        _id: lesson._id,
        title: lesson.title,
        courseId: lesson.courseId,
        order: lesson.order,
        duration: lesson.duration,
        isPremium: true
      };

      return res.status(200).json({
        success: true,
        data: limitedLesson,
        message: 'Premium content - purchase required'
      });
    }
  }

  // If the user is enrolled or has premium access, track their progress
  if (isEnrolled) {
    let progress = await Progress.findOne({
      userId: req.user.id,
      lessonId: req.params.id,
      courseId: lesson.courseId
    });

    if (!progress) {
      // Create new progress record
      progress = await Progress.create({
        userId: req.user.id,
        lessonId: req.params.id,
        courseId: lesson.courseId,
        lastAccessed: Date.now()
      });
    } else {
      // Update last accessed timestamp
      progress.lastAccessed = Date.now();
      await progress.save();
    }
  }

  res.status(200).json({
    success: true,
    data: lesson
  });
});

// @desc    Create lesson
// @route   POST /api/courses/:courseId/lessons
// @access  Private (Admin only)
exports.createLesson = asyncHandler(async (req, res, next) => {
  req.body.courseId = req.params.courseId;

  const course = await Course.findById(req.params.courseId);

  if (!course) {
    return next(
      new ErrorResponse(`Course not found with id of ${req.params.courseId}`, 404)
    );
  }

  const lesson = await Lesson.create(req.body);

  // Add lesson to course
  course.lessons.push(lesson._id);
  await course.save();

  res.status(201).json({
    success: true,
    data: lesson
  });
});

// @desc    Update lesson
// @route   PUT /api/lessons/:id
// @access  Private (Admin only)
exports.updateLesson = asyncHandler(async (req, res, next) => {
  let lesson = await Lesson.findById(req.params.id);

  if (!lesson) {
    return next(
      new ErrorResponse(`Lesson not found with id of ${req.params.id}`, 404)
    );
  }

  lesson = await Lesson.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
    runValidators: true
  });

  res.status(200).json({
    success: true,
    data: lesson
  });
});

// @desc    Delete lesson
// @route   DELETE /api/lessons/:id
// @access  Private (Admin only)
exports.deleteLesson = asyncHandler(async (req, res, next) => {
  const lesson = await Lesson.findById(req.params.id);

  if (!lesson) {
    return next(
      new ErrorResponse(`Lesson not found with id of ${req.params.id}`, 404)
    );
  }

  // Remove lesson from course
  const course = await Course.findById(lesson.courseId);
  if (course) {
    course.lessons = course.lessons.filter(
      id => id.toString() !== req.params.id
    );
    await course.save();
  }

  await lesson.deleteOne();

  res.status(200).json({
    success: true,
    data: {}
  });
});

// @desc    Mark lesson as completed
// @route   PUT /api/lessons/:id/complete
// @access  Private
exports.completeLesson = asyncHandler(async (req, res, next) => {
  const lessonId = req.params.id;
  const userId = req.user.id;

  // Find the lesson
  const lesson = await Lesson.findById(lessonId);
  if (!lesson) {
    return next(
      new ErrorResponse(`Lesson not found with id of ${lessonId}`, 404)
    );
  }

  const courseId = lesson.courseId;

  // Check if user is enrolled in the course
  const user = await User.findById(userId);
  const courseEnrollment = user.enrolledCourses.find(
    enrollment => enrollment.courseId.toString() === courseId.toString()
  );

  if (!courseEnrollment) {
    return next(
      new ErrorResponse(`User is not enrolled in this course`, 400)
    );
  }

  // Update progress
  let progress = await Progress.findOne({
    userId,
    lessonId,
    courseId
  });

  if (!progress) {
    progress = await Progress.create({
      userId,
      lessonId,
      courseId,
      completed: true,
      lastAccessed: Date.now()
    });
  } else {
    progress.completed = true;
    progress.lastAccessed = Date.now();
    await progress.save();
  }

  // Update user's completedLessons for this course
  if (!courseEnrollment.completedLessons.includes(lessonId)) {
    courseEnrollment.completedLessons.push(lessonId);
    
    // Update progress percentage
    const course = await Course.findById(courseId);
    if (course) {
      courseEnrollment.progress = Math.round(
        (courseEnrollment.completedLessons.length / course.totalLessons) * 100
      );
    }
    
    await user.save();
  }

  res.status(200).json({
    success: true,
    data: progress
  });
});

// server/controllers/progress.js
const Progress = require('../models/Progress');
const User = require('../models/User');
const Lesson = require('../models/Lesson');
const ErrorResponse = require('../utils/errorResponse');
const asyncHandler = require('../middleware/async');

// @desc    Get progress for a specific lesson
// @route   GET /api/progress/lesson/:lessonId
// @access  Private
exports.getLessonProgress = asyncHandler(async (req, res, next) => {
  const progress = await Progress.findOne({
    userId: req.user.id,
    lessonId: req.params.lessonId
  });

  if (!progress) {
    return res.status(200).json({
      success: true,
      data: {
        completed: false,
        timeSpent: 0,
        lastPosition: 0
      }
    });
  }

  res.status(200).json({
    success: true,
    data: progress
  });
});

// @desc    Update progress for a lesson
// @route   PUT /api/progress/lesson/:lessonId
// @access  Private
exports.updateLessonProgress = asyncHandler(async (req, res, next) => {
  const { timeSpent, lastPosition, completed, quizScore } = req.body;
  
  let progress = await Progress.findOne({
    userId: req.user.id,
    lessonId: req.params.lessonId
  });

  // Get the lesson to get courseId
  const lesson = await Lesson.findById(req.params.lessonId);
  if (!lesson) {
    return next(
      new ErrorResponse(`Lesson not found with id of ${req.params.lessonId}`, 404)
    );
  }

  const updateData = {
    lastAccessed: Date.now()
  };

  if (timeSpent !== undefined) {
    updateData.timeSpent = timeSpent;
  }

  if (lastPosition !== undefined) {
    updateData.lastPosition = lastPosition;
  }

  if (completed !== undefined) {
    updateData.completed = completed;
  }

  if (progress) {
    // Update existing progress
    progress = await Progress.findOneAndUpdate(
      {
        userId: req.user.id,
        lessonId: req.params.lessonId
      },
      updateData,
      { new: true }
    );
  } else {
    // Create new progress entry
    progress = await Progress.create({
      userId: req.user.id,
      lessonId: req.params.lessonId,
      courseId: lesson.courseId,
      ...updateData
    });
  }

  // If a quiz score is provided
  if (quizScore) {
    const { quizId, score } = quizScore;
    
    // Check if quiz already exists in scores
    const quizExists = progress.quizScores.some(q => q.quizId === quizId);
    
    if (quizExists) {
      // Update existing quiz score
      progress = await Progress.findOneAndUpdate(
        {
          userId: req.user.id,
          lessonId: req.params.lessonId,
          "quizScores.quizId": quizId
        },
        {
          $set: { "quizScores.$.score": score, "quizScores.$.completedAt": Date.now() }
        },
        { new: true }
      );
    } else {
      // Add new quiz score
      progress.quizScores.push({
        quizId,
        score,
        completedAt: Date.now()
      });
      await progress.save();
    }
  }

  // If lesson marked as completed, update user enrollment
  if (completed) {
    const user = await User.findById(req.user.id);
    const courseEnrollment = user.enrolledCourses.find(
      enrollment => enrollment.courseId.toString() === lesson.courseId.toString()
    );

    if (courseEnrollment && !courseEnrollment.completedLessons.includes(req.params.lessonId)) {
      courseEnrollment.completedLessons.push(req.params.lessonId);
      
      // Update progress percentage
      const courseData = await Lesson.countDocuments({ courseId: lesson.courseId });
      courseEnrollment.progress = Math.round(
        (courseEnrollment.completedLessons.length / courseData) * 100
      );
      
      await user.save();
    }
  }

  res.status(200).json({
    success: true,
    data: progress
  });
});

// @desc    Get all progress for a course
// @route   GET /api/progress/course/:courseId
// @access  Private
exports.getCourseProgress = asyncHandler(async (req, res, next) => {
  const progress = await Progress.find({
    userId: req.user.id,
    courseId: req.params.courseId
  }).populate('lessonId', 'title order');

  res.status(200).json({
    success: true,
    count: progress.length,
    data: progress
  });
});