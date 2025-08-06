const asyncHandler = require('../middleware/async');
const ErrorResponse = require('../utils/errorResponse');
const Payment = require('../models/Payment');
const Course = require('../models/Course');
const axios = require('axios');

// @desc    토스페이먼츠 결제 요청
// @route   POST /api/payments/toss/request
// @access  Private
exports.createTossPayment = asyncHandler(async (req, res, next) => {
  const { courseId, amount, orderId, customerName, customerEmail } = req.body;

  // 코스 확인
  const course = await Course.findById(courseId);
  if (!course) {
    return next(new ErrorResponse('Course not found', 404));
  }

  // 결제 정보 저장
  const payment = await Payment.create({
    userId: req.user.id,
    courseId,
    amount: course.price, // DB의 실제 가격 사용
    currency: 'KRW',
    status: 'pending',
    paymentMethod: 'toss',
    orderId
  });

  // 토스페이먼츠 결제 요청 데이터
  const paymentData = {
    amount: course.price,
    orderId: orderId,
    orderName: course.title,
    customerName: customerName,
    customerEmail: customerEmail,
    successUrl: `${process.env.CLIENT_URL}/payment/success`,
    failUrl: `${process.env.CLIENT_URL}/payment/fail`
  };

  res.status(201).json({
    success: true,
    data: {
      payment,
      paymentData,
      clientKey: process.env.TOSS_CLIENT_KEY
    }
  });
});

// @desc    토스페이먼츠 결제 승인
// @route   POST /api/payments/toss/confirm
// @access  Public
exports.confirmTossPayment = asyncHandler(async (req, res, next) => {
  const { paymentKey, orderId, amount } = req.body;

  try {
    // 토스페이먼츠 API 호출
    const response = await axios.post(
      'https://api.tosspayments.com/v1/payments/confirm',
      {
        paymentKey,
        orderId,
        amount
      },
      {
        headers: {
          'Authorization': `Basic ${Buffer.from(process.env.TOSS_SECRET_KEY + ':').toString('base64')}`,
          'Content-Type': 'application/json'
        }
      }
    );

    // 결제 정보 업데이트
    const payment = await Payment.findOneAndUpdate(
      { orderId },
      {
        status: 'completed',
        transactionId: paymentKey,
        tossPaymentData: response.data
      },
      { new: true }
    );

    if (!payment) {
      return next(new ErrorResponse('Payment not found', 404));
    }

    res.status(200).json({
      success: true,
      data: {
        payment,
        tossResponse: response.data
      }
    });

  } catch (error) {
    console.error('Toss payment confirmation error:', error.response?.data || error.message);
    
    // 결제 실패 상태로 업데이트
    await Payment.findOneAndUpdate(
      { orderId },
      { status: 'failed' }
    );

    return next(new ErrorResponse('Payment confirmation failed', 400));
  }
});

// @desc    결제 상태 확인
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
    isPaid: !!payment,
    payment: payment || null
  });
});