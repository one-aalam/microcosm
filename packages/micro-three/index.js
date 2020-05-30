
const app = require('./src/server.js');

app.listen(process.env.PORT || 3002, () => {
    console.log('Server listening on PORT', process.env.PORT || 3002);
});