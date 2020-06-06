const Product = require('./product.model');

class ProductService {
    all(params) {
        return [{
            "id": "pg132",
            "title": "The Art of War" },
            {
            "id": "pg2680",
            "title": "Meditations", },
            {
            "id": "pg6456",
            "title": "Public Opinion" }];
    }
    create(params) {
        const product = new Product(params);
        return product.save()
    }
}

module.exports = new ProductService();