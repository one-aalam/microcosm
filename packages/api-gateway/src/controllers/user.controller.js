const axios = require('axios');
const nconf = require('nconf');
const asyncRun = require('../middlewares/async-run');

const instance = axios.create({
    baseURL: nconf.get('API_USER_SERVICE')
})

exports.signup = asyncRun(async (user) => {
    const { name, email, password } = user;
    return await instance.post('/auth/signup', { name, email, password });
});

exports.signin = asyncRun(async (user) => {
    const { email, password } = user;
    return await instance.post('/auth/signin', { name, email, password });
});

exports.one = asyncRun(async (query) => {
    console.log('...querry');
    await instance.get('/users/:id', query)
});
exports.all = asyncRun(async (query) => {
    const { data } = await instance.get('http://localhost:3000/users', query);
    return data;
});