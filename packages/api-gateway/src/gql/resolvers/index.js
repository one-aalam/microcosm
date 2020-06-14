const userResolver = require('./user');
const productResolver = require('./product');
const orderResolver = require('./order');

module.exports = [ userResolver, productResolver, orderResolver]