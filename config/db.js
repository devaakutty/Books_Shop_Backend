const mongoose = require("mongoose");

let isConnected;

const connectDB = async () => {
  if (isConnected) return;

  if (!process.env.MONGO_URI) {
    throw new Error("MONGO_URI is missing in environment variables");
  }

  const conn = await mongoose.connect(process.env.MONGO_URI);
  isConnected = conn;
  console.log("✅ MongoDB Connected");
};

module.exports = connectDB;
