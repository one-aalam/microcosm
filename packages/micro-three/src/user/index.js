const Router = require('express').Router();

const userController =  require('./user.controller');

Router.get('/', userController.all);
Router.post('/', userController.create);

Router.get('/:id', userController.one);
Router.put('/:id', userController.update);
Router.delete('/:id', userController.remove);

Router.post('/:id/address', userController.createAddress);
Router.put('/:id/address/:subId', userController.updateAddress);
Router.delete('/:id/address/:subId', userController.removeAddress);

Router.get('/genadmin', userController.setupRootUser);

module.exports = Router;