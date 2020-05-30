const express = require('express');
const bodyParser = require('body-parser');
const app = express();

app.use(bodyParser.json());

const PRODUCTS_API_ENDPOINT = '/products';

app.get('/', async (req, res) => {
  res.end('Welcome to Micro #3')
});

app.get('/test', async (req, res) => {
  res.json({ message: 'pass!'})
})

app.get(PRODUCTS_API_ENDPOINT, (req, res) => {
  res.json([]);
});

module.exports = app;
