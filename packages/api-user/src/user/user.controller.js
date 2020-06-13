const userService = require('./user.service');
const asyncRun = require('../middlewares/async-run');

exports.all = asyncRun(async (req, res) => {
    const populateAddresses = req.query.address || false;
    const params = {};
    res.json(await userService.all(params, populateAddresses));
});

exports.one = asyncRun(async (req, res) => {
    const populateAddresses = req.query.address || false;
    res.json(await userService.one(req.params, populateAddresses));
});

exports.create = asyncRun(async (req, res, next) => {
    const ret = await userService.create(req.body);
    res.json(ret);
});

exports.update = asyncRun(async (req, res, next) => {
    const ret = await userService.update(req.params.id, req.body);
    res.json(ret);
});

exports.remove = asyncRun(async (req, res, next) => {
    const ret = await userService.remove(req.params.id);
    res.json(ret);
});

exports.createAddress = asyncRun(async (req, res, next) => {
    const ret = await userService.createAddress(req.params.id, req.body);
    res.json(ret);
});

exports.updateAddress = asyncRun(async (req, res, next) => {
    const ret = await userService.updateAddress(req.params.id, req.params.subId, req.body);
    res.json(ret);
});

exports.removeAddress = asyncRun(async (req, res, next) => {
    const ret = await userService.removeAddress(req.params.id, req.params.subId);
    res.json(ret);
});

exports.setupRootUser = asyncRun(async (req, res, next) => {
    const user = await userService.one({ username: 'admin' });
    if (user) {
        res.send('Admin user already available');
    } else {
        return userService.create({
            username: 'admin',
            password: 'password'
        }).then(() => {
            res.send('Admin user generated successfully!')
        }, (err) => {
            if(err) {
                next(err);
            }
        })
    }
});