const express = require('express');
const {
  getUserPayments,
  createPayment,
  processPaymentWebhook,
  checkPaymentStatus,
  getPayment
} = require('../controllers/payments');

const router = express.Router();

const { protect, authorize } = require('../middleware/auth');

// Public webhooks
router.route('/webhook').post(processPaymentWebhook);

// Protected routes
router.use(protect);

router.route('/user').get(getUserPayments);
router.route('/create').post(createPayment);
router.route('/check/:courseId').get(checkPaymentStatus);
router.route('/:id').get(getPayment);

module.exports = router;