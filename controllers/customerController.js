// const Customer = require('../models/Customer');

// // 1. Get Customer by Phone (Used during Billing)
// exports.getCustomerByPhone = async (req, res) => {
//   try {
//     const customer = await Customer.findOne({ phone: req.params.phone })
//       .populate('purchaseHistory'); // Shows all their previous bills
    
//     if (!customer) {
//       return res.status(404).json({ message: "New Customer detected" });
//     }
    
//     res.json(customer);
//   } catch (err) {
//     res.status(500).json({ error: err.message });
//   }
// };

// // 2. Add/Update Customer
// exports.upsertCustomer = async (req, res) => {
//   const { name, phone, email, address } = req.body;
//   try {
//     // Search for existing, or create new (Upsert)
//     const customer = await Customer.findOneAndUpdate(
//       { phone },
//       { name, email, address },
//       { new: true, upsert: true }
//     );
//     res.status(200).json(customer);
//   } catch (err) {
//     res.status(400).json({ error: err.message });
//   }
// };

// // 3. Get All Customers (For Admin Dashboard)
// exports.getAllCustomers = async (req, res) => {
//   try {
//     const customers = await Customer.find().sort({ createdAt: -1 });
//     res.json(customers);
//   } catch (err) {
//     res.status(500).json({ error: err.message });
//   }
// };
const Customer = require("../models/Customer");

// Create Customer
exports.createCustomer = async (req, res) => {
  try {
    const customer = await Customer.create(req.body);
    res.status(201).json(customer);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Get All Customers
exports.getAllCustomers = async (req, res) => {
  const customers = await Customer.find().sort({ createdAt: -1 });
  res.json(customers);
};

// Get Single Customer
exports.getCustomerById = async (req, res) => {
  const customer = await Customer.findById(req.params.id).populate("purchaseHistory");
  if (!customer) return res.status(404).json({ message: "Customer not found" });
  res.json(customer);
};
