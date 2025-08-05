const Payment = require('../models/Payment');
const Course = require('../models/Course');
const User = require('../models/User');
const ErrorResponse = require('../utils/errorResponse');
const asyncHandler = require('../middleware/async');

// Helper function to enroll a user in a course
const enrollUserInCourse = async (userId, courseId) => {
  const user = await User.findById(userId);
  if (!user) {
    console.error(`Enrollment failed: User not found with id of ${userId}`);
    return;
  }

  const alreadyEnrolled = user.enrolledCourses.some(
    enrollment => enrollment.courseId.toString() === courseId.toString()
  );

  if (!alreadyEnrolled) {
    user.enrolledCourses.push({ courseId });
    await user.save();
    await Course.findByIdAndUpdate(courseId, { $inc: { students: 1 } });
  }
};

// @desc    Get all payments for a user
// @route   GET /api/payments/user
// @access  Private
exports.getPayments = asyncHandler(async (req, res, next) => {
    const payments = await Payment.find({ userId: req.user.id })
      .populate('courseId', 'title price')
      .sort('-createdAt');
  
    res.status(200).json({
      success: true,
      count: payments.length,
      data: payments
    });
  });

// @desc    Get a single payment
// @route   GET /api/payments/:id
// @access  Private
exports.getPayment = asyncHandler(async (req, res, next) => {
  const payment = await Payment.findById(req.params.id).populate('courseId', 'title price');

  if (!payment) {
    return next(new ErrorResponse(`Payment not found with id of ${req.params.id}`, 404));
  }

  if (payment.userId.toString() !== req.user.id && req.user.role !== 'admin') {
    return next(new ErrorResponse('Not authorized to access this payment', 403));
  }

  res.status(200).json({ success: true, data: payment });
});

// @desc    Create a new payment
// @route   POST /api/payments/create
// @access  Private
exports.createPayment = asyncHandler(async (req, res, next) => {
  req.body.userId = req.user.id;
  const { courseId, amount } = req.body;

  const course = await Course.findById(courseId);
  if (!course) {
    return next(new ErrorResponse(`Course not found with id of ${courseId}`, 404));
  }

  // Use course price from DB as the source of truth
  req.body.amount = course.price;

  const payment = await Payment.create(req.body);

  if (payment.status === 'completed') {
    await enrollUserInCourse(payment.userId, payment.courseId);
  }

  res.status(201).json({ success: true, data: payment });
});

// @desc    Process payment webhook
// @route   POST /api/payments/webhook
// @access  Public
exports.processPaymentWebhook = asyncHandler(async (req, res, next) => {
  // Logic to handle webhooks from payment providers like Stripe
  // This is a placeholder for a real implementation
  console.log('Webhook received:', req.body);
  res.status(200).json({ success: true, message: 'Webhook received' });
});

// @desc    Check if user has paid for a course
// @route   GET /api/payments/check/:courseId
// @access  Private
exports.checkPaymentStatus = asyncHandler(async (req, res, next) => {
    const payment = await Payment.findOne({
      userId: req.user.id,
      courseId: req.params.courseId,
      status: 'completed'
    });
  
    res.status(200).json({
      success: true,
      isPaid: !!payment
    });
  });