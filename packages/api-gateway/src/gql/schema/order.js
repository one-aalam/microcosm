const { gql } = require('apollo-server-express');

module.exports = gql`

  extend type Query {
    getOrders: [Order]
    getOrder(id: ID!): Order
  }

  extend type Mutation {
    createOrder(data: OrderCreateInput!): Order
    removeOrder(id: ID!): Boolean!
  }

  type Order {
    id: ID!
    customer: OrderUser
    totalOrderValue: Float!
    status: String!
    addresses: [OrderAddress]
    paymentMethod: String
    products: [ OrderProduct ]
  }

  type OrderProduct {
    id: String
    name: String!
    category: [ String ]
    price: Float!
    qty: Int!
  }

  type OrderUser {
    id: String
    email: String!
  }

  type OrderAddress {
    addressType: String!
    country: String!
    city: String!
    pincode: Int!
  }

  input OrderCreateInput {
    # customer: OrderUserInput! - Retrieved from user token
    totalOrderValue: Float!
    address: OrderAddressInput
    prodcuts: [ OrderProductInput ]
  }

  input OrderProductInput {
    id: ID!
    qty: Int!
  }

  input OrderUserInput {
    id: ID!
  }

  input OrderAddressInput {
    addressType: String!
    country: String!
    city: String!
    pincode: Int!
  }

`;