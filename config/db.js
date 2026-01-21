const mongoose = require("mongoose");

const connectDB = async () => {
  // If a connection already exists, don't create a new one
  if (mongoose.connection.readyState >= 1) return;

  try {
    await mongoose.connect(process.env.MONGO_URI, {
      serverSelectionTimeoutMS: 5000, // Timeout after 5s instead of 30s
    });
    console.log("✅ MongoDB Connected");
  } catch (error) {
    console.error("❌ MongoDB Error:", error.message);
    // In serverless, we throw the error so the middleware can catch it
    throw error; 
  }
};

module.exports = connectDB;