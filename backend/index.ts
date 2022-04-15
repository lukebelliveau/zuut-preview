import express from 'express';
import proxy from 'express-http-proxy';
import jwt from 'express-jwt';
import jwksRsa from 'jwks-rsa';
import { existsSync, readFileSync } from 'fs';
import http from 'http';
import winston from 'winston';
import expressWinston from 'express-winston';

import { getEnv } from './src/env';
import { UI_BUILD_DIR } from './src/paths';
import { createServer } from './src/server';

const NODE_ENV = process.env.NODE_ENV || 'development';
const PORT = parseInt(process.env.PORT || '3000');

const indexHtmlPath = `${UI_BUILD_DIR}/index.html`;
const indexHtml = existsSync(indexHtmlPath) ? readFileSync(indexHtmlPath) : '';

async function listen(port: number) {
  const app = express();
  const httpServer = http.createServer(app);

  app.use(
    expressWinston.logger({
      transports: [new winston.transports.Console()],
      format: winston.format.combine(
        winston.format.colorize(),
        winston.format.json()
      ),
    })
  );

  app.use(
    '/graphql',
    jwt({
      secret: jwksRsa.expressJwtSecret({
        cache: true,
        rateLimit: true,
        jwksRequestsPerMinute: 5,
        jwksUri: getEnv('JWKS_URL'),
      }),
      audience: getEnv('AUTH0_AUDIENCE'),
      issuer: getEnv('AUTH0_ISSUER'),
      algorithms: ['RS256'],
    }).unless({
      method: 'GET',
    })
  );

  const server = await createServer(httpServer);

  if (NODE_ENV !== 'development') {
    app.use('/', express.static(UI_BUILD_DIR));
  }

  server.applyMiddleware({ app });

  if (NODE_ENV === 'development') {
    const proxyUrl = `http://localhost:${PORT + 100}`;
    console.log(`Proxying web requests to ${proxyUrl}`);
    app.use('/', proxy(proxyUrl));
  } else {
    app.use('/*', (_, res) => {
      res.setHeader('content-type', 'text/html; charset=UTF-8');
      res.send(indexHtml);
    });
  }

  app.use((err: any, req: any, res: any, next: any) => {
    res.status(err.status).json(err);
  });

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
