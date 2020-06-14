const axios = require('axios');
const nconf = require('nconf');
const asyncRun = require('../middlewares/async-run');

const productController = require('./product.controller');

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

exports.create = asyncRun(async (args, { me }) => {
    const { totalOrderValue, address, prodcuts } = args;
    const { _id, name, email } = me;
    const productMap = {};
    prodcuts.forEach((product) => {
        productMap[product.id] = product;
    });
    const productIds = Object.keys(productMap);
    const productsApplicable = await productController.all({ query: {
        ids: productIds
    }})
    console.log(me)
    const payload = {
        // Products: Have better control of the structure sent to the Order API
        products: productsApplicable.map(({ id, name, price}) => {
            return {
                id,
                name,
                price,
                qty: productMap[id].qty
            }
        }),
        // Customer: Retrieve it from user token
        customer: {
            id: _id,
            name: `${name.last}, ${name.first}`,
            email
        }, // @TODO: Get this from user token { _id: '5edcf11e55cafd23f9f8cfda', email: 'one@mail.com' }
        // Total Order Value: Although we can save some work by requesting client to send
        // the `prices` and `totalOrderValue` we shouldn't blindly trust it and must validate and
        // re-compute total order's worth by relying on the values maintained by persistent store
        totalOrderValue, // @TODO: Re-compute before passing, and handle in O
        status: "IN_PROGRESS", // @TODO: Get this from config
        paymentMethod: "PAYPAL", // @TODO: Get this from Payment Service
        addresses: [address]
    }

    console.log('--- CREATING ORDERS WITH ---', payload)
    const { data } = await instance.post('/orders', payload);
    return data
});

exports.remove = asyncRun(async (args) => {
    const { data } = await instance.delete(`/orders/${args.id}`)
    return data;
});