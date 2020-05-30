const express = require('express');
const bodyParser = require('body-parser');
const app = express();

app.use(bodyParser.json());

app.get('/', async (req, res) => {
    res.end('Welcome to Micro #3')
});

app.post('/', (req, res) => {
  const { value = 0 } = req.body;
  return res.json({
    value: Number(value) + 1
  });
});


app.listen(process.env.PORT || 3002, () => {
  console.log('Server listening on PORT', process.env.PORT || 3002);
});

module.exports = app;
