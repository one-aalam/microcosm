const userService = require('../user/user.service')
const { auth } = require('../auth/auth.controller');

module.exports = {
    Query: {
        getUsers: async (parent, args, context, info) => await userService.all(args),
        getUser: async (parent, args, context, info) => await userService.one(args),

        getMe: async (parent, args, { _auth }, info) => {
            return {
                id: _auth.id,
                email: _auth.email
            };
        }
    },
    Mutation: {
        createUser: async (parent, args, context, info) => await userService.create(args),
        deleteUser: async (parent, args, context, info) => await userService.remove(args),

        signUp: async (parent, { data: { name, email, password }}, context, info) => await userService.create({ name, email, password }),
        signIn: async (parent, { data: { email, password }}, context, info) => await auth({ email, password }),
    },
    User: {
        name: (user) => `${user.name.first} ${user.name.last}`,
        token: () => '__RETRACTED__'
    }
}