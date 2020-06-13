const Router = require('express').Router();

const productController =  require('./product.controller');

Router.get('/', productController.all);
Router.post('/', productController.create);

Router.get('/:id', productController.one);

module.exports = Router;