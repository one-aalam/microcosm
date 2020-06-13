const userController = require('../controllers/user.controller');
const productController = require('../controllers/product.controller');
const orderController = require('../controllers/order.controller');

module.exports = {
    Query: {
        getUsers: async (parent, args, context, info) => await userController.all(args),
        getUser: async (parent, args, context, info) => await userController.one(args),

        getProducts: async (parent, args, context, info) => await productController.all(args),
        getProduct: async (parent, args, context, info) => await productController.one(args),

        getOrders: async (parent, args, context, info) => await orderController.all(args),
        getOrder: async (parent, args, context, info) => await orderController.one(args),

        getMe: async (parent, args, { _auth }, info) => {
            return {
                id: _auth.id,
                email: _auth.email
            };
        }
    },
    Mutation: {
        /* Auth */
        signUp: async (parent, { data: { name, email, password }}, context, info) => await userController.signup({ name, email, password }),
        signIn: async (parent, { data: { email, password }}, context, info) => await userController.signin({ email, password }),

        /* User */
        createUser: async (parent, args, context, info) => await userController.create(args),
        removeUser: async (parent, args, context, info) => await userController.remove(args),

        /* Product */
        createProduct: async (parent, args, context, info) => await productController.create(args.data),
        removeProduct: async (parent, args, context, info) => await productController.remove(args),

        /* Order */
        createOrder: async (parent, args, context, info) => await orderController.create(args.data),
        removeOrder: async (parent, args, context, info) => await orderController.remove(args),

    },
    User: {
        id: user => user._id,
        name: (user) => `${user.name.first} ${user.name.last}`,
        token: () => '__RETRACTED__'
    },
    Product: {
        id: product => product._id
    },
    Order: {
        id: order => order._id
    }
}