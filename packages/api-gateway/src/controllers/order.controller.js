const axios = require('axios');
const nconf = require('nconf');
const asyncRun = require('../middlewares/async-run');

const productController = require('./product.controller');
const userController = require('./user.controller');

const instance = axios.create({
    baseURL: nconf.get('API_ORDER_SERVICE') || 'http://localhost:3003'
})

exports.one = asyncRun(async (args) => {
    const { data } = await instance.get(`/orders/${args.id}`)
    return data;
});
exports.all = asyncRun(async (args) => {
    const { data } = await instance.get('/orders', args);
    return data;
});

exports.create = asyncRun(async (args) => {
    const { customer, totalOrderValue, address, prodcuts } = args;
    const productMap = {};
    prodcuts.forEach((product) => {
        productMap[product._id] = product;
    });
    const productIds = Object.keys(productMap);

    const { name, email } = await userController.one({ id: customer._id })
    const productsApplicable = await productController.all({ query: {
        ids: productIds
    }})
    const productsToPersist = productsApplicable.map(({ _id, name, price}) => {
        return {
            _id,
            name,
            price,
            qty: productMap[_id].qty
        }
    });

    const payload = {
        products: productsToPersist,
        customer: {
            _id: customer._id,
            name: `${name.last}, ${name.first}`,
            email
        }, // @TODO: Get this from user token { _id: '5edcf11e55cafd23f9f8cfda', email: 'one@mail.com' }
        totalOrderValue, // @TODO: Re-compute before passing
        status: "IN_PROGRESS", // @TODO: Get this from config
        paymentMethod: "PAYPAL", // @TODO: Get this from Payment Service
        address
    }
    const { data } = await instance.post('/orders', payload);
    return data
});

exports.remove = asyncRun(async (args) => {
    const { data } = await instance.delete(`/orders/${args.id}`)
    return data;
});