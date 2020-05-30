const Router = require('express').Router();

const productController =  require('./product.controller');

Router.get('/', productController.all);
Router.post('/', productController.create);

module.exports = Router;