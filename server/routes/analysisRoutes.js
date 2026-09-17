const express = require('express');
const router = express.Router();
const {
  uploadAndAnalyze,
  getAnalysisHistory,
  getAnalysisById,
  deleteAnalysis,
} = require('../controllers/analysisController');
const { protect } = require('../middleware/auth');
const { checkAnalysisLimit } = require('../middleware/usageLimit');
const upload = require('../middleware/upload');
const { aiLimiter } = require('../middleware/rateLimiter');

// All analysis routes require authentication
router.use(protect);

router.post(
  '/upload-and-analyze',
  aiLimiter,
  checkAnalysisLimit,
  upload.single('resumePdf'),
  uploadAndAnalyze
);

router.get('/history', getAnalysisHistory);

router.route('/:id')
  .get(getAnalysisById)
  .delete(deleteAnalysis);

module.exports = router;
