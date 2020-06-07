
const { compareSync } = require('bcrypt');
const { sign, verify } = require('jsonwebtoken');
const User = require('../user/user.model');
const userService = require('../user/user.service');
const asyncRun = require('../middlewares/async-run');

const secret = 'token';

const attempt = (email, password) => {
  return User.find({ email }).exec().then((users, err) => {
    if (!users.length) {
      throw new Error('AUTH_USER_NONEXISTENT');
    }

    const user = users[0];
    if (!compareSync(password, user.password)) {
      throw new Error('AUTH_USER_WRONGPASS');
    }
    return user;
  });
};


const auth = ({ email, password }) =>
  attempt(email, password).then(({ id }) => {
    let token = sign(id, secret);
    return { token: token };
  }
);

const decode = token => verify(token, secret);

exports.decode = (req, res) => decode(req.headers['authorization']);

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
