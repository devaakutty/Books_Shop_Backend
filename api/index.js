const express = require("express");
const cors = require("cors");
const connectDB = require("../config/db");
const dotenv = require("dotenv");

dotenv.config();

const app = express();

// Middlewares
app.use(cors({
  origin: [
    "http://localhost:3000", // local dev
    "https://your-frontend.vercel.app", // replace with your real frontend URL
  ],
  credentials: true,
}));
app.use(express.json());

// Routes
app.use("/api/products", require("../routes/productRoutes"));
// add other routes: /api/auth, /api/customers, etc

// Test route
app.get("/", (req, res) => res.send("📚 Backend Running"));

// Connect to DB (serverless-safe)
connectDB().catch(err => {
  console.error("❌ MongoDB connection failed", err.message);
});

module.exports = app;
