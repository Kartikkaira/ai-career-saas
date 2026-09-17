const mongoose = require('mongoose');

const suggestionSchema = new mongoose.Schema({
  section: { type: String, default: 'General' },
  suggestion: { type: String, required: true },
  exampleFix: { type: String, default: '' },
  priority: { type: String, enum: ['high', 'medium', 'low'], default: 'medium' },
});

const grammarIssueSchema = new mongoose.Schema({
  issue: { type: String, required: true },
  correction: { type: String, required: true },
  context: { type: String, default: '' },
});

const analysisSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
      index: true,
    },
    resumeFileName: {
      type: String,
      default: 'Uploaded_Resume.pdf',
    },
    targetRole: {
      type: String,
      default: '',
      trim: true,
    },
    jobDescription: {
      type: String,
      default: '',
    },
    overallAtsScore: {
      type: Number,
      required: true,
      min: 0,
      max: 100,
    },
    scoreBreakdown: {
      formatting: { type: Number, default: 70, min: 0, max: 100 },
      keywordMatch: { type: Number, default: 70, min: 0, max: 100 },
      quantifiedImpact: { type: Number, default: 70, min: 0, max: 100 },
      actionVerbs: { type: Number, default: 70, min: 0, max: 100 },
      lengthAndStructure: { type: Number, default: 70, min: 0, max: 100 },
      contactCompleteness: { type: Number, default: 70, min: 0, max: 100 },
    },
    matchedKeywords: [{ type: String }],
    missingKeywords: [{ type: String }],
    strengths: [{ type: String }],
    criticalIssues: [{ type: String }],
    actionableSuggestions: [suggestionSchema],
    grammarAndClarity: [grammarIssueSchema],
    executiveSummary: {
      type: String,
      default: '',
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model('Analysis', analysisSchema);
