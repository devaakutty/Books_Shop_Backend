const express = require("express");
const dotenv = require("dotenv");
const cors = require("cors");
const connectDB = require("./config/db");

// Load env variables FIRST
dotenv.config();

const app = express();

/* -------------------- Middlewares -------------------- */
app.use(
  cors({
    origin: "http://localhost:3000", // frontend URL
    credentials: true,
  })
);
app.use(express.json());

/* -------------------- Routes -------------------- */
app.use("/api/auth", require("./routes/authRoutes"));
app.use("/api/products", require("./routes/productRoutes"));
app.use("/api/customers", require("./routes/customerRoutes"));
app.use("/api/invoices", require("./routes/invoiceRoutes"));
app.use("/api/orders", require("./routes/orderRoutes")); // ✅ FIXED (no trailing slash)

/* -------------------- Test Route -------------------- */
app.get("/", (req, res) => {
  res.send("📚 Book Shop Backend API Running...");
});

/* -------------------- Error Handler -------------------- */
app.use((err, req, res, next) => {
  console.error("❌ Error:", err.message);
  res.status(err.status || 500).json({
    success: false,
    message: err.message || "Internal Server Error",
  });
});

/* -------------------- Start Server AFTER DB -------------------- */
const PORT = process.env.PORT || 8000;

const startServer = async () => {
  try {
    await connectDB(); // ✅ wait for MongoDB
    app.listen(PORT, () => {
      console.log(`🚀 Book Shop Backend running on http://localhost:${PORT}`);
    });
  } catch (error) {
    console.error("❌ Server failed to start:", error.message);
    process.exit(1);
  }
};

startServer();
