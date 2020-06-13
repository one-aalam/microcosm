const userController = require('../controllers/user.controller')

module.exports = {
    Query: {
        getUsers: async (parent, args, context, info) => await userController.all(args),
        getUser: async (parent, args, context, info) => await userController.one(args),

        getMe: async (parent, args, { _auth }, info) => {
            return {
                id: _auth.id,
                email: _auth.email
            };
        }
    },
    Mutation: {
        createUser: async (parent, args, context, info) => await userController.create(args),
        deleteUser: async (parent, args, context, info) => await userController.remove(args),

        signUp: async (parent, { data: { name, email, password }}, context, info) => await userController.signup({ name, email, password }),
        signIn: async (parent, { data: { email, password }}, context, info) => await userController.signin({ email, password }),
    },
    User: {
        id: user => user._id,
        name: (user) => `${user.name.first} ${user.name.last}`,
        token: () => '__RETRACTED__'
    }
}