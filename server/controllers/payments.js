const asyncHandler = require('../middleware/async');
const ErrorResponse = require('../utils/errorResponse');
const Payment = require('../models/Payment');
const Course = require('../models/Course');
const axios = require('axios');

// @desc    사용자 결제 내역 조회
// @route   GET /api/payments/user
// @access  Private
exports.getPayments = asyncHandler(async (req, res, next) => {
  const payments = await Payment.find({ userId: req.user.id })
    .populate('courseId', 'title price imageUrl')
    .sort({ createdAt: -1 });

  res.status(200).json({
    success: true,
    count: payments.length,
    data: payments
  });
});

// @desc    특정 결제 조회
// @route   GET /api/payments/:id
// @access  Private
exports.getPayment = asyncHandler(async (req, res, next) => {
  const payment = await Payment.findById(req.params.id)
    .populate('courseId', 'title price imageUrl')
    .populate('userId', 'username email');

  if (!payment) {
    return next(new ErrorResponse('Payment not found', 404));
  }

  // 본인의 결제 또는 관리자만 조회 가능
  if (payment.userId._id.toString() !== req.user.id && req.user.role !== 'admin') {
    return next(new ErrorResponse('Not authorized to access this payment', 401));
  }

  res.status(200).json({
    success: true,
    data: payment
  });
});

// @desc    일반 결제 생성 (개발용 또는 다른 결제 방식)
// @route   POST /api/payments/create
// @access  Private
exports.createPayment = asyncHandler(async (req, res, next) => {
  const { courseId, paymentMethod } = req.body;

  // 코스 확인
  const course = await Course.findById(courseId);
  if (!course) {
    return next(new ErrorResponse('Course not found', 404));
  }

  // 이미 결제된 코스인지 확인
  const existingPayment = await Payment.findOne({
    userId: req.user.id,
    courseId,
    status: 'completed'
  });

  if (existingPayment) {
    return next(new ErrorResponse('Course already purchased', 400));
  }

  // 고유한 주문 ID 생성
  const orderId = `order_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;

  // 결제 정보 저장
  const payment = await Payment.create({
    userId: req.user.id,
    courseId,
    amount: course.price,
    currency: 'KRW',
    status: 'completed', // 개발 모드에서는 바로 완료 처리
    paymentMethod: paymentMethod || 'card',
    orderId,
    transactionId: `txn_${Date.now()}`
  });

  res.status(201).json({
    success: true,
    data: payment
  });
});

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

// @desc    웹훅 처리 (결제 상태 업데이트)
// @route   POST /api/payments/webhook
// @access  Public
exports.processPaymentWebhook = asyncHandler(async (req, res, next) => {
  try {
    const { eventType, data } = req.body;
    
    console.log('Payment webhook received:', eventType, data);

    switch (eventType) {
      case 'Payment.StatusChanged':
        await Payment.findOneAndUpdate(
          { orderId: data.orderId },
          { 
            status: data.status,
            transactionId: data.paymentKey,
            tossPaymentData: data
          }
        );
        break;
      
      case 'Payment.Canceled':
        await Payment.findOneAndUpdate(
          { orderId: data.orderId },
          { 
            status: 'failed',
            tossPaymentData: data
          }
        );
        break;

      default:
        console.log('Unhandled webhook event:', eventType);
    }

    res.status(200).json({ success: true });
  } catch (error) {
    console.error('Webhook processing error:', error);
    res.status(500).json({ error: 'Webhook processing failed' });
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