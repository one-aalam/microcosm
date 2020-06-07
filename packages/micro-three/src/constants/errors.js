
const AUTH_USER_NONEXISTENT  = 'AUTH_USER_NONEXISTENT';
const AUTH_USER_WRONGPASS = 'AUTH_USER_WRONGPASS';

exports.response = {
    [AUTH_USER_NONEXISTENT]: {
        code: 401,
        message: ''
    },
    [AUTH_USER_WRONGPASS]: {
        code: 401,
        message: ''
    }
}

Object.keys(exports.response).forEach(key => exports[key] = key);