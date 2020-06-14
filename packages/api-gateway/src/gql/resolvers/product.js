const productController = require('../../controllers/product.controller');

module.exports = {
    Query: {
        getProducts: async (parent, args, context, info) => await productController.all(args),
        getProduct: async (parent, args, context, info) => await productController.one(args),
    },
    Mutation: {
        /* Product */
        createProduct: async (parent, args, context, info) => await productController.create(args.data),
        removeProduct: async (parent, args, context, info) => await productController.remove(args),
    },
    Product: {
        id: product => product._id
    }
}