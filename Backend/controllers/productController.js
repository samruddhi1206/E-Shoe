const Product = require('../models/Product');

// Get all products
const getProducts = async (req, res) => {
  try {
    const products = await Product.find().sort({ createdAt: -1 });

    res.status(200).json({
      count: products.length,
      products,
    });
  } catch (error) {
    console.error('Get products error:', error);

    res.status(500).json({
      message: 'Server error',
    });
  }
};

// Get single product
const getProductById = async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);

    if (!product) {
      return res.status(404).json({
        message: 'Product not found',
      });
    }

    res.status(200).json(product);
  } catch (error) {
    console.error('Get product error:', error);

    res.status(500).json({
      message: 'Server error',
    });
  }
};

// Create product
const createProduct = async (req, res) => {
  try {
    const {
      name,
      brand,
      gender,
      price,
      description,
      images,
      category,
      sizes,
      colors,
      stock,
      rating,
    } = req.body;

    // Check required fields
    if (
      !name ||
      !brand ||
      !gender ||
      price === undefined ||
      !description ||
      !images ||
      !category ||
      !sizes ||
      !colors ||
      stock === undefined
    ) {
      return res.status(400).json({
        message: 'All required fields must be provided',
      });
    }

    // Create product
    const product = await Product.create({
      name,
      brand,
      gender,
      price,
      description,
      images,
      category,
      sizes,
      colors,
      stock,
      rating,
    });

    res.status(201).json({
      message: 'Product created successfully',
      product,
    });
  } catch (error) {
    console.error('Create product error:', error);

    res.status(500).json({
      message: 'Server error',
    });
  }
};

module.exports = {
  getProducts,
  getProductById,
  createProduct,
};