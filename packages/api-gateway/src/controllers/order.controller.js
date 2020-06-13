const axios = require('axios');
const nconf = require('nconf');
const asyncRun = require('../middlewares/async-run');

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
    const { data } = await instance.post('/orders', args);
    return data
});

exports.remove = asyncRun(async (args) => {
    const { data } = await instance.delete(`/orders/${args.id}`)
    return data;
});