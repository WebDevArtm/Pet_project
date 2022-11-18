import { gql } from "@apollo/client";

export const GET_USER = gql`
  query Query($input: UserInput) {
    getOneUser(input: $input) {
      name
      role
    }
  }
`;
export const GET_ALL_USERS = gql`
  query {
    getAllUsers {
      uuid
      name
      email
      role
      subscription
      cover
      createAt
      updateAt
      deleteAt
    }
  }
`;
export const CREATE_USER = gql`
  mutation Mutation($input: UserInput) {
    createUser(input: $input) {
      name
    }
  }
`;

export const GET_MOVIE = gql`
  query Query($movie: MovieInput) {
    getOneMovie(movie: $movie) {
      uuid
      name
      year
      genre
      description
      cover
      IMDb_id
      IMDb_rait
      IMDb_rait_update
    }
  }
`;
export const GET_ALL_MOVIES = gql`
  query Query {
    getAllMovies {
      uuid
      name
      year
      genre
      description
      cover
      likes
      dislikes
      createAt
      updateAt
    }
  }
`;

export const CREATE_MOVIE = gql`
  mutation Mutation($movie: MovieInput) {
    createAndUpdateMovie(movie: $movie) {
      uuid
    }
  }
`;

export const UPLOAD_IMG = gql`
  mutation Mutation($file: Upload!, $type: String, $uuid: ID) {
    upload(file: $file, type: $type, uuid: $uuid) {
      filename
    }
  }
`;
export const REMOVE_MOVIE = gql`
  mutation Mutation($movie: MovieInput) {
    deleteMovie(movie: $movie) {
      uuid
    }
  }
`;
export const UPDATE_MOVIE = gql`
  mutation Mutation($movie: MovieInput) {
    updateMovie(movie: $movie) {
      id
    }
  }
`;
