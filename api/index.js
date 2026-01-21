const express = require("express");
const dotenv = require("dotenv");
const cors = require("cors");
const connectDB = require("../config/db");

// Load env vars
dotenv.config();

const app = express();

/* -------------------- Middleware -------------------- */
app.use(
  cors({
    origin: "*", // or your frontend URL
    credentials: true,
  })
);
app.use(express.json());

/* -------------------- Routes -------------------- */
app.use("/api/auth", require("../routes/authRoutes"));
app.use("/api/products", require("../routes/productRoutes"));
app.use("/api/customers", require("../routes/customerRoutes"));
app.use("/api/invoices", require("../routes/invoiceRoutes"));
app.use("/api/orders", require("../routes/orderRoutes")); // ✅ FIXED

/* -------------------- Test Route -------------------- */
app.get("/", (req, res) => {
  res.send("📚 Book Shop Backend API Running on Vercel...");
});

/* -------------------- DB + Local Server -------------------- */
if (process.env.NODE_ENV !== "production") {
  const PORT = process.env.PORT || 8000;

  connectDB()
    .then(() => {
      app.listen(PORT, () => {
        console.log(`🚀 Local Server running at http://localhost:${PORT}`);
      });
    })
    .catch((err) => {
      console.error("❌ MongoDB connection failed:", err.message);
      process.exit(1);
    });
}

/* -------------------- Export for Vercel -------------------- */
module.exports = app;
