// controllers/feedbackController.js
const Feedback = require('../models/Feedback');

// Controller to get all feedbacks
const getFeedbacks = async (req, res) => {
  try {
    const feedbacks = await Feedback.find();
    res.status(200).json(feedbacks);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching feedbacks', error });
  }
};

// Controller to create new feedback
const createFeedback = async (req, res) => {
  try {
    const newFeedback = new Feedback(req.body);
    await newFeedback.save();
    res.status(201).json(newFeedback);
  } catch (error) {
    res.status(500).json({ message: 'Error creating feedback', error });
  }
};

// TODO: Add more controllers as needed

module.exports = {
  getFeedbacks,
  createFeedback,
};
