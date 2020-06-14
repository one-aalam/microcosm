const error = require('../constants/errors');


module.exports = (err, _, res, next) => {
    console.log(err, _);
    const errToSend = error.response[err.message];
    if(errToSend) {
        res.status(errToSend.code).json({
            code: err.message,
            message: errToSend.message
        });
    }
    if(err.message && err.message.indexOf('CastError') !== 1) {
        res.status(404).json({
            code: 'MONGO_REF_UNAVAILABE',
            message: 'Looks like thts not avialble anymore!'
        });
    }
    next(err);
}
