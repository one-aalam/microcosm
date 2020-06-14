
module.exports = {
    Query: {
        getOrders: async (parent, args, { me, controllers: { orderController }}, info) => await orderController.all(args),
        getOrder: async (parent, args, { me, controllers: { orderController }}, info) => await orderController.one(args),
    },
    Mutation: {
        /* Order */
        createOrder: async (parent, args, { me, controllers: { orderController }}, info) => await orderController.create(args.data, { me }),
        removeOrder: async (parent, args, { me, controllers: { orderController }}, info) => await orderController.remove(args),
    },
    Order: {
        id: order => order._id
    }
}