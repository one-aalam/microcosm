const axios = require('axios');
const nconf = require('nconf');
const asyncRun = require('../middlewares/async-run');

const instance = axios.create({
    baseURL: nconf.get('API_USER_SERVICE') || 'http://localhost:3000'
})

exports.signup = asyncRun(async (args) => {
    const { name, email, password } = args;
    const { data } = await instance.post('/auth/signup', { name, email, password });
    return data
});

exports.signin = asyncRun(async (args) => {
    const { email, password } = args;
    const { data } = await instance.post('/auth/signin', { email, password });
    return data
});

exports.one = asyncRun(async (args) => {
    const { data } = await instance.get(`/users/${args.id}`)
    return data;
});
exports.all = asyncRun(async (args) => {
    const { data } = await instance.get('/users', args);
    return data;
});

exports.create = asyncRun(async (args) => {
    const { data } = await instance.post('/users', args);
    return data
});

exports.remove = asyncRun(async (args) => {
    const { data } = await instance.delete(`/users/${args.id}`)
    return data;
});