const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
const connectDB = require("../config/db");

dotenv.config();

const app = express();

/* -------------------- Middlewares -------------------- */
app.use(cors({ origin: "*" }));
app.use(express.json());

/* -------------------- MongoDB (SERVERLESS SAFE) -------------------- */
let isConnected = false;

app.use(async (req, res, next) => {
  try {
    if (!isConnected) {
      await connectDB();
      isConnected = true;
      console.log("✅ MongoDB connected (Vercel)");
    }
    next();
  } catch (err) {
    console.error("❌ MongoDB connection error:", err.message);
    return res.status(500).json({
      success: false,
      message: "Database connection failed",
    });
  }
});

/* -------------------- Routes -------------------- */
app.use("/api/products", require("../routes/productRoutes"));
app.use("/api/auth", require("../routes/authRoutes"));
app.use("/api/customers", require("../routes/customerRoutes"));
app.use("/api/invoices", require("../routes/invoiceRoutes"));
app.use("/api/orders", require("../routes/orderRoutes"));

/* -------------------- Health Check -------------------- */
app.get("/", (req, res) => {
  res.status(200).send("Welcome to Book Of heaven !");
});

/* -------------------- Error Handler -------------------- */
app.use((err, req, res, next) => {
  console.error("🔥 Error:", err.stack);
  res.status(500).json({
    success: false,
    message: "Internal Server Error",
  });
});

/* -------------------- EXPORT ONLY -------------------- */
module.exports = app;
