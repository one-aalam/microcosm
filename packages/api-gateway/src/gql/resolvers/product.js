
module.exports = {
    Query: {
        getProducts: async (parent, args, { me, controllers: { productController }}, info) => await productController.all(args),
        getProduct: async (parent, args, { me, controllers: { productController }}, info) => await productController.one(args),
    },
    Mutation: {
        /* Product */
        createProduct: async (parent, args, { me, controllers: { productController }}, info) => await productController.create(args.data),
        removeProduct: async (parent, args, { me, controllers: { productController }}, info) => await productController.remove(args),
    },
    Product: {
        id: product => product._id
    }
}