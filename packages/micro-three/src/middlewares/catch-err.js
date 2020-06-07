const error = require('../constants/errors');

module.exports = (err, _, res, next) => {
    const errToSend = error.response[err.message];
    if(errToSend) {
        res.status(errToSend.code).json({
            code: err.message,
            message: errToSend.message
        });
    }
    next(err);
}