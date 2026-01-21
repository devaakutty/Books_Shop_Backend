// const express = require("express");
// const cors = require("cors");
// const connectDB = require("../config/db");
// const dotenv = require("dotenv");

// dotenv.config();

// const app = express();

// // -------------------- Middlewares --------------------
// app.use(
//   cors({
//     origin: [
//       "http://localhost:3000", // local dev
//       "https://your-frontend.vercel.app", // replace with your real frontend URL
//     ],
//     credentials: true,
//   })
// );
// app.use(express.json());

// // -------------------- Routes --------------------
// app.use("/api/products", require("../routes/productRoutes"));
// app.use("/api/auth", require("../routes/authRoutes"));
// app.use("/api/customers", require("../routes/customerRoutes"));
// app.use("/api/invoices", require("../routes/invoiceRoutes"));
// app.use("/api/orders", require("../routes/orderRoutes"));

// // -------------------- Test Route --------------------
// app.get("/", (req, res) => res.send("📚 Backend Running"));

// // -------------------- MongoDB Connect (Serverless Safe) --------------------
// connectDB().catch((err) => {
//   console.error("❌ MongoDB connection failed", err.message);
// });

// module.exports = app;


// const express = require("express");
// const cors = require("cors");
// const dotenv = require("dotenv");
// const connectDB = require("../config/db");

// dotenv.config();

// const app = express();

// // Middleware
// app.use(cors({
//   origin: "*", // for now (safe for testing)
// }));
// app.use(express.json());

// // Routes
// app.use("/api/products", require("../routes/productRoutes"));

// // Test route
// app.get("/api", (req, res) => {
//   res.send("📚 Backend API running on Vercel");
// });

// // DB connect (serverless-safe)
// connectDB().catch(err => {
//   console.error("MongoDB error:", err.message);
// });

// module.exports = app;


const express = require("express");
const app = express();

app.get("/api", (req, res) => {
  res.send("API WORKING");
});

app.get("/api/products", (req, res) => {
  res.json({ ok: true });
});

module.exports = app;
