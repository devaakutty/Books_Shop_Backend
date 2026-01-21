const mongoose = require('mongoose');

const customerSchema = new mongoose.Schema({
  name: { 
    type: String, 
    required: true, 
    trim: true 
  },

  phone: { 
    type: String, 
    required: true, 
    unique: true,      // One customer per mobile number
    trim: true 
  },

  email: { 
    type: String, 
    lowercase: true, 
    trim: true 
  },

  address: { 
    type: String, 
    trim: true 
  },

  // Link to all invoices made by this customer
  purchaseHistory: [{ 
    type: mongoose.Schema.Types.ObjectId, 
    ref: 'Invoice' 
  }],

  // Optional: track total spend
  totalSpent: { 
    type: Number, 
    default: 0 
  }

}, { timestamps: true });

module.exports = mongoose.model('Customer', customerSchema);
