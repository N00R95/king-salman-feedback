// models/Feedback.js
const mongoose = require('mongoose');

const feedbackSchema = new mongoose.Schema({
  overallExperience: { type: Number, required: true },
  staffFriendliness: { type: String, required: true },
  // Add other fields as needed
});


const Feedback = mongoose.model('Feedback', feedbackSchema);
module.exports = Feedback;