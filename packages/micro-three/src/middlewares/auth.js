const { decode } = require('../utils/token');
const asyncRun = require('./async-run');
module.exports = asyncRun(async (req, _, next) => {
    const header = req.headers.authorization || ''; // @TODO: req.cookies.token
      if (!header) {
        throw new Error('TOKEN_MISSING');
      }
      const [ type, token ] = header.split(' ');
      if (!token) {
        throw new Error('TOKEN_INVALID');
      }
      if (type === 'Bearer') {
          let payload;
          console.log('token', token);
          try {
            payload = decode(token)
          } catch(err) {
            throw new Error('TOKEN_INVALID');
          }
        req._auth = payload;
      }
    next();
});