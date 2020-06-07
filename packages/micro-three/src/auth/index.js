const Router = require('express').Router();

const authController =  require('./auth.controller');

Router.post('/signin', authController.signin);
Router.post('/signup', authController.signup);


module.exports = Router;