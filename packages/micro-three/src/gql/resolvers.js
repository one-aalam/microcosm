const userService = require('../user/user.service')

module.exports = {
    Query: {
        getUsers: async (parent, args, context, info) => await userService.all(args),
        getUser: async (parent, args, context, info) => await userService.one(args),
    },

    User: {
        token: () => '__RETRACTED__'
    }
}