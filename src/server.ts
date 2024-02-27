import { Sequelize } from "sequelize-typescript";
import { app } from "./app";
import dotenv from "dotenv";
import { ApolloServer, gql } from "apollo-server-express";
import "reflect-metadata";
import { buildSchema } from "type-graphql";
import { UserResolver } from "./resolver/user.resolver";
import { ApolloServerPluginLandingPageGraphQLPlayground } from "apollo-server-core";
import { User } from "./models/User";
import { Post } from "./models/posts";
import { PostsReslver } from "./resolver/post.resolver";
import { postDataLoader } from "./dataloader/posts.dataloader";
import { React } from "./models/React";
const port = 8080;
const env = process.env.NODE_ENV || "development";
const config = require(__dirname + "/config/config.json")[env];
export const sequelize = new Sequelize(
  config.database,
  config.username,
  config.password,
  {
    ...config,
    models: [User, Post, React],
  }
);
export const graphqlServer = async () => {
  const schema = await buildSchema({
    resolvers: [UserResolver, PostsReslver],
    emitSchemaFile: true,
  });
  sequelize.sync({ force: false, alter: true }).then((req) => {
    app.listen(port);
    console.log("Express server has started on port ", port);
    console.log("database connected successfully");
  });

  const server = new ApolloServer({
    schema,
    plugins: [ApolloServerPluginLandingPageGraphQLPlayground],
    // context: () => ({
    //   dataloader: userDataLoader(),
    // }),
  });
  await server.start();
  server.applyMiddleware({ app });
};
graphqlServer();
