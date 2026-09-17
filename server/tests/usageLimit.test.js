const { checkAnalysisLimit } = require('../middleware/usageLimit');

describe('Usage Limits Middleware Unit Test', () => {
  test('checkAnalysisLimit allows premium users without restrictions', async () => {
    const req = {
      user: {
        role: 'premium',
        analysesCount: 50,
        checkAndResetMonthlyUsage: jest.fn(),
      },
    };
    const res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
    };
    const next = jest.fn();

    await checkAnalysisLimit(req, res, next);
    expect(next).toHaveBeenCalled();
  });

  test('checkAnalysisLimit blocks free users who exceed max limit', async () => {
    const req = {
      user: {
        role: 'free',
        analysesCount: 5,
        checkAndResetMonthlyUsage: jest.fn(),
      },
    };
    const res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
    };
    const next = jest.fn();

    await checkAnalysisLimit(req, res, next);
    expect(res.status).toHaveBeenCalledWith(403);
    expect(res.json).toHaveBeenCalledWith(
      expect.objectContaining({
        success: false,
        code: 'UPGRADE_REQUIRED',
      })
    );
    expect(next).not.toHaveBeenCalled();
  });
});
