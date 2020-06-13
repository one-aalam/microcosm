
const AUTH_USER_NONEXISTENT  = 'AUTH_USER_NONEXISTENT';
const AUTH_USER_WRONGPASS = 'AUTH_USER_WRONGPASS';

const TOKEN_MISSING = 'TOKEN_MISSING';
const TOKEN_INVALID = 'TOKEN_INVALID';

exports.response = {
    [AUTH_USER_NONEXISTENT]: {
        code: 401,
        message: ''
    },
    [AUTH_USER_WRONGPASS]: {
        code: 401,
        message: ''
    },
    [TOKEN_MISSING]: {
        code: 403,
        message: 'Token not provided'
    },
    [TOKEN_INVALID]: {
        code: 403,
        message: 'Token invalid!'
    }
}

Object.keys(exports.response).forEach(key => exports[key] = key);