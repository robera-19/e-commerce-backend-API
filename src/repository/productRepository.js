const Product = require('../models/product');

const createProduct = async (productData) => {
    const product = new Product(productData);
    return await product.save();
};

const getProductById = async (id) => {
    return await Product.findById(id);
};

const getAllProducts = async () => {
    return await Product.find();
};

const updateProduct = async (id, productData) => {
    return await Product.findByIdAndUpdate(id, productData, { new: true });
};

const deleteProduct = async (id) => {
    return await Product.findByIdAndDelete(id);
};

module.exports = {
    createProduct,
    getProductById,
    getAllProducts,
    updateProduct,
    deleteProduct
};