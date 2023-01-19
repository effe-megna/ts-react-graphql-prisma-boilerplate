import { ApolloServer } from 'apollo-server-express';
import express from 'express'
import { readFileSync } from 'fs';
import { PrismaClient } from '@prisma/client'
import { Resolvers } from './generated/resolvers-types';

const app = express()
const prisma = new PrismaClient()

export interface Context {
  prisma: PrismaClient
}

const typeDefs = readFileSync(__dirname + "/schema.graphql", "utf8");

const resolvers: Resolvers<Context> = {
  Query: {
    me: async () => {
      return {
        name: 'Effe Emme'
      }
    },
  }
}

const server = new ApolloServer({
  typeDefs,
  resolvers,
  context: async ({ req }) => {
    if (req.body.query.startsWith("query IntrospectionQuery")) {
      return {};
    }

    return {
      prisma: prisma
    } as Context
  },
});

const startServer = async () => {
  await server.start();

  server.applyMiddleware({
    app
  });

  app.listen(3001, () => {
    console.log("Server started on port 3001");
  });
};

startServer();