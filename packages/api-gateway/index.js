const nconf = require('nconf');
const { ApolloServer, AuthenticationError } = require('apollo-server-express');
const app = require('./src/server.js');
const auth = require('./src/middlewares/auth')({
    skip: [
        'signIn',
        'signUp'
    ]
});

const schema = require('./src/gql/schema');
const resolvers = require('./src/gql/resolvers');
const controllers = require('./src/controllers');

nconf.argv()
   .env('__')
   .defaults({ conf: `${__dirname}/config.yml`})
   .file({ file: nconf.get('conf'), format: require('nconf-yaml')});

const server = new ApolloServer({
    typeDefs: schema,
    resolvers,
    context: async ({ req, res }) => {
        let _auth;
        try {
            _auth = await auth(req)
        } catch (err) {
            // @TODO: Remove `stacktrace` from response
            throw new AuthenticationError(err)
        }
        const { me, canSkip } = _auth;
        return {
            me: me && await controllers.userController.one({ id: me.id }), // Pulls additional details but makes an additional call
            controllers,
            canSkip
        }
    },
    // formatError: error => {
    //     // remove the internal error messages from Mongoose // leave only the important validation error
    //     const message = error.message
    //     .replace('...mongoose error identifier goes here...: ', '') .replace('Validation error: ', '');
    //     return {
    //         ...error,
    //         message,
    //     };
    // },
})

server.applyMiddleware({ app });

app.listen(nconf.get('port') || 3002, () => {
    console.log(`🚀 API Gateway REST Server ready at http://localhost:${nconf.get('port') || 3002}`);
    console.log(`🚀 API Gateway GraphQL Server ready at http://localhost:${nconf.get('port')}${server.graphqlPath}`);
});