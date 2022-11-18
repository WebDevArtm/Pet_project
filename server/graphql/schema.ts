import { gql } from "apollo-server";

const typeDefs = gql`
  scalar Upload
  scalar Date

  type File {
    filename: String!
    mimetype: String!
    encoding: String!
  }

  type User {
    uuid: ID
    name: String
    email: String
    role: String
    subscription: String
    cover: String
    createAt: Date
    updateAt: Date
    deleteAt: Date
  }

  input UserInput {
    name: String!
    email: String
    password: String!
    role: String
  }

  type Movie {
    uuid: ID
    name: String
    year: String
    genre: String
    description: String
    cover: String
    IMDb_id: String
    IMDb_rait: String
    IMDb_rait_update: String
    likes: [String]
    dislikes: [String]
    createAt: Date
    updateAt: Date
  }

  input MovieInput {
    uuid: ID
    name: String
    year: String
    genre: String
    description: String
    cover: String
    IMDb_id: String
    IMDb_rait: String
    IMDb_rait_update: String
    likes: [String]
    dislikes: [String]
  }

  type Query {
    getAllUsers: [User]
    getAllMovies: [Movie]
    getOneUser(input: UserInput): User!
    getOneMovie(movie: MovieInput): Movie!
  }

  type Mutation {
    upload(file: Upload!, type: String, uuid: ID): File!
    createUser(input: UserInput): User
    createAndUpdateMovie(movie: MovieInput): Movie
    deleteMovie(movie: MovieInput): Movie
  }
`;
export default typeDefs;
