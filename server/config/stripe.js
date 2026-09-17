const Stripe = require('stripe');

let stripeInstance = null;

const isStripeConfigured = () => {
  const secretKey = process.env.STRIPE_SECRET_KEY;
  return Boolean(
    secretKey &&
    secretKey.startsWith('sk_') &&
    !secretKey.includes('your_stripe') &&
    !secretKey.includes('DemoSecretKey') &&
    !secretKey.includes('demo_key')
  );
};

const getStripeInstance = () => {
  const secretKey = process.env.STRIPE_SECRET_KEY;

  if (!secretKey || !isStripeConfigured()) {
    return null;
  }

  if (!stripeInstance) {
    try {
      stripeInstance = new Stripe(secretKey, {
        apiVersion: '2024-06-20',
      });
    } catch (err) {
      console.error('[Stripe] Initialization error:', err.message);
      return null;
    }
  }

  return stripeInstance;
};

module.exports = {
  getStripeInstance,
  isStripeConfigured,
};
