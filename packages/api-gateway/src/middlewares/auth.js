const { decode } = require('../utils/token');

module.exports = (config) => async (req, _) => {
    const canSkipAuth = config.skip && config.skip.length ?
                    config.skip.filter(skip => req.body && req.body.query && req.body.query.indexOf(skip) !== -1).length
                    : 0;
    if (!canSkipAuth) {
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
          try {
            payload = decode(token)
          } catch(err) {
            throw new Error('TOKEN_INVALID');
          }
        return {
          user: payload,
          canSkip
        };
      }
    }
    return {
      user: undefined,
      canSkipAuth
    }
};
