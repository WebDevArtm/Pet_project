import express from "express";
import typeDefs from "./graphql/schema";
import User from "./entity/User/resolvers";
import Movie from "./entity/Movie/resolvers";
import { ApolloServer } from "apollo-server-express";
import { graphqlUploadExpress } from "graphql-upload";
import path from "path";
import { db } from "./db";
import type { Application } from 'express'
import "reflect-metadata";

const resolvers = {
  Query: Object.assign(User.Query, Movie.Query),
  Mutation: Object.assign(User.Mutation, Movie.Mutation),
};

db.initialize().then( async () => {
  const server = new ApolloServer({ typeDefs, resolvers });
  await server.start();

  const app: Application = express();
  app.use("/", express.static(path.join(__dirname, "uploadedFiles/")));
  app.use(graphqlUploadExpress());
  server.applyMiddleware({ app });
  const PORT = process.env.PORT;

  await app.listen(PORT, async () => {
    console.log(`App has been started on port: ${PORT}...`);
  });
})
