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
    user: OrderUser
    totalOrderValue: Float!
    status: String!
    address: OrderAddress
    paymentMethod: String
    prodcuts: [ OrderProduct ]
  }

  type OrderProduct {
    id: ID!
    name: String!
    category: [ String ]
    price: Float!
    qty: Int!
  }

  type OrderUser {
    id: ID!
    email: String!
  }

  type OrderAddress {
    addressType: String!
    country: String!
    city: String!
    pincode: Int!
  }

  input OrderCreateInput {
    customer: OrderUserInput!
    totalOrderValue: Float!
    address: OrderAddressInput
    prodcuts: [ OrderProductInput ]
  }

  input OrderProductInput {
    _id: String
    qty: Int!
  }

  input OrderUserInput {
    _id: ID!
  }

  input OrderAddressInput {
    addressType: String!
    country: String!
    city: String!
    pincode: Int!
  }

`;