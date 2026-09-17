const User = require('../models/User');
const Resume = require('../models/Resume');
const Analysis = require('../models/Analysis');
const Subscription = require('../models/Subscription');
const { PLANS } = require('../config/constants');

/**
 * Get comprehensive statistics for user's dashboard
 * GET /api/user/dashboard-stats
 */
const getUserDashboardStats = async (req, res, next) => {
  try {
    const userId = req.user._id;

    // Fetch user with fresh counts
    const user = await User.findById(userId);
    user.checkAndResetMonthlyUsage();
    await user.save({ validateBeforeSave: false });

    // Fetch resumes count & recent 3 resumes
    const totalResumes = await Resume.countDocuments({ userId });
    const recentResumes = await Resume.find({ userId })
      .sort({ updatedAt: -1 })
      .limit(3);

    // Fetch analyses count & recent analyses
    const totalAnalyses = await Analysis.countDocuments({ userId });
    const analyses = await Analysis.find({ userId })
      .sort({ createdAt: 1 }); // chronological for trend chart

    // Calculate score metrics
    let averageScore = 0;
    let highestScore = 0;
    let lowestScore = 0;

    if (analyses.length > 0) {
      const scores = analyses.map((a) => a.overallAtsScore);
      const sum = scores.reduce((acc, curr) => acc + curr, 0);
      averageScore = Math.round(sum / scores.length);
      highestScore = Math.max(...scores);
      lowestScore = Math.min(...scores);
    }

    // Format score trend data for Recharts
    const scoreTrend = analyses.map((a, index) => ({
      scanNumber: `Scan #${index + 1}`,
      date: new Date(a.createdAt).toLocaleDateString('en-US', { month: 'short', day: 'numeric' }),
      score: a.overallAtsScore,
      targetRole: a.targetRole || 'General Role',
      formatting: a.scoreBreakdown ? a.scoreBreakdown.formatting : 70,
      keywordMatch: a.scoreBreakdown ? a.scoreBreakdown.keywordMatch : 70,
      quantifiedImpact: a.scoreBreakdown ? a.scoreBreakdown.quantifiedImpact : 70,
    }));

    // Fetch active subscription
    const subscription = await Subscription.findOne({
      userId,
      status: 'active',
    });

    const isPremium = user.role === 'premium' || user.role === 'admin';
    const freeResumesLimit = parseInt(process.env.FREE_TIER_MAX_RESUMES || '1', 10);
    const freeAnalysesLimit = parseInt(process.env.FREE_TIER_MAX_ANALYSES_PER_MONTH || '2', 10);

    res.status(200).json({
      success: true,
      stats: {
        totalResumes,
        totalAnalyses,
        averageScore,
        highestScore,
        lowestScore,
        scoreTrend,
        recentResumes,
        userRole: user.role,
        isPremium,
        usage: {
          resumesUsed: totalResumes,
          resumesLimit: isPremium ? 'Unlimited' : freeResumesLimit,
          analysesUsedThisMonth: user.analysesCount,
          analysesLimit: isPremium ? 'Unlimited' : freeAnalysesLimit,
          resumesRemaining: isPremium ? 999 : Math.max(0, freeResumesLimit - totalResumes),
          analysesRemaining: isPremium ? 999 : Math.max(0, freeAnalysesLimit - user.analysesCount),
        },
        subscription: subscription || null,
      },
    });
  } catch (error) {
    next(error);
  }
};

/**
 * Update user profile
 * PUT /api/user/profile
 */
const updateProfile = async (req, res, next) => {
  try {
    const { name } = req.body;
    const user = await User.findByIdAndUpdate(
      req.user._id,
      { name },
      { new: true, runValidators: true }
    );

    res.status(200).json({
      success: true,
      message: 'Profile updated successfully!',
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        role: user.role,
      },
    });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  getUserDashboardStats,
  updateProfile,
};
