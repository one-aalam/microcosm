const Router = require('express').Router();
const auth = require('../middlewares/auth');

const authController =  require('./auth.controller');

Router.post('/signin', authController.signin);
Router.post('/signup', authController.signup);
Router.get('/me', auth, authController.me);


module.exports = Router;