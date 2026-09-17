const Analysis = require('../models/Analysis');
const User = require('../models/User');
const { extractTextFromPdf } = require('../utils/pdfParser');
const { analyzeResumeWithGemini } = require('../utils/geminiClient');

/**
 * Upload PDF or submit resume text and run Gemini ATS analysis
 * POST /api/analysis/upload-and-analyze
 */
const uploadAndAnalyze = async (req, res, next) => {
  try {
    let resumeText = req.body.resumeText || '';
    let originalName = 'Pasted_Resume_Text';

    if (req.file) {
      originalName = req.file.originalname;
      const parsed = await extractTextFromPdf(req.file.buffer);
      resumeText = parsed.text;
    }

    if (!resumeText || resumeText.trim().length < 50) {
      return res.status(400).json({
        success: false,
        message: 'Could not extract sufficient text from the provided resume. Please upload a clear text-based PDF or paste your resume content directly.',
      });
    }

    const { jobDescription, targetRole } = req.body;

    // Run Gemini ATS analysis
    const analysisResult = await analyzeResumeWithGemini({
      resumeText,
      jobDescription: jobDescription || '',
      targetRole: targetRole || '',
    });

    // Save analysis record in MongoDB
    const analysis = await Analysis.create({
      userId: req.user._id,
      resumeFileName: originalName,
      targetRole: targetRole || 'General Role',
      jobDescription: jobDescription || '',
      overallAtsScore: analysisResult.overallAtsScore,
      scoreBreakdown: analysisResult.scoreBreakdown,
      matchedKeywords: analysisResult.matchedKeywords || [],
      missingKeywords: analysisResult.missingKeywords || [],
      strengths: analysisResult.strengths || [],
      criticalIssues: analysisResult.criticalIssues || [],
      actionableSuggestions: analysisResult.actionableSuggestions || [],
      grammarAndClarity: analysisResult.grammarAndClarity || [],
      executiveSummary: analysisResult.executiveSummary || '',
    });

    // Increment user's monthly analysis usage
    await User.findByIdAndUpdate(req.user._id, { $inc: { analysesCount: 1 } });

    res.status(201).json({
      success: true,
      message: 'Resume analyzed successfully!',
      analysis,
    });
  } catch (error) {
    next(error);
  }
};

/**
 * Get user's past ATS analyses history
 * GET /api/analysis/history
 */
const getAnalysisHistory = async (req, res, next) => {
  try {
    const analyses = await Analysis.find({ userId: req.user._id })
      .sort({ createdAt: -1 })
      .select('-jobDescription');

    res.status(200).json({
      success: true,
      count: analyses.length,
      analyses,
    });
  } catch (error) {
    next(error);
  }
};

/**
 * Get single analysis by ID
 * GET /api/analysis/:id
 */
const getAnalysisById = async (req, res, next) => {
  try {
    const analysis = await Analysis.findOne({
      _id: req.params.id,
      userId: req.user._id,
    });

    if (!analysis) {
      return res.status(404).json({
        success: false,
        message: 'Analysis report not found.',
      });
    }

    res.status(200).json({
      success: true,
      analysis,
    });
  } catch (error) {
    next(error);
  }
};

/**
 * Delete analysis report
 * DELETE /api/analysis/:id
 */
const deleteAnalysis = async (req, res, next) => {
  try {
    const analysis = await Analysis.findOneAndDelete({
      _id: req.params.id,
      userId: req.user._id,
    });

    if (!analysis) {
      return res.status(404).json({
        success: false,
        message: 'Analysis record not found.',
      });
    }

    res.status(200).json({
      success: true,
      message: 'Analysis record deleted successfully.',
    });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  uploadAndAnalyze,
  getAnalysisHistory,
  getAnalysisById,
  deleteAnalysis,
};
