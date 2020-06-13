const { gql } = require('apollo-server-express');

module.exports = gql`

  type Query {
    getUsers: [User!]
    getUser(id: ID!): User
    getMe: User
  }

  type Mutation {
    createUser(
        name: UserNameInput!,
        email: String!,
        password: String!,
        roles: [ UserRole ]
    ): User!
    deleteUser(id: ID!): Boolean!

    signUp(data: UserRegistrationInput!): User
    signIn(data: UserLoginInput): AuthToken
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
`;