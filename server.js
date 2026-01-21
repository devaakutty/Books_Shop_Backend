const express = require("express");
const dotenv = require("dotenv");
const cors = require("cors");
const connectDB = require("./config/db");

// Load env FIRST
dotenv.config();

const app = express();

/* -------------------- Middlewares -------------------- */
app.use(
  cors({
    origin: [
      "http://localhost:3000",          // local frontend
      "https://books-shop.vercel.app",  // 🔴 CHANGE to your real frontend URL
    ],
    credentials: true,
  })
);

app.use(express.json());

/* -------------------- Routes -------------------- */
app.use("/api/auth", require("./routes/authRoutes"));
app.use("/api/products", require("./routes/productRoutes"));
app.use("/api/customers", require("./routes/customerRoutes"));
app.use("/api/invoices", require("./routes/invoiceRoutes"));
app.use("/api/orders", require("./routes/orderRoutes"));

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

/* -------------------- DB Connection -------------------- */
connectDB();

/* -------------------- Local server ONLY -------------------- */
if (process.env.NODE_ENV !== "production") {
  const PORT = process.env.PORT || 8000;
  app.listen(PORT, () => {
    console.log(`🚀 Local Server running on http://localhost:${PORT}`);
  });
}

/* -------------------- EXPORT FOR VERCEL -------------------- */
module.exports = app;
