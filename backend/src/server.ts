import { ApolloServer } from 'apollo-server-express';
import { ApolloServerPluginDrainHttpServer } from 'apollo-server-core';
import http from 'http';
import { MongoClient, Db } from 'mongodb'

import { typeDefs } from './typedefs';
import { resolvers } from './resolvers';
import Plans from './dataSources/plans';
import { getEnv } from './env';

let db: Db;

type Jwt = {
  sub?: string | undefined;
}

export type GraphqlContext = {
  plans: Plans,
  user: Jwt,
}

export async function createServer(httpServer: http.Server) {
  const server = new ApolloServer({
    typeDefs,
    resolvers,
    plugins: [ApolloServerPluginDrainHttpServer({ httpServer })],
    context: ({ req }) => {
      return { user: req.user };  // req.user comes from express-jwt
    },
    dataSources: () => {
      if (!db) {
        const client = new MongoClient(getEnv('MONGODB_URL'));
        client.connect();
        db = client.db();
      }

      return {
        plans: new Plans(db.collection('plans')),
      }
    },
  });
  await server.start();
  return server;
}