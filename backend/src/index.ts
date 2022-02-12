import { ApolloServer } from 'apollo-server-express';
import { ApolloServerPluginDrainHttpServer } from 'apollo-server-core';
import express from 'express';
import proxy from 'express-http-proxy';
import jwt from 'express-jwt';
import { existsSync, readFileSync } from 'fs';
import http from 'http';

import { typeDefs } from './typedefs';
import { resolvers } from './resolvers';

const NODE_ENV = process.env.NODE_ENV || 'development';
const PORT = parseInt(process.env.PORT || '4000');
const UI_BUILD_DIR = `${__dirname}/../../ui/build`;

const indexHtmlPath = `${UI_BUILD_DIR}/index.html`;
const indexHtml = existsSync(indexHtmlPath) ? readFileSync(indexHtmlPath) : '';

async function listen(port: number) {
  const app = express();
  const httpServer = http.createServer(app);

  app.use('/graphql', jwt({
    secret: process.env.AUTH0_SECRET || '',
    algorithms: ['HS256']
  }));

  const server = new ApolloServer({
    typeDefs,
    resolvers,
    plugins: [ApolloServerPluginDrainHttpServer({ httpServer })],
    context: ({ req }) => {
      return { user: req.user };  // req.user comes from express-jwt
    },
  });
  await server.start();

  if (NODE_ENV !== 'development') {
    app.use('/', express.static(UI_BUILD_DIR));
  }

  server.applyMiddleware({ app });

  if (NODE_ENV === 'development') {
    const proxyUrl = `http://localhost:${(PORT + 100)}`;
    console.log(`Proxying web requests to ${proxyUrl}`)
    app.use('/', proxy(proxyUrl));
  } else {
    app.use('/*', (_, res) => {
      res.setHeader('content-type', 'text/html; charset=UTF-8');
      res.send(indexHtml);
    });
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