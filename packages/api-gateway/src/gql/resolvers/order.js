const orderController = require('../../controllers/order.controller');

module.exports = {
    Query: {
        getOrders: async (parent, args, context, info) => await orderController.all(args),
        getOrder: async (parent, args, context, info) => await orderController.one(args),
    },
    Mutation: {
        /* Order */
        createOrder: async (parent, args, { me }, info) => await orderController.create(args.data, { me }),
        removeOrder: async (parent, args, context, info) => await orderController.remove(args),
    },
    Order: {
        id: order => order._id
    }
}