const Router = require('express').Router();

const productController =  require('./product.controller');

Router.get('/', async (req, res) => {
    const all = await productController.all();
    res.json(all);
});

module.exports = Router;