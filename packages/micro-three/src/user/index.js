const Router = require('express').Router();

const userController =  require('./user.controller');

Router.get('/', userController.all);
Router.post('/', userController.create);

Router.get('/genadmin', userController.setupRootUser);

module.exports = Router;