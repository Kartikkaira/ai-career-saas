const mongoose = require('mongoose');

const experienceSchema = new mongoose.Schema({
  company: { type: String, default: '' },
  role: { type: String, default: '' },
  location: { type: String, default: '' },
  startDate: { type: String, default: '' },
  endDate: { type: String, default: '' },
  current: { type: Boolean, default: false },
  techStack: [{ type: String }],
  bullets: [{ type: String }],
});

const educationSchema = new mongoose.Schema({
  institution: { type: String, default: '' },
  degree: { type: String, default: '' },
  fieldOfStudy: { type: String, default: '' },
  location: { type: String, default: '' },
  startDate: { type: String, default: '' },
  endDate: { type: String, default: '' },
  gpa: { type: String, default: '' },
});

const skillCategorySchema = new mongoose.Schema({
  category: { type: String, default: 'General' },
  items: [{ type: String }],
});

const projectSchema = new mongoose.Schema({
  title: { type: String, default: '' },
  role: { type: String, default: '' },
  link: { type: String, default: '' },
  githubLink: { type: String, default: '' },
  startDate: { type: String, default: '' },
  endDate: { type: String, default: '' },
  techStack: [{ type: String }],
  bullets: [{ type: String }],
});

const certificationSchema = new mongoose.Schema({
  name: { type: String, default: '' },
  issuer: { type: String, default: '' },
  issueDate: { type: String, default: '' },
  credentialUrl: { type: String, default: '' },
});

const resumeSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
      index: true,
    },
    title: {
      type: String,
      required: true,
      default: 'Untitled Resume',
      trim: true,
    },
    templateId: {
      type: String,
      enum: ['classic-ats', 'standard-ats', 'modern-tech', 'executive-elite'],
      default: 'standard-ats',
    },
    isDraft: {
      type: Boolean,
      default: true,
    },
    sections: {
      personalInfo: {
        fullName: { type: String, default: '' },
        jobTitle: { type: String, default: '' },
        email: { type: String, default: '' },
        phone: { type: String, default: '' },
        location: { type: String, default: '' },
        linkedin: { type: String, default: '' },
        github: { type: String, default: '' },
        portfolio: { type: String, default: '' },
      },
      summary: {
        type: String,
        default: '',
      },
      experience: [experienceSchema],
      education: [educationSchema],
      skills: [skillCategorySchema],
      projects: [projectSchema],
      certifications: [certificationSchema],
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model('Resume', resumeSchema);
