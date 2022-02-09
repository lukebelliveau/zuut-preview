import { ApolloServer } from 'apollo-server-express';
import { ApolloServerPluginDrainHttpServer } from 'apollo-server-core';
import express from 'express';
import http from 'http';
import proxy from 'express-http-proxy';

import { typeDefs } from './typedefs';
import { resolvers } from './resolvers';

const NODE_ENV = process.env.NODE_ENV || 'development';
const PORT = parseInt(process.env.PORT || '4000');

async function listen(port: number) {
  const app = express();
  const httpServer = http.createServer(app);

  const server = new ApolloServer({
    typeDefs,
    resolvers,
    plugins: [ApolloServerPluginDrainHttpServer({ httpServer })],
  });
  await server.start();

  if (NODE_ENV !== 'development') {
    app.use('/', express.static(__dirname + '/../../ui/build'));
  }

  server.applyMiddleware({ app });

  if (NODE_ENV === 'development') {
    const proxyUrl = `http://localhost:${(PORT + 100)}`;
    console.log(`Proxying web requests to ${proxyUrl}`)
    app.use('/', proxy(proxyUrl));
  }

  return new Promise((resolve, reject) => {
    httpServer.listen(port).once('listening', resolve).once('error', reject);
  });
}

async function main() {
  try {
    await listen(PORT);
    console.log(`🚀 Server is ready at http://localhost:${PORT}/`);
  } catch (err) {
    console.error('💀 Error starting the node server', err);
  }
}

void main();