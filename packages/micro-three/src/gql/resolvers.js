const userService = require('../user/user.service')

module.exports = {
    Query: {
        getUsers: async (parent, args, context, info) => await userService.all(args),
        getUser: async (parent, args, context, info) => await userService.one(args),
    },

    User: {
        name: (user) => `${user.name.first} ${user.name.last}`,
        token: () => '__RETRACTED__'
    }
}