const productService = require('../services/productService');

const productController = {
  getAllProducts: async function(req, res, next) {
    try {
      const products = await productService.getAllProducts();
      res.json(products);
    } catch (err) {
      next(err);
    }
  },

  getProductById: async function(req, res, next) {
    try {
      const product = await productService.getProductById(req.params.id);
      if (!product) return res.status(404).json({ message: 'Product not found' });
      res.json(product);
    } catch (err) {
      next(err);
    }
  },

  createProduct: async function(req, res, next) {
    try {
      const created = await productService.createProduct(req.body);
      res.status(201).json(created);
    } catch (err) {
      next(err);
    }
  },

  updateProduct: async function(req, res, next) {
    try {
      const updated = await productService.updateProduct(req.params.id, req.body);
      if (!updated) return res.status(404).json({ message: 'Product not found' });
      res.json(updated);
    } catch (err) {
      next(err);
    }
  },

  deleteProduct: async function(req, res, next) {
    try {
      const deleted = await productService.deleteProduct(req.params.id);
      if (!deleted) return res.status(404).json({ message: 'Product not found' });
      res.json({ message: 'Product deleted successfully' });
    } catch (err) {
      next(err);
    }
  }
};

module.exports = productController;