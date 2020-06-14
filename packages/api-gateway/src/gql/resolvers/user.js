const userController = require('../../controllers/user.controller');

module.exports = {
    Query: {
        getUsers: async (parent, args, { me, controllers: { userController }}, info) => await userController.all(args),
        getUser: async (parent, args, { me, controllers: { userController }}, info) => await userController.one(args),
        getMe: async (parent, args, { me, controllers: { userController } }, info) => {
            return {
                _id: me.id,
                email: me.email
            };
        }
    },
    Mutation: {
        /* Auth */
        signUp: async (parent, { data: { name, email, password }}, { me, controllers: { userController }}, info) => await userController.signup({ name, email, password }),
        signIn: async (parent, { data: { email, password }}, { me, controllers: { userController }}, info) => await userController.signin({ email, password }),

        /* User */
        createUser: async (parent, args, { me, controllers: { userController }}, info) => await userController.create(args),
        removeUser: async (parent, args, { me, controllers: { userController }}, info) => await userController.remove(args),
    },
    User: {
        id: user => user._id,
        name: (user) => `${user.name.first} ${user.name.last}`,
        token: () => '__RETRACTED__'
    }
}