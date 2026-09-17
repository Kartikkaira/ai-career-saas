const Resume = require('../models/Resume');
const { PLANS } = require('../config/constants');

const checkResumeCreationLimit = async (req, res, next) => {
  const user = req.user;

  // Premium users have unlimited resume creations
  if (user.role === 'premium' || user.role === 'admin') {
    return next();
  }

  const maxAllowed = parseInt(process.env.FREE_TIER_MAX_RESUMES || '1', 10);
  const currentCount = await Resume.countDocuments({ userId: user._id });

  if (currentCount >= maxAllowed) {
    return res.status(403).json({
      success: false,
      message: `Free tier allows up to ${maxAllowed} saved resume. Please upgrade to Pro for unlimited resumes.`,
      code: 'UPGRADE_REQUIRED',
      limitType: 'resumes',
      currentCount,
      maxAllowed,
      plans: PLANS,
    });
  }

  next();
};

const checkAnalysisLimit = async (req, res, next) => {
  const user = req.user;

  // Premium users have unlimited ATS analyses
  if (user.role === 'premium' || user.role === 'admin') {
    return next();
  }

  user.checkAndResetMonthlyUsage();
  const maxAllowed = parseInt(process.env.FREE_TIER_MAX_ANALYSES_PER_MONTH || '2', 10);

  if (user.analysesCount >= maxAllowed) {
    return res.status(403).json({
      success: false,
      message: `Free tier allows ${maxAllowed} ATS analyses per month. You have reached your limit. Upgrade to Pro for unlimited scans!`,
      code: 'UPGRADE_REQUIRED',
      limitType: 'analyses',
      currentCount: user.analysesCount,
      maxAllowed,
      plans: PLANS,
    });
  }

  next();
};

module.exports = {
  checkResumeCreationLimit,
  checkAnalysisLimit,
};
