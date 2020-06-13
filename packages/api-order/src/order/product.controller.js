
const productService = require('./product.service');
const asyncRun = require('../middlewares/async-run');

exports.all = asyncRun(async (req, res) => {
    const params = {};
    res.json(await productService.all(params));
});

exports.one = asyncRun(async (req, res) => {
    res.json(await productService.one(req.params));
});

exports.create = asyncRun(async (req, res, next) => {
    const ret = await productService.create(req.body);
    res.json(ret);
});

exports.update = asyncRun(async (req, res, next) => {
    const ret = await productService.update(req.params.id, req.body);
    res.json(ret);
});

exports.remove = asyncRun(async (req, res, next) => {
    const ret = await productService.remove(req.params.id);
    res.json(ret);
});
