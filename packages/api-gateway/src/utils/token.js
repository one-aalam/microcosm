const nconf = require('nconf');
const { sign, verify } = require('jsonwebtoken');

const SECRET = nconf.get('secret') || 'barelysecure';


exports.decode = token => verify(token, SECRET);
exports.encode = payload => sign(payload, SECRET, { expiresIn: '7day' });