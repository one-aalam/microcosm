
const productService = require('./product.service');

exports.all = async (req, res) => {
    res.json(productService.all());
};