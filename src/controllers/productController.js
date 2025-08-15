const productService = require('../services/productService'); // may throw if service missing; that's fine for now

module.exports = {
    getAllProducts: async (req, res, next) => {
        try {
            if (productService && typeof productService.getAllProducts === 'function') {
                const products = await productService.getAllProducts();
                return res.json(products);
            } else {
                // Service not implemented yet
                return res.status(501).json({ message: 'getAllProducts not implemented' });
            }
        } catch (err) {
            next(err);
        }
    },

    getProductById: async (req, res, next) => {
        try {
            const { id } = req.params;
            if (productService && typeof productService.getProductById === 'function') {
                const product = await productService.getProductById(id);
                if (!product) return res.status(404).json({ message: 'Product not found' });
                return res.json(product);
            } else {
                return res.status(501).json({ message: 'getProductById not implemented' });
            }
        } catch (err) {
            next(err);
        }
    },

    createProduct: async (req, res, next) => {
        try {
            if (productService && typeof productService.createProduct === 'function') {
                const created = await productService.createProduct(req.body);
                return res.status(201).json(created);
            } else {
                return res.status(501).json({ message: 'createProduct not implemented' });
            }
        } catch (err) {
            next(err);
        }
    },

    updateProduct: async (req, res, next) => {
        try {
            const { id } = req.params;
            if (productService && typeof productService.updateProduct === 'function') {
                const updated = await productService.updateProduct(id, req.body);
                if (!updated) return res.status(404).json({ message: 'Product not found' });
                return res.status(200).json(updated);
            } else {
                return res.status(501).json({ message: 'updateProduct not implemented' });
            }
        } catch (err) {
            next(err);
        }
    },

    deleteProduct: async (req, res, next) => {
        try {
            const { id } = req.params;
            if (productService && typeof productService.deleteProduct === 'function') {
                const deleted = await productService.deleteProduct(id);
                if (!deleted) return res.status(404).json({ message: 'Product not found' });
                // Return only success message (no deleted data)
                return res.status(200).json({ message: 'Product deleted successfully' });
            } else {
                return res.status(501).json({ message: 'deleteProduct not implemented' });
            }
        } catch (err) {
            next(err);
        }
    }
};