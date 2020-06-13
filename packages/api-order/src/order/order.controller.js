const orderService = require('./order.service');
const asyncRun = require('../middlewares/async-run');

exports.all = asyncRun(async (req, res) => {
    const params = {};
    res.json(await orderService.all(params));
});

exports.one = asyncRun(async (req, res) => {
    res.json(await orderService.one(req.params));
});

exports.create = asyncRun(async (req, res, next) => {
    const ret = await orderService.create(req.body);
    res.json(ret);
});

exports.update = asyncRun(async (req, res, next) => {
    const ret = await orderService.update(req.params.id, req.body);
    res.json(ret);
});

exports.remove = asyncRun(async (req, res, next) => {
    const ret = await orderService.remove(req.params.id);
    res.json(ret);
});