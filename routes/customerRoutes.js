const express = require("express");
const router = express.Router();
const { createCustomer, getAllCustomers, getCustomerById } = require("../controllers/customerController");

router.post("/", createCustomer);
router.get("/", getAllCustomers);
router.get("/:id", getCustomerById);

module.exports = router;
