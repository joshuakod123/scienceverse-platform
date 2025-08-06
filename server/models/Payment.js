const mongoose = require('mongoose');

const PaymentSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  courseId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Course',
    required: true
  },
  amount: {
    type: Number,
    required: [true, 'Please add payment amount']
  },
  currency: {
    type: String,
    enum: ['KRW', 'USD'],
    default: 'KRW'
  },
  status: {
    type: String,
    enum: ['pending', 'completed', 'failed', 'refunded'],
    default: 'pending'
  },
  paymentMethod: {
    type: String,
    enum: ['toss', 'card', 'bank'],
    required: [true, 'Please specify payment method']
  },
  orderId: {
    type: String,
    required: true,
    unique: true
  },
  transactionId: {
    type: String
  },
  tossPaymentData: {
    type: Object // 토스페이먼츠 응답 데이터 저장
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model('Payment', PaymentSchema);