import { createTypeormConn } from "./utils/createTypeormConn";
import { GraphQLServer } from "graphql-yoga";
import { importSchema } from "graphql-import";
import * as path from "path";

import { resolvers } from "./resolvers";

export const startServer = async () => {
  const typeDefs = importSchema(path.join(__dirname, "schema.graphql"));

  const server = new GraphQLServer({ typeDefs, resolvers });

  await createTypeormConn();

  const app = await server.start({
    port: process.env.NODE_ENV === "test" ? 0 : 4000, // port is random in test env
  });

  console.log(`Server is running on localhost:${app.address().port}`);

  return app;
};
