const express = require('express');
const router = express.Router();
const {
  getPlans,
  createCheckoutSession,
  verifySession,
  handleWebhook,
  resetTier,
} = require('../controllers/subscriptionController');
const { protect } = require('../middleware/auth');

// Public pricing info
router.get('/plans', getPlans);

// Stripe Checkout Session Creation & Verification
router.post('/create-checkout-session', protect, createCheckoutSession);
router.post('/verify-session', protect, verifySession);

// Backward-compatible aliases
router.post('/create-order', protect, createCheckoutSession);
router.post('/verify-payment', protect, verifySession);

// Stripe Webhook Endpoint
router.post('/webhook', handleWebhook);

// Dev Helpers
router.post('/reset-tier', protect, resetTier);

module.exports = router;
