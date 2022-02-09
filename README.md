# Zuut

## Setup

Install node.js: `brew install node`

Install mongodb:

```sh
brew tap mongodb/brew
brew install mongodb-community
```

Install node modules for the two sub-projects: backend and ui.

```sh
cd backend
npm i
cd ../ui
npm i
cd ..
npm i
```

## Running dev servers

The `Procfile` lists the two services to run, the backend and ui. The foreman package reads Procfile and starts the backend
service on port 4000 by default. It then starts the react dev server on 4100. When `NODE_ENV=development`, the backend
will proxy any non-graphql requests to the react dev server. So you can access the entire site from
[http://localhost:4000](http://localhost:4000).

## In production

The app is built with docker which runs the backend server. When `NODE_ENV=production`, the backend will not use a proxy,
but instead serve static files from the `ui/build` directory.
