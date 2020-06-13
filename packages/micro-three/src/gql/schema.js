const { gql } = require('apollo-server-express');

module.exports = gql`

  type Query {
      getUsers: [User!]
      getUser(id: ID!): User
      getMe: User
  }

  type UserName {
    first: String!
    last: String
  }

  enum UserRole {
    ROLE_USER
    ROLE_ADMIN
  }

  type User {
    id: ID!
    name: UserName!
    email: String!
    activated: Boolean
    roles: [ UserRole ]!
    token: String
  }
`;