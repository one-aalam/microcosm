const nconf = require('nconf');
const app = require('./src/server.js');

nconf.argv()
   .env('__')
   .defaults({ conf: `${__dirname}/config.yml`})
   .file({ file: nconf.get('conf'), format: require('nconf-yaml')});

app.listen(nconf.get('port') || 3000, () => {
    console.log(`🚀 User API ready at http://localhost:${nconf.get('port') || 3000}`);
});