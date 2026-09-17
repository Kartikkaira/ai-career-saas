const express = require('express');
const router = express.Router();
const {
  getUserDashboardStats,
  updateProfile,
} = require('../controllers/userController');
const { protect } = require('../middleware/auth');

router.use(protect);

router.get('/dashboard-stats', getUserDashboardStats);
router.put('/profile', updateProfile);

module.exports = router;
