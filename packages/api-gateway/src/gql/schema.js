const { gql } = require('apollo-server-express');

module.exports = gql`

  type Query {
    getUsers: [User!]
    getUser(id: ID!): User
    getMe: User

    getProducts: [Product]
    getProduct(id: ID!): Product

    getOrders: [Order]
    getOrder(id: ID!): Order
  }

  type Mutation {
    signUp(data: UserRegistrationInput!): User
    signIn(data: UserLoginInput): AuthToken

    createUser(
        name: UserNameInput!,
        email: String!,
        password: String!,
        roles: [ UserRole ]
    ): User!
    removeUser(id: ID!): Boolean!

    createProduct(data: ProductCreateInput!): Product
    removeProduct(id: ID!): Boolean!

    createOrder(data: OrderCreateInput!): Order
    removeOrder(id: ID!): Boolean!
  }

  type AuthToken {
      token: String!
  }

  type UserName {
    first: String!
    last: String
  }

  input UserNameInput {
    first: String!
    last: String
  }

  input UserRegistrationInput {
    name: UserNameInput!,
    email: String!,
    password: String!
  }

  input UserLoginInput {
    email: String!,
    password: String!
  }

  enum UserRole {
    ROLE_USER
    ROLE_ADMIN
  }

  type User {
    id: ID!
    # name: UserName!
    name: UserName
    email: String!
    activated: Boolean
    roles: [ UserRole ]!
    token: String
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

  type Order {
    id: ID!
    user: OrderUser
    totalOrderValue: Float!
    status: String!
    address: Address
    paymentMethod: String
    prodcuts: [ Product ]
  }

  type OrderUser {
    id: ID!
    email: String!
  }

  type Address {
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