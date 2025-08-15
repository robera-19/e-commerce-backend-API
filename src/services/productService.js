const repo = require('../repository/productRepository');

/**
 * Simple error helper to attach HTTP status codes
 */
function badRequest(message) {
    const err = new Error(message);
    err.status = 400;
    return err;
}

module.exports = {
    async getAllProducts() {
        return repo.getAllProducts();
    },

    async getProductById(id) {
        if (!id) throw badRequest('Product id is required');
        const product = await repo.getProductById(id);
        return product || null;
    },

    async createProduct(data) {
        if (!data || typeof data !== 'object') throw badRequest('Product data is required');
        const { name, price, description, inStock } = data;

        if (!name || typeof name !== 'string' || !name.trim()) throw badRequest('Product name is required');
        if (price === undefined || typeof price !== 'number' || Number.isNaN(price) || price < 0) throw badRequest('Product price must be a non-negative number');
        if (inStock !== undefined && typeof inStock !== 'boolean') throw badRequest('inStock must be a boolean');

        const toCreate = {
            name: name.trim(),
            price,
            description: description || '',
            inStock: inStock !== undefined ? inStock : true
        };
        const created = await repo.createProduct(toCreate);
        return created;
    },

    async updateProduct(id, data) {
        if (!id) throw badRequest('Product id is required');
        if (!data || typeof data !== 'object') throw badRequest('Update data is required');

        if (data.name !== undefined && (typeof data.name !== 'string' || !data.name.trim())) throw badRequest('If provided, name must be a non-empty string');
        if (data.price !== undefined && (typeof data.price !== 'number' || Number.isNaN(data.price) || data.price < 0)) throw badRequest('If provided, price must be a non-negative number');
        if (data.inStock !== undefined && typeof data.inStock !== 'boolean') throw badRequest('If provided, inStock must be a boolean');

        const updated = await repo.updateProduct(id, data);
        return updated || null;
    },

    async deleteProduct(id) {
        if (!id) throw badRequest('Product id is required');
        const deleted = await repo.deleteProduct(id);
        return deleted || null;
    }
};