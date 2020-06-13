const Product = require('./product.model');

class ProductService {
    all(params) {
        return Product.find(params);
    }
    one(params = {}) {
        const isIdParam = Object.keys(params).length === 1 &&  params.id;
        let _Product;
        if(isIdParam) {
            _Product = Product.findById(params.id);
        } else {
            _Product = Product.findOne({
                ...params
            });
        }
        if (populate) {
            _Product = _Product.populate('addresses')
        }
        return _Product;
    }
    create(params) {
        const product = new Product(params);
        return product.save()
    }
    update(id, { token, ...rest }){
        return Product.findByIdAndUpdate(id, rest, { new: true });
    }
    remove(id) {
        return Product.findByIdAndRemove(id);
    }
}

module.exports = new ProductService();