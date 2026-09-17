const Resume = require('../models/Resume');
const User = require('../models/User');
const {
  enhanceSummaryWithGemini,
  enhanceBulletPointWithGemini,
  suggestSkillsWithGemini,
} = require('../utils/geminiClient');

/**
 * Get all resumes for current user
 * GET /api/resumes
 */
const getResumes = async (req, res, next) => {
  try {
    const resumes = await Resume.find({ userId: req.user._id }).sort({ updatedAt: -1 });
    res.status(200).json({
      success: true,
      count: resumes.length,
      resumes,
    });
  } catch (error) {
    next(error);
  }
};

/**
 * Get single resume by ID
 * GET /api/resumes/:id
 */
const getResumeById = async (req, res, next) => {
  try {
    const resume = await Resume.findOne({
      _id: req.params.id,
      userId: req.user._id,
    });

    if (!resume) {
      return res.status(404).json({
        success: false,
        message: 'Resume not found.',
      });
    }

    res.status(200).json({
      success: true,
      resume,
    });
  } catch (error) {
    next(error);
  }
};

/**
 * Create a new resume
 * POST /api/resumes
 */
const createResume = async (req, res, next) => {
  try {
    const { title, templateId, sections } = req.body;

    const resume = await Resume.create({
      userId: req.user._id,
      title: title || 'Untitled Resume',
      templateId: templateId || 'classic-ats',
      sections: sections || {
        personalInfo: {
          fullName: req.user.name || '',
          email: req.user.email || '',
          jobTitle: 'Software Engineer',
        },
        summary: '',
        experience: [],
        education: [],
        skills: [{ category: 'Technical Skills', items: [] }],
        projects: [],
        certifications: [],
      },
    });

    // Update user resumes count
    await User.findByIdAndUpdate(req.user._id, { $inc: { resumesCount: 1 } });

    res.status(201).json({
      success: true,
      message: 'Resume created successfully!',
      resume,
    });
  } catch (error) {
    next(error);
  }
};

/**
 * Update resume by ID
 * PUT /api/resumes/:id
 */
const updateResume = async (req, res, next) => {
  try {
    const { title, templateId, sections, isDraft } = req.body;

    const resume = await Resume.findOne({
      _id: req.params.id,
      userId: req.user._id,
    });

    if (!resume) {
      return res.status(404).json({
        success: false,
        message: 'Resume not found.',
      });
    }

    if (title !== undefined) resume.title = title;
    if (templateId !== undefined) resume.templateId = templateId;
    if (sections !== undefined) resume.sections = sections;
    if (isDraft !== undefined) resume.isDraft = isDraft;

    await resume.save();

    res.status(200).json({
      success: true,
      message: 'Resume saved successfully!',
      resume,
    });
  } catch (error) {
    next(error);
  }
};

/**
 * Delete resume by ID
 * DELETE /api/resumes/:id
 */
const deleteResume = async (req, res, next) => {
  try {
    const resume = await Resume.findOneAndDelete({
      _id: req.params.id,
      userId: req.user._id,
    });

    if (!resume) {
      return res.status(404).json({
        success: false,
        message: 'Resume not found.',
      });
    }

    await User.findByIdAndUpdate(req.user._id, { $inc: { resumesCount: -1 } });

    res.status(200).json({
      success: true,
      message: 'Resume deleted successfully.',
    });
  } catch (error) {
    next(error);
  }
};

/**
 * Duplicate an existing resume
 * POST /api/resumes/:id/duplicate
 */
const duplicateResume = async (req, res, next) => {
  try {
    const original = await Resume.findOne({
      _id: req.params.id,
      userId: req.user._id,
    });

    if (!original) {
      return res.status(404).json({
        success: false,
        message: 'Original resume not found.',
      });
    }

    const duplicate = await Resume.create({
      userId: req.user._id,
      title: `${original.title} (Copy)`,
      templateId: original.templateId,
      sections: original.sections,
      isDraft: original.isDraft,
    });

    await User.findByIdAndUpdate(req.user._id, { $inc: { resumesCount: 1 } });

    res.status(201).json({
      success: true,
      message: 'Resume duplicated successfully!',
      resume: duplicate,
    });
  } catch (error) {
    next(error);
  }
};

/**
 * AI Enhance specific section (Summary, Bullet Point, or Skills)
 * POST /api/resumes/enhance-section
 */
const enhanceSectionWithAi = async (req, res, next) => {
  try {
    const { type, payload } = req.body;

    if (!type || !payload) {
      return res.status(400).json({
        success: false,
        message: 'Please provide enhancement type and payload.',
      });
    }

    let result;

    if (type === 'summary') {
      const { role, currentSummary, experienceHighlights } = payload;
      result = await enhanceSummaryWithGemini({ role, currentSummary, experienceHighlights });
      return res.status(200).json({
        success: true,
        enhancedText: result,
      });
    }

    if (type === 'bullet') {
      const { bullet, role, company } = payload;
      result = await enhanceBulletPointWithGemini({ bullet, role, company });
      return res.status(200).json({
        success: true,
        enhancedBullet: result,
      });
    }

    if (type === 'skills') {
      const { role, currentSkills } = payload;
      result = await suggestSkillsWithGemini({ role, currentSkills });
      return res.status(200).json({
        success: true,
        suggestedSkills: result,
      });
    }

    return res.status(400).json({
      success: false,
      message: `Unknown enhancement type: ${type}`,
    });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  getResumes,
  getResumeById,
  createResume,
  updateResume,
  deleteResume,
  duplicateResume,
  enhanceSectionWithAi,
};
