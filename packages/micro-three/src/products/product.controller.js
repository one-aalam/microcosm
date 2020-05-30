
const productService = require('./product.service');

exports.all = async (req, res) => {
    res.json(productService.all());
};

exports.create = async (req, res, next) => {
    return productService.create(req.body).then(() => {
        res.send('Product created successfully!')
    }, (err) => {
        if(err) {
            next(err);
        }
    })
};