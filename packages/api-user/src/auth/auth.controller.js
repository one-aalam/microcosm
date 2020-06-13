const { compareSync } = require('bcrypt');
const asyncRun = require('../middlewares/async-run');
const token = require('../utils/token');
const userService = require('../user/user.service');

const auth = ({ email, password }) => attempt(email, password).then(({ id }) => ({ token:  token.encode({ id, email }) }));

const attempt = async (email, password) => {
  const user = await userService.one({ email });
  if (!user) {
    throw new Error('AUTH_USER_NONEXISTENT');
  }
  if (!compareSync(password, user.password)) {
    throw new Error('AUTH_USER_WRONGPASS');
  }
  return user;
};

exports.signup = asyncRun(async (req, res, next) => {
  const { name, email, password } = req.body;
  const ret = await userService.create({ name, email, password });
  res.json(ret);
});

exports.signin = asyncRun(async (req, res) => {
  const { email, password } = req.body;
  const ret = await auth({ email, password });
  res.json(ret);
});

exports.me = asyncRun(async (req, res) => {
  const { id, email } = req._auth;
  res.json({ user: {
    id,
    email
  }});
});

exports.auth = auth;
