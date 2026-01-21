const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
const connectDB = require("../config/db"); // Ensure ../ path is correct

dotenv.config();
const app = express();

// 1. Unified Middleware
app.use(cors({
    origin: "*", // Change to your frontend URL later for security
    credentials: true,
}));
app.use(express.json());

// 2. Serverless-Safe DB Connection Middleware
// This waits for the DB to connect before moving to the routes
app.use(async (req, res, next) => {
    try {
        await connectDB();
        next();
    } catch (err) {
        console.error("Critical Connection Error:", err.message);
        res.status(500).json({ error: "Database connection failed" });
    }
});

// 3. Routes (Ensure paths use ../)
app.use("/api/products", require("../routes/productRoutes"));
app.use("/api/auth", require("../routes/authRoutes"));
app.use("/api/customers", require("../routes/customerRoutes"));
app.use("/api/invoices", require("../routes/invoiceRoutes"));
app.use("/api/orders", require("../routes/orderRoutes"));

// 4. Test Route
app.get("/", (req, res) => res.send("📚 Book Shop Backend API is live on Vercel!"));

// 5. Global Error Handler (Prevents Function Crash)
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).send('Something broke!');
});

// IMPORTANT: Do NOT call app.listen() here. Just export.
module.exports = app;