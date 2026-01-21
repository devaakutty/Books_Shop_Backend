const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
const connectDB = require("../config/db");

dotenv.config();

const app = express();

/* -------------------- Middlewares -------------------- */
app.use(cors({
  origin: "*", // OK for now (lock later)
}));
app.use(express.json());

/* -------------------- Connect DB ONCE -------------------- */
connectDB()
  .then(() => console.log("✅ DB Ready for requests"))
  .catch(err => {
    console.error("❌ MongoDB connection failed:", err.message);
  });

/* -------------------- Routes -------------------- */
app.use("/api/products", require("../routes/productRoutes"));
app.use("/api/auth", require("../routes/authRoutes"));
app.use("/api/customers", require("../routes/customerRoutes"));
app.use("/api/invoices", require("../routes/invoiceRoutes"));
app.use("/api/orders", require("../routes/orderRoutes"));

/* -------------------- Health Check -------------------- */
app.get("/", (req, res) => {
  res.status(200).send("📚 Book Shop Backend API is live on Vercel!");
});

/* -------------------- Error Handler -------------------- */
app.use((err, req, res, next) => {
  console.error("🔥 Error:", err.message);
  res.status(500).json({
    success: false,
    message: err.message || "Internal Server Error",
  });
});

/* -------------------- EXPORT ONLY -------------------- */
module.exports = app;
