const Order = require("../models/Order");

// 🧾 Create New Order (Checkout)
exports.createOrder = async (req, res) => {
  try {
    const {
      customer,
      items,
      subtotal,
      taxRate,
      tax,
      discount,
      total,
      paymentType,
      transactionId,
      upiApp
    } = req.body;

    if (!customer || !items || items.length === 0) {
      return res.status(400).json({ message: "Customer and items are required" });
    }

    const order = await Order.create({
      customer,
      items,
      subtotal,
      taxRate,
      tax,
      discount,
      total,
      paymentType,
      transactionId,
      upiApp,
      status: "Paid"
    });

    res.status(201).json({
      message: "Order placed successfully",
      order
    });
  } catch (error) {
    console.error("Create Order Error:", error);
    res.status(500).json({ error: error.message });
  }
};

// 📦 Get All Orders
exports.getAllOrders = async (req, res) => {
  try {
    const orders = await Order.find().sort({ createdAt: -1 });
    res.json({ total: orders.length, orders });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// 🔍 Get Single Order by ID
exports.getOrderById = async (req, res) => {
  try {
    const order = await Order.findById(req.params.id);

    if (!order)
      return res.status(404).json({ message: "Order not found" });

    res.json(order);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// ✏ Update Order Status
exports.updateOrderStatus = async (req, res) => {
  try {
    const { status } = req.body;

    const updatedOrder = await Order.findByIdAndUpdate(
      req.params.id,
      { status },
      { new: true }
    );

    if (!updatedOrder)
      return res.status(404).json({ message: "Order not found" });

    res.json({
      message: "Order status updated",
      order: updatedOrder
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// 🗑 Delete Order
exports.deleteOrder = async (req, res) => {
  try {
    const deletedOrder = await Order.findByIdAndDelete(req.params.id);

    if (!deletedOrder)
      return res.status(404).json({ message: "Order not found" });

    res.json({ message: "Order deleted successfully" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
