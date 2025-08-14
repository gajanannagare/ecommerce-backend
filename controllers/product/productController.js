import { ProductModel } from "../../models/products.js";

export const getProducts = async (req, res) => {
  try {
    const products = await ProductModel.find({});
    res.status(201).json({
      success: true,
      data: products,
      message: products.length == 0 ? "Products not found" : "Product Fetched",
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: `Server error ${error}`,
    });
  }
};

export const getProductById = async (req, res) => {
  const id = req.params.id;
  try {
    const product = await ProductModel.findOne({ _id: id });
    res.status(201).json({
      success: true,
      data: product,
      message: "Product fetched successfully",
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: `Server error ${error}`,
    });
  }
};

export const createProduct = async (req, res) => {
  try {
    const newProduct = req.body;
    const product = await ProductModel.create(newProduct);
    res.status(201).json({
      success: true,
      data: product,
      message: "Product saved successfully",
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: `Server error, ${error}`,
    });
  }
};
