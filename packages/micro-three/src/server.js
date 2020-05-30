const express = require('express');
const bodyParser = require('body-parser');
const app = express();

const productRouter = require('./product.router');

app.use(bodyParser.json());

const PRODUCTS_API_ENDPOINT = '/products';

app.use(PRODUCTS_API_ENDPOINT, productRouter);

app.get('/', async (req, res) => {
  res.end('Welcome to Micro #3')
});

app.get('/test', async (req, res) => {
  res.json({ message: 'pass!'})
})

module.exports = app;
