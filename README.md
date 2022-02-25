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

## Configuring the environment

Copy .env.development.example to .env and customize any of the values for your local dev.

## Running dev servers

The `Procfile` lists the two services to run, the backend and ui. The foreman package reads Procfile and starts the backend
service on port 4000 by default but the `npm run dev` defaults to 3000. It then starts the react dev server on 3100. When `NODE_ENV=development`, the backend will proxy any non-graphql requests to the react dev server. So you can access the entire
site from [http://localhost:4000](http://localhost:3000).

## GraphQL Schema

The client and server have Typescript types generated from our GraphQL schema to provide typed functions in their codebases.
Anytime you update the schema in `graphql/*.graphql`, you should run `npm run codegen` to have updated types exported to
`backend/src/graphql.ts` and `ui/src/graphql.ts`. In the backend this gives us type definitions for all our resolvers. In the
UI this gives us function signatures for queries and mutations.

## Browser tests

The browser tests require a valid account to log in with. You can use the zuuttestuser@gmail.com user:

```bash
export TEST_USERNAME=zuuttestuser@gmail.com
export TEST_PASSWORD=ZUUTtester123!
```

Then start the dev servers, then run:

```bash
cd ui
npm run taiko-test
```

## Cypress tests
To run cypress tests locally, start the app locally then run

```bash
cd ui
npm run cypress:local
```

You will need a `ui/cypress.env.json` file that specifies the following Auth0 values:
- `auth_audience`
- `auth_url`
- `auth_client_id`
- `auth_client_secret`
- `auth_username`
- `auth_password`
## In production

The app is built with docker which runs the backend server. When `NODE_ENV=production`, the backend will not use a proxy,
but instead serve static files from the `ui/build` directory.
