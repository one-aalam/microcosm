const Router = require('express').Router();

const orderController =  require('./order.controller');

Router.get('/', orderController.all);
Router.post('/', orderController.create);

Router.get('/:id', orderController.one);
Router.put('/:id', orderController.update);
Router.delete('/:id', orderController.remove);

module.exports = Router;