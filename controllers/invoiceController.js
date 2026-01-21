const Invoice = require("../models/Invoice");
const Product = require("../models/Product");
const Customer = require("../models/Customer");
const PDFDocument = require("pdfkit");

exports.createInvoice = async (req, res) => {
  try {
    const { customer, items, financials, payment } = req.body;

    if (!customer || !items || items.length === 0) {
      return res.status(400).json({ message: "Invalid invoice data" });
    }

    // 1️⃣ CREATE INVOICE
    const invoiceNumber = `INV-${Date.now().toString().slice(-6)}`;

    const newInvoice = new Invoice({
      invoiceNumber,
      customer,
      items,
      financials,
      payment,
      status: "Paid",
    });

    const savedInvoice = await newInvoice.save();

    // 2️⃣ INVENTORY: REDUCE STOCK
    for (const item of items) {
      await Product.findOneAndUpdate(
        { imei: item.imei },
        { 
          $inc: { stock: -1 }, 
          $set: { status: "Sold" } 
        },
        { new: true }
      );
    }

    // 3️⃣ CUSTOMER: ADD INVOICE TO HISTORY
    await Customer.findOneAndUpdate(
      { phone: customer.phone },
      { $push: { purchaseHistory: savedInvoice._id } },
      { upsert: true, new: true }
    );

    // 4️⃣ PDF GENERATION
    const doc = new PDFDocument({ margin: 50, size: "A4" });

    res.setHeader("Content-Type", "application/pdf");
    res.setHeader(
      "Content-Disposition",
      `attachment; filename=${invoiceNumber}.pdf`
    );

    doc.pipe(res);

    // ===== PDF HEADER =====
    doc.fillColor("#1e1b4b").fontSize(20).text("MOBILE VAULT SHOP", 50, 50);
    doc.fontSize(10).fillColor("#64748b").text("GSTIN: 33AAAAA0000A1Z5", 50, 75);

    doc.fillColor("#000000").fontSize(12).text(`INVOICE: ${invoiceNumber}`, 400, 50);
    doc.text(`Date: ${new Date().toLocaleDateString()}`, 400, 65);

    doc.moveTo(50, 100).lineTo(550, 100).stroke("#e2e8f0");

    // ===== BILL TO =====
    doc.fontSize(10).text("BILL TO:", 50, 120, { underline: true });
    doc.fontSize(12).text(customer.name, 50, 135);
    doc.fontSize(10).text(`Contact: ${customer.phone}`, 50, 150);

    // ===== TABLE HEADER =====
    doc.rect(50, 180, 500, 20).fill("#f8fafc");
    doc.fillColor("#475569").fontSize(9).text("PRODUCT (MODEL & IMEI)", 60, 187);
    doc.text("WARRANTY", 300, 187);
    doc.text("PRICE", 450, 187);

    // ===== ITEMS =====
    let y = 210;
    items.forEach((item) => {
      doc.fillColor("#000000").fontSize(10).text(item.model, 60, y);
      doc.fontSize(8).fillColor("#6366f1").text(`IMEI: ${item.imei}`, 60, y + 12);
      doc.fillColor("#000000").fontSize(10).text("1 Year", 300, y);
      doc.text(`INR ${item.price}`, 450, y);
      y += 40;
    });

    // ===== TOTALS =====
    doc.moveTo(350, y).lineTo(550, y).stroke("#e2e8f0");

    doc.fontSize(10).fillColor("#000000").text("Subtotal:", 350, y + 20);
    doc.text(`INR ${financials.subtotal}`, 480, y + 20);

    doc.text("GST (18%):", 350, y + 40);
    doc.text(`INR ${financials.taxAmount}`, 480, y + 40);

    doc.rect(350, y + 60, 200, 30).fill("#6366f1");
    doc.fillColor("#ffffff").font("Helvetica-Bold").text("TOTAL:", 360, y + 70);
    doc.text(`INR ${financials.totalAmount}`, 480, y + 70);

    doc.end();

  } catch (error) {
    console.error(error);
    res.status(500).json({ error: error.message });
  }
};
