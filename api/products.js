import connectDB from "../config/db";
import Product from "../models/Product";

export default async function handler(req, res) {
  await connectDB();

  if (req.method === "GET") {
    const products = await Product.find();
    return res.status(200).json(products);
  }

  res.status(405).json({ message: "Method not allowed" });
}
