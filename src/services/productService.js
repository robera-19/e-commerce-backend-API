const repo = require('../repository/productRepository');

// error helper
function badRequest(message) {
  const err = new Error(message);
  err.status = 400;
  throw err;
}

class ProductService {
  async getAllProducts() {
    return await repo.getAllProducts();
  }

  async getProductById(id) {
    if (!id) badRequest('Product id is required');
    return await repo.getProductById(id);
  }

  async createProduct({ name, price, description = '', inStock = true } = {}) {
    if (!name || typeof name !== 'string' || !name.trim()) badRequest('Product name is required');
    if (price === undefined || typeof price !== 'number' || price < 0) badRequest('Product price must be a non-negative number');
    if (typeof inStock !== 'boolean') badRequest('inStock must be a boolean');

    return await repo.createProduct({
      name: name.trim(),
      price,
      description,
      inStock
    });
  }

  async updateProduct(id, data = {}) {
    if (!id) badRequest('Product id is required');

    const { name, price, inStock } = data;
    if (name !== undefined && (!name || typeof name !== 'string')) badRequest('If provided, name must be a non-empty string');
    if (price !== undefined && (typeof price !== 'number' || price < 0)) badRequest('If provided, price must be a non-negative number');
    if (inStock !== undefined && typeof inStock !== 'boolean') badRequest('If provided, inStock must be a boolean');

    return await repo.updateProduct(id, data);
  }

  async deleteProduct(id) {
    if (!id) badRequest('Product id is required');
    return await repo.deleteProduct(id);
  }
}

module.exports = new ProductService();