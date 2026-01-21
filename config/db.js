const mongoose = require("mongoose");

const connectDB = async () => {
  // 1. Check if we are already connected (readyState 1 = connected, 2 = connecting)
  if (mongoose.connection.readyState >= 1) {
    return;
  }

  // 2. Validate the URI exists
  if (!process.env.MONGO_URI) {
    console.error("❌ MONGO_URI is missing in Vercel environment variables.");
    throw new Error("MONGO_URI is not defined");
  }

  try {
    // 3. Connect with optimized settings for serverless
    await mongoose.connect(process.env.MONGO_URI, {
      serverSelectionTimeoutMS: 5000, // Timeout after 5s instead of 30s
    });
    
    console.log("✅ MongoDB Connected successfully");
  } catch (error) {
    console.error("❌ MongoDB Connection Error:", error.message);
    // CRITICAL: Do NOT use process.exit(1) here as it crashes Vercel functions
    throw error; 
  }
};

module.exports = connectDB;