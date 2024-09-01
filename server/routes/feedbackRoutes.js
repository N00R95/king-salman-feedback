// routes/feedbackRoutes.js
const express = require('express');
const router = express.Router();
const { getFeedbacks, createFeedback } = require('../controllers/feedbackController');

// GET all feedback
router.get('/', getFeedbacks);

// POST new feedback
router.post('/', createFeedback);

module.exports = router;
