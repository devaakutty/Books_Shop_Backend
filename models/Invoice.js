const mongoose = require('mongoose');

const invoiceSchema = new mongoose.Schema({
  // --- Invoice Identification ---
  invoiceNumber: { 
    type: String, 
    unique: true, 
    required: true,
    default: () => `INV-BOOK-${Date.now().toString().slice(-6)}`
  },

  // --- Customer Snapshot ---
  customer: {
    name: { type: String, required: true },
    phone: { type: String, required: true },
    email: String,
    address: String
  },

  // --- Book Items (Snapshot) ---
  // Stored directly so invoice remains valid even if book is deleted
  items: [{
    productId: { type: mongoose.Schema.Types.ObjectId, ref: 'Product' },
    title: { type: String, required: true },
    author: { type: String },
    isbn: { type: String },
    category: { type: String },
    quantity: { type: Number, required: true, min: 1 },
    price: { type: Number, required: true },  // Price per book
    total: { type: Number, required: true }   // quantity * price
  }],

  // --- Financial Summary (Zoho Style) ---
  financials: {
    subtotal: { type: Number, required: true },
    taxRate: { type: Number, default: 0 }, // Books often 0% or 5% GST
    taxAmount: { type: Number, default: 0 },
    discount: { type: Number, default: 0 },
    totalAmount: { type: Number, required: true }
  },

  // --- Payment Breakdown ---
  payment: {
    method: { 
      type: String, 
      enum: ['cash', 'upi', 'card', 'split'], 
      default: 'cash' 
    },
    cashPaid: { type: Number, default: 0 },
    digitalPaid: { type: Number, default: 0 },
    transactionId: String,
    upiApp: { 
      type: String, 
      enum: ['Paytm', 'GPay', 'PhonePe', 'N/A'], 
      default: 'N/A' 
    }
  },

  status: { 
    type: String, 
    enum: ['Paid', 'Pending', 'Cancelled'], 
    default: 'Paid' 
  }

}, { timestamps: true });

module.exports = mongoose.model('Invoice', invoiceSchema);
