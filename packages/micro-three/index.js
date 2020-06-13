const nconf = require('nconf');
const { ApolloServer } = require('apollo-server-express');
const app = require('./src/server.js');

const schema = require('./src/gql/schema');
const resolvers = require('./src/gql/resolvers');

nconf.argv()
   .env('__')
   .defaults({ conf: `${__dirname}/config.yml`})
   .file({ file: nconf.get('conf'), format: require('nconf-yaml')});

const server = new ApolloServer({
    typeDefs: schema,
    resolvers
})

server.applyMiddleware({ app });

app.listen(nconf.get('port') || 3002, () => {
    console.log(`🚀 REST Server ready at http://localhost:${nconf.get('port') || 3002}`);
    console.log(`🚀 GraphQL Server ready at http://localhost:${nconf.get('port')}${server.graphqlPath}`);
});