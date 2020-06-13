const nconf = require('nconf');
const { ApolloServer, AuthenticationError } = require('apollo-server-express');
const app = require('./src/server.js');

const schema = require('./src/gql/schema');
const resolvers = require('./src/gql/resolvers');

nconf.argv()
   .env('__')
   .defaults({ conf: `${__dirname}/config.yml`})
   .file({ file: nconf.get('conf'), format: require('nconf-yaml')});

const server = new ApolloServer({
    typeDefs: schema,
    resolvers,
    context: async ({ req, res }) => {
        // try {
        //     await auth(req);
        // } catch (err) {
        //     // @TODO: Remove `stacktrace` from response
        //     throw new AuthenticationError(err.message)
        // }
        return {
            // _auth: req._auth
        }
    }
})

server.applyMiddleware({ app });

app.listen(nconf.get('port') || 3002, () => {
    console.log(`🚀 API Gateway REST Server ready at http://localhost:${nconf.get('port') || 3002}`);
    console.log(`🚀 API Gateway GraphQL Server ready at http://localhost:${nconf.get('port')}${server.graphqlPath}`);
});