const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const morgan = require('morgan');
const nconf = require('nconf');
const cors = require('cors');

const catchErr = require('./middlewares/catch-err');

nconf.argv()
   .env('__')
   .defaults({ conf: `${__dirname}/config.json`})
   .file(nconf.get('conf'));

const app = express();

const userRouter = require('./user');
const authRouter = require('./auth');

const USERS_API_ENDPOINT = '/users';
const AUTH_API_ENDPOINT = '/auth';

const DB_API_ENDPOINT = 'mongodb://localhost:27017/microcosm';

const mongoDB = process.env.MONGODB_URI || DB_API_ENDPOINT;
mongoose.connect(mongoDB, {
  useNewUrlParser: true,
  useUnifiedTopology: true
});

mongoose.Promise = global.Promise;
const db = mongoose.connection;
db.on('error', console.error.bind(console, 'MongoDB connection error:'));

if (process.env.NODE_ENV === 'development') {
  app.use(morgan('dev'));
}

app.use(cors());
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());

app.use(AUTH_API_ENDPOINT, authRouter);
app.use(USERS_API_ENDPOINT, userRouter);
app.use(catchErr);

app.get('/', async (req, res) => {
  res.end('Welcome to Users API')
});

app.get('/test', async (req, res) => {
  res.json({ message: 'pass!'})
})

app.get('/hello/:name', (req, res) => {
  res.status(200).json({'hello': req.params.name});
});

module.exports = app;
