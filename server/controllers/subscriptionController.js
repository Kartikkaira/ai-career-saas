const Subscription = require('../models/Subscription');
const User = require('../models/User');
const { PLANS } = require('../config/constants');
const { getStripeInstance, isStripeConfigured } = require('../config/stripe');

/**
 * Get available plans and pricing
 * GET /api/subscription/plans
 */
const getPlans = (req, res) => {
  res.status(200).json({
    success: true,
    plans: Object.values(PLANS),
    isStripeConfigured: isStripeConfigured(),
  });
};

/**
 * Create real Stripe Checkout Session
 * POST /api/subscription/create-checkout-session
 */
const createCheckoutSession = async (req, res, next) => {
  try {
    const { planId } = req.body;
    const selectedPlan = Object.values(PLANS).find((p) => p.id === planId);

    if (!selectedPlan || selectedPlan.id === 'free') {
      return res.status(400).json({
        success: false,
        message: 'Please select a valid paid plan.',
      });
    }

    if (!isStripeConfigured()) {
      return res.status(400).json({
        success: false,
        message: 'Stripe payments are not configured. Please set a valid STRIPE_SECRET_KEY in server/.env.',
        code: 'STRIPE_NOT_CONFIGURED',
      });
    }

    const stripe = getStripeInstance();
    if (!stripe) {
      return res.status(500).json({
        success: false,
        message: 'Failed to initialize Stripe client. Verify your STRIPE_SECRET_KEY.',
        code: 'STRIPE_INIT_FAILED',
      });
    }

    const clientBaseUrl = process.env.CLIENT_URL || 'http://localhost:5173';

    try {
      const session = await stripe.checkout.sessions.create({
        payment_method_types: ['card'],
        line_items: [
          {
            price_data: {
              currency: 'inr',
              product_data: {
                name: selectedPlan.name,
                description: 'CareerCraft AI Pro Subscription — Unlimited ATS Resumes & AI Scoring',
              },
              unit_amount: selectedPlan.priceINR * 100,
            },
            quantity: 1,
          },
        ],
        mode: 'payment',
        customer_email: req.user.email,
        client_reference_id: req.user._id.toString(),
        metadata: {
          userId: req.user._id.toString(),
          planId: selectedPlan.id,
        },
        success_url: `${clientBaseUrl}/pricing?session_id={CHECKOUT_SESSION_ID}&planId=${selectedPlan.id}&success=true`,
        cancel_url: `${clientBaseUrl}/pricing?canceled=true`,
      });

      return res.status(200).json({
        success: true,
        sessionId: session.id,
        url: session.url,
        plan: selectedPlan,
      });
    } catch (stripeErr) {
      console.error('[Stripe] Checkout Session creation failed:', stripeErr.message);
      return res.status(400).json({
        success: false,
        message: stripeErr.message || 'Failed to create Stripe Checkout Session.',
        code: stripeErr.code || 'STRIPE_SESSION_ERROR',
      });
    }
  } catch (error) {
    next(error);
  }
};

/**
 * Verify Stripe Checkout Session & activate subscription
 * POST /api/subscription/verify-session
 * MUST verify against Stripe API that payment_status is 'paid'
 */
const verifySession = async (req, res, next) => {
  try {
    const { sessionId, planId } = req.body;

    if (!sessionId) {
      return res.status(400).json({
        success: false,
        message: 'Session ID is required for verification.',
      });
    }

    const stripe = getStripeInstance();
    if (!stripe || !isStripeConfigured()) {
      return res.status(400).json({
        success: false,
        message: 'Stripe is not configured. Cannot verify payment session.',
      });
    }

    let session;
    try {
      session = await stripe.checkout.sessions.retrieve(sessionId);
    } catch (retrieveErr) {
      console.error('[Stripe] Session retrieve failed:', retrieveErr.message);
      return res.status(400).json({
        success: false,
        message: `Unable to retrieve checkout session from Stripe: ${retrieveErr.message}`,
        code: 'STRIPE_RETRIEVE_FAILED',
      });
    }

    // STRICT CHECK: Payment status must be explicitly 'paid'
    if (!session || session.payment_status !== 'paid') {
      const currentStatus = session ? session.payment_status : 'unknown';
      console.warn(`[Stripe] Verification rejected: payment_status is '${currentStatus}' (expected 'paid')`);
      return res.status(400).json({
        success: false,
        message: `Payment was not completed. Stripe payment status is '${currentStatus}'. Access not granted.`,
        paymentStatus: currentStatus,
      });
    }

    const selectedPlan = Object.values(PLANS).find((p) => p.id === planId) || PLANS.PRO_MONTHLY;
    const periodEnd = new Date();
    if (selectedPlan.id === 'pro_annual') {
      periodEnd.setFullYear(periodEnd.getFullYear() + 1);
    } else {
      periodEnd.setMonth(periodEnd.getMonth() + 1);
    }

    // Upsert subscription
    const subscription = await Subscription.findOneAndUpdate(
      { userId: req.user._id },
      {
        userId: req.user._id,
        plan: selectedPlan.id,
        status: 'active',
        stripeSessionId: session.id,
        stripePaymentIntentId: session.payment_intent,
        stripeCustomerId: session.customer,
        amount: selectedPlan.priceINR,
        currency: 'INR',
        currentPeriodStart: new Date(),
        currentPeriodEnd: periodEnd,
        cancelAtPeriodEnd: false,
      },
      { upsert: true, new: true }
    );

    // Update user role to premium
    const updatedUser = await User.findByIdAndUpdate(
      req.user._id,
      {
        role: 'premium',
        subscriptionId: subscription._id,
      },
      { new: true }
    );

    console.log(`[Subscription] User ${req.user._id} upgraded to Pro following verified Stripe payment (${session.id})`);

    res.status(200).json({
      success: true,
      message: 'Payment verified! You are now upgraded to Pro.',
      subscription,
      user: {
        id: updatedUser._id,
        name: updatedUser.name,
        email: updatedUser.email,
        role: updatedUser.role,
      },
    });
  } catch (error) {
    next(error);
  }
};

/**
 * Handle Stripe Webhooks
 * POST /api/subscription/webhook
 */
const handleWebhook = async (req, res, next) => {
  try {
    const stripe = getStripeInstance();
    const signature = req.headers['stripe-signature'];
    const webhookSecret = process.env.STRIPE_WEBHOOK_SECRET;

    if (!stripe || !webhookSecret || !signature) {
      return res.status(400).send('Webhook configuration missing');
    }

    let event;
    try {
      event = stripe.webhooks.constructEvent(req.rawBody || JSON.stringify(req.body), signature, webhookSecret);
    } catch (err) {
      console.warn(`[Stripe Webhook] Signature verification failed: ${err.message}`);
      return res.status(400).send(`Webhook Error: ${err.message}`);
    }

    console.log(`[Stripe Webhook] Received event: ${event.type}`);

    if (event.type === 'checkout.session.completed') {
      const session = event.data.object;
      // Double check payment status
      if (session.payment_status === 'paid') {
        const userId = session.metadata?.userId || session.client_reference_id;
        if (userId) {
          await User.findByIdAndUpdate(userId, { role: 'premium' });
          console.log(`[Stripe Webhook] Upgraded user ${userId} to Pro`);
        }
      }
    } else if (event.type === 'customer.subscription.deleted') {
      const sub = event.data.object;
      const dbSub = await Subscription.findOneAndUpdate(
        { stripeSessionId: sub.id },
        { status: 'cancelled' },
        { new: true }
      );
      if (dbSub) {
        await User.findByIdAndUpdate(dbSub.userId, { role: 'user' });
      }
    }

    res.status(200).json({ received: true });
  } catch (error) {
    next(error);
  }
};

/**
 * Reset current user's subscription back to free tier (for testing)
 * POST /api/subscription/reset-tier
 */
const resetTier = async (req, res, next) => {
  try {
    await Subscription.deleteMany({ userId: req.user._id });
    const updatedUser = await User.findByIdAndUpdate(
      req.user._id,
      { role: 'user', subscriptionId: null },
      { new: true }
    );

    res.status(200).json({
      success: true,
      message: 'Subscription reset to Free tier.',
      user: {
        id: updatedUser._id,
        name: updatedUser.name,
        email: updatedUser.email,
        role: updatedUser.role,
        subscription: null,
      },
    });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  getPlans,
  createCheckoutSession,
  verifySession,
  handleWebhook,
  resetTier,
};
