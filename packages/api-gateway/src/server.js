const express = require('express');
const bodyParser = require('body-parser');
const morgan = require('morgan');
const cors = require('cors');

const catchErr = require('./middlewares/catch-err');

const app = express();

if (process.env.NODE_ENV === 'development') {
  app.use(morgan('dev'));
}

app.use(cors());
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());

app.use(catchErr);

app.get('/', async (req, res) => {
  res.end('Welcome to API Gateway')
});

app.get('/test', async (req, res) => {
  res.json({ message: 'pass!'})
})

app.get('/hello/:name', (req, res) => {
  res.status(200).json({'hello': req.params.name});
});

module.exports = app;
