const request = require('supertest');
const jwt = require('jsonwebtoken');
const app = require('../server');
const User = require('../models/User');
const { isStripeConfigured } = require('../config/stripe');

describe('Subscription & Stripe Integration Tests', () => {
  const testToken = jwt.sign(
    { id: '6a9c72f3af8b115478edf096' },
    process.env.JWT_SECRET || 'super_secret_jwt_access_key_career_saas_2026',
    { expiresIn: '1h' }
  );

  afterEach(() => {
    jest.restoreAllMocks();
  });

  test('GET /api/subscription/plans returns plans with Stripe configuration status', async () => {
    const res = await request(app).get('/api/subscription/plans');
    expect(res.status).toBe(200);
    expect(res.body.success).toBe(true);
    expect(Array.isArray(res.body.plans)).toBe(true);
    expect(res.body.plans.some((p) => p.id === 'pro_monthly')).toBe(true);
    expect(typeof res.body.isStripeConfigured).toBe('boolean');
  });

  test('isStripeConfigured helper returns boolean based on environment key', () => {
    expect(typeof isStripeConfigured()).toBe('boolean');
  });

  test('POST /api/subscription/create-checkout-session fails without authentication', async () => {
    const res = await request(app)
      .post('/api/subscription/create-checkout-session')
      .send({ planId: 'pro_monthly' });
    expect(res.status).toBe(401);
    expect(res.body.success).toBe(false);
  });

  test('POST /api/subscription/verify-session fails without authentication', async () => {
    const res = await request(app)
      .post('/api/subscription/verify-session')
      .send({
        sessionId: 'cs_test_12345',
        planId: 'pro_monthly',
      });
    expect(res.status).toBe(401);
    expect(res.body.success).toBe(false);
  });

  test('POST /api/subscription/verify-session rejects unverified sessions with HTTP 400', async () => {
    jest.spyOn(User, 'findById').mockResolvedValue({
      _id: '6a9c72f3af8b115478edf096',
      name: 'Test User',
      email: 'test@example.com',
      checkAndResetMonthlyUsage: jest.fn(),
      save: jest.fn().mockResolvedValue(true),
    });

    const res = await request(app)
      .post('/api/subscription/verify-session')
      .set('Authorization', `Bearer ${testToken}`)
      .send({
        sessionId: 'sim_cs_fake_session',
        planId: 'pro_monthly',
      });
    expect(res.status).toBe(400);
    expect(res.body.success).toBe(false);
  });

  test('Backward-compatible aliases (/create-order and /verify-payment) require authentication', async () => {
    const resOrder = await request(app)
      .post('/api/subscription/create-order')
      .send({ planId: 'pro_monthly' });
    expect(resOrder.status).toBe(401);

    const resVerify = await request(app)
      .post('/api/subscription/verify-payment')
      .send({ sessionId: 'cs_test_12345' });
    expect(resVerify.status).toBe(401);
  });
});
