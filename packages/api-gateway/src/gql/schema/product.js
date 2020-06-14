const { gql } = require('apollo-server-express');

module.exports = gql`

  extend type Query {
    getProducts: [Product]
    getProduct(id: ID!): Product
  }

  extend type Mutation {
    createProduct(data: ProductCreateInput!): Product
    removeProduct(id: ID!): Boolean!
  }

  type Product {
    id: ID!
    name: String!
    category: [ String ]
    price: Float!
  }

  input ProductCreateInput {
    name: String!
    category: [ String ]
    price: Float!
  }
`;