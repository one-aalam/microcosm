const axios = require('axios');
const nconf = require('nconf');
const asyncRun = require('../middlewares/async-run');

const instance = axios.create({
    baseURL: nconf.get('API_PRODUCT_SERVICE') || 'http://localhost:3001'
})

exports.one = asyncRun(async (args) => {
    const { data } = await instance.get(`/products/${args.id}`)
    return data;
});
exports.all = asyncRun(async (args) => {
    const { data } = await instance.get('/products', { params: args });
    return data;
});

exports.create = asyncRun(async (args) => {
    const { data } = await instance.post('/products', args);
    return data
});

exports.remove = asyncRun(async (args) => {
    const { data } = await instance.delete(`/products/${args.id}`)
    return data;
});