const Product = require('./product.model');

class ProductService {
    all(params) {
        return [];
    }
    create(params) {
        const product = new Product(params);
        return product.save()
    }
}

module.exports = new ProductService();