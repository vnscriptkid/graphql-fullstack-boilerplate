import "reflect-metadata";

import { GraphQLServer } from "graphql-yoga";
import { importSchema } from "graphql-import";

import { resolvers } from "./resolvers";
import { createConnection } from "typeorm";
import * as path from "path";
const typeDefs = importSchema(path.join(__dirname, "schema.graphql"));

const server = new GraphQLServer({ typeDefs, resolvers });

createConnection().then(async () => {
  server.start(() => console.log("Server is running on localhost:4000"));
});
//     console.log("Inserting a new user into the database...");
//     const user = new User();
//     user.firstName = "Timber";
//     user.lastName = "Saw";
//     user.age = 25;
//     await connection.manager.save(user);
//     console.log("Saved a new user with id: " + user.id);

//     console.log("Loading users from the database...");
//     const users = await connection.manager.find(User);
//     console.log("Loaded users: ", users);

//     console.log("Here you can setup and run express/koa/any other framework.");
//   })
//   .catch((error) => console.log(error));
