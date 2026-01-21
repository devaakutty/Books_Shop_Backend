// const mongoose = require('mongoose');

// // export default function handler(req, res) {
// //   res.json({ message: "Data from Vercel Backend" });
// // }

// const productSchema = new mongoose.Schema({
//   // --- Basic Identification ---
//   title: { type: String, required: true, trim: true },
//   author: { type: String, required: true, trim: true },
//   publisher: { type: String, trim: true },
  
//   // --- Book Specifications ---
//   details: {
//     genre: { type: String, required: true },        // e.g., "Fiction", "Education"
//     language: { type: String, required: true },     // e.g., "English"
//     pages: { type: Number },                        // e.g., 350
//     edition: { type: String },                      // e.g., "2nd Edition"
//     format: { type: String, enum: ['Paperback', 'Hardcover', 'Ebook'], default: 'Paperback' }
//   },

//   // --- Unique Book ID ---
//   isbn: { 
//     type: String, 
//     unique: true, 
//     required: true 
//   },

//   // --- Financial Details ---
//   price: {
//     costPrice: { type: Number, required: true },     // Buying price
//     sellingPrice: { type: Number, required: true },  // Customer price
//     gstRate: { type: Number, default: 5 }             // GST for books in India
//   },

//   // --- Inventory ---  
//   stock: { type: Number, default: 1 },
//   condition: { 
//     type: String, 
//     enum: ['New', 'Used'], 
//     default: 'New' 
//   },

//   // --- Media & Status ---
//   images: [String],   // Book cover images
//   status: { 
//     type: String, 
//     enum: ['In Stock', 'Out of Stock'], 
//     default: 'In Stock' 
//   },

//   createdAt: { type: Date, default: Date.now }
// });

// module.exports = mongoose.model('Product', productSchema);
const express = require("express");
const router = express.Router();

router.get("/", (req, res) => {
  res.json({
    success: true,
    message: "✅ Products API working",
    products: []
  });
});

module.exports = router;
