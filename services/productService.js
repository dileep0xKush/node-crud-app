const Product = require('../models/productModel');

const getAllProducts = async (search = '', page = 1, limit = 10) => {
  const query = search
    ? { name: { $regex: search, $options: 'i' } }
    : {};

  const skip = (page - 1) * limit;
  const total = await Product.countDocuments(query);
  const products = await Product.find(query)
    .sort({ createdAt: -1 })
    .skip(skip)
    .limit(limit)
    .lean();

  return {
    products,
    currentPage: page,
    totalPages: Math.ceil(total / limit)
  };
};

const getProductById = id => Product.findById(id).lean();
const createProduct = data => Product.create(data);
const updateProduct = (id, data) => Product.findByIdAndUpdate(id, data, { new: true });
const deleteProduct = id => Product.findByIdAndDelete(id);

module.exports = {
  getAllProducts,
  getProductById,
  createProduct,
  updateProduct,
  deleteProduct
};
