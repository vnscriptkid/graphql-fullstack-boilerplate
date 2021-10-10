import { GraphQLServer } from "graphql-yoga";
import { importSchema } from "graphql-import";
import { makeExecutableSchema, mergeSchemas } from "@graphql-tools/schema";
import * as path from "path";
import * as fs from "fs";
import { GraphQLSchema } from "graphql";

import { createTypeormConn } from "./utils/createTypeormConn";

export const startServer = async () => {
  const schemas: GraphQLSchema[] = [];

  const folders = fs.readdirSync(path.join(__dirname, "./modules"));

  folders.forEach((folder) => {
    const { resolvers } = require(`./modules/${folder}/resolvers`);
    const typeDefs = importSchema(
      path.join(__dirname, `./modules/${folder}/schema.graphql`)
    );
    schemas.push(makeExecutableSchema({ resolvers, typeDefs }));
  });

  const server = new GraphQLServer({
    schema: mergeSchemas({ schemas }) as any,
  });

  await createTypeormConn();

  const app = await server.start({
    port: process.env.NODE_ENV === "test" ? 0 : 4000, // port is random in test env
  });

  console.log(`Server is running on localhost:${app.address().port}`);

  return app;
};
