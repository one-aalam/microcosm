
const nconf = require('nconf');
const userService = require('./user.service');

exports.all = async (req, res) => {
    res.json(await userService.all());
};

exports.create = async (req, res, next) => {
    try {
        const ret = await userService.create(req.body);
        res.json(ret);
    } catch (e) {
        if(err) {
            next(err);
        }
    }
};

exports.setupRootUser = async (req, res, next) => {
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
};