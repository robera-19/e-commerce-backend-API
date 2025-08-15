const express = require('express');
const router = express.Router();
const productController = require('../controllers/productController');

function ensureHandler(fn, name) {
    if (typeof fn !== 'function') {
        // Throw early with a clear, actionable message
        throw new Error(`Route handler "${name}" is not a function (got ${typeof fn}). Did you export it from src/controllers/productController.js using module.exports?`);
    }
    return fn;
}

router.get('/products', ensureHandler(productController.getAllProducts, 'getAllProducts'));
router.get('/products/:id', ensureHandler(productController.getProductById, 'getProductById'));
router.post('/products', ensureHandler(productController.createProduct, 'createProduct'));
router.put('/products/:id', ensureHandler(productController.updateProduct, 'updateProduct'));
router.delete('/products/:id', ensureHandler(productController.deleteProduct, 'deleteProduct'));

module.exports = router;