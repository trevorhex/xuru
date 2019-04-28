exports.typeDefs = `
  type Query {
    getAllStories: [Story]
    getStory(_id: ID!): Story
    getCurrentUser: User
  }

  type Mutation {
    addStory(title: String!, comments: [CommentInput!]): Story
    createUser(username: String!, password: String!): AuthResponse
    logInUser(username: String!, password: String!): AuthResponse
  }

  type AuthResponse {
    token: String!
    user: User
  }

  type Token {
    token: String!
  }

  type User {
    _id: ID
    username: String! @unique
    password: String!
  }

  type Comment {
    _id: ID
    speaker: String!
    comment: String!
  }

  input CommentInput {
    speaker: String!
    comment: String!
  }

  type Story {
    _id: ID
    title: String!
    comments: [Comment]
    createdOn: String
  }
`;
