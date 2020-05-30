const Router = require('express').Router();

const productController =  require('./product.controller');

Router.get('/', productController.all);

module.exports = Router;