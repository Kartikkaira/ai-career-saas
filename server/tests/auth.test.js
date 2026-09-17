const request = require('supertest');
const app = require('../server');
const User = require('../models/User');

describe('Health and Public Endpoints', () => {
  afterEach(() => {
    jest.restoreAllMocks();
  });

  test('GET /api/health returns online status', async () => {
    const res = await request(app).get('/api/health');
    expect(res.status).toBe(200);
    expect(res.body.status).toBe('online');
    expect(res.body.service).toBe('AI Career SaaS Platform API');
  });

  test('GET /api/subscription/plans returns list of active plans', async () => {
    const res = await request(app).get('/api/subscription/plans');
    expect(res.status).toBe(200);
    expect(res.body.success).toBe(true);
    expect(Array.isArray(res.body.plans)).toBe(true);
    expect(res.body.plans.length).toBeGreaterThanOrEqual(3);
  });

  test('POST /api/auth/register fails with missing credentials', async () => {
    const res = await request(app)
      .post('/api/auth/register')
      .send({ email: 'test@example.com' });
    expect(res.status).toBe(400);
    expect(res.body.success).toBe(false);
  });

  test('POST /api/auth/login fails when user not found', async () => {
    jest.spyOn(User, 'findOne').mockReturnValue({
      select: jest.fn().mockResolvedValue(null),
    });

    const res = await request(app)
      .post('/api/auth/login')
      .send({ email: 'nonexistent@example.com', password: 'wrongpassword' });
    expect(res.status).toBe(401);
    expect(res.body.success).toBe(false);
    expect(res.body.message).toContain('Invalid email or password');
  });
});
