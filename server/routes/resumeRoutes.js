const express = require('express');
const router = express.Router();
const {
  getResumes,
  getResumeById,
  createResume,
  updateResume,
  deleteResume,
  duplicateResume,
  enhanceSectionWithAi,
} = require('../controllers/resumeController');
const { protect } = require('../middleware/auth');
const { checkResumeCreationLimit } = require('../middleware/usageLimit');
const { aiLimiter } = require('../middleware/rateLimiter');

// All resume routes require authentication
router.use(protect);

router.route('/')
  .get(getResumes)
  .post(checkResumeCreationLimit, createResume);

router.post('/enhance-section', aiLimiter, enhanceSectionWithAi);

router.route('/:id')
  .get(getResumeById)
  .put(updateResume)
  .delete(deleteResume);

router.post('/:id/duplicate', checkResumeCreationLimit, duplicateResume);

module.exports = router;
