const mongoose = require("mongoose");

const orderSchema = new mongoose.Schema({
  // --- Customer Details ---
  customer: {
    name: { type: String, required: true },
    email: { type: String },
    mobile: { type: String, required: true },
    address: { type: String }
  },

  // --- Book Items ---
  items: [
    {
      productId: { type: mongoose.Schema.Types.ObjectId, ref: "Product" },
      title: { type: String, required: true },
      author: { type: String },
      isbn: { type: String },
      category: { type: String },
      quantity: { type: Number, required: true, min: 1 },
      price: { type: Number, required: true }, // price per book
      total: { type: Number, required: true }  // quantity * price
    }
  ],

  // --- Billing Summary ---
  subtotal: { type: Number, required: true },
  taxRate: { type: Number, default: 0 }, // Books usually 0% or 5%
  tax: { type: Number, default: 0 },
  discount: { type: Number, default: 0 },
  total: { type: Number, required: true },

  // --- Payment Details ---
  paymentType: {
    type: String,
    enum: ["cash", "upi", "card"],
    required: true
  },
  transactionId: { type: String }, // for UPI / Card
  upiApp: {
    type: String,
    enum: ["GPay", "PhonePe", "Paytm", "N/A"],
    default: "N/A"
  },

  // --- Order Status ---
  status: {
    type: String,
    enum: ["Paid", "Pending", "Cancelled"],
    default: "Paid"
  },

  createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model("Order", orderSchema);
