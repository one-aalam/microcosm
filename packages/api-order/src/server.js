const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const morgan = require('morgan');
const cors = require('cors');

const catchErr = require('./middlewares/catch-err');


const app = express();

const orderRouter = require('./order');

const ORDERS_API_ENDPOINT = '/orders';

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

app.use(ORDERS_API_ENDPOINT, orderRouter);
app.use(catchErr);

app.get('/', async (req, res) => {
  res.end('Welcome to Order API')
});

app.get('/test', async (req, res) => {
  res.json({ message: 'pass!'})
})

app.get('/hello/:name', (req, res) => {
  res.status(200).json({'hello': req.params.name});
});

module.exports = app;