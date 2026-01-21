const express = require("express");
const router = express.Router();
const { createInvoice } = require("../controllers/invoiceController");

// Create Invoice + Download PDF
router.post("/", createInvoice);

module.exports = router;
