const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const dotenv = require('dotenv');
const Feedback = require('./models/Feedback')
// Load environment variables from .env file
dotenv.config();

// Initialize Express
const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(express.json());
app.use(cors());

// MongoDB Connection
const connectDB = async () => {
  try {
    // Connect to MongoDB using the connection string from environment variables
    await mongoose.connect(process.env.MONGO_URI);
    console.log('MongoDB connected successfully');
  } catch (error) {
    console.error('MongoDB connection error:', error);
    process.exit(1); // Exit process with failure
  }
};

connectDB();

// Import Routes
const feedbackRoutes = require('./routes/feedbackRoutes');

// Use Routes
app.use('/api/feedback', feedbackRoutes);

// Root Route
app.get('/', (req, res) => {
  res.send('Welcome to the Feedback App API');
});
app.get(' ')
// Start Server
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
