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

## Jest UI tests

Run our jest tests with `$ npm test` from the `/ui` folder.
We use `react-konva` for our interactive playground.

Konva requires the `canvas` package to run in a NodeJS environment such as Jest tests.

On certain architectures (such as Apple Silicon), `canvas` has to compile on the system,
which requires extra dependencies. Instructions for installing these dependencies can be found
[here](https://github.com/Automattic/node-canvas#compiling)

For example, on an M1 Mac, the command `$ npm install canvas` fails.

From the instructions found [here](https://github.com/Automattic/node-canvas#compiling), we can do the following:

`$ brew install pkg-config cairo pango libpng jpeg giflib librsvg`

Following installation of these Homebrew packages, npm should be able to install `canvas`.

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

## Deploying

We deploy to Heroku via GitHub actions. We have three workflows, defined in `.github/workflows/{dev,prod,stage}.yml`

### Deploying to dev

All pushes to the `main` branch are deployed to `zuut-dev.herokuapp.com` if they pass our pipeline checks.

### Deploying to QA

Pushes tagged with `q*` will be deployed to `zuut-qa.herokuapp.com`. To tag and push, do the following:

`$ git tag q2022-04-26` (for example)
`$ git push origin q2022-04-26`

### Deploying to Prod

Pushes tagged with `v*` will be deployed to `zuut-prod.herokuapp.com`. To tag and push, do the following:

`$ git tag v2022-04-26` (for example)
`$ git push origin v2022-04-26`

## In production

The app is built with docker which runs the backend server. When `NODE_ENV=production`, the backend will not use a proxy,
but instead serve static files from the `ui/build` directory.

## Environment variables

### Clientside

To make an environment variable available in the client app, do the following:

Add it to the environment's Github action build step. For example, to add the environment variable
`MIXPANEL TOKEN` to prod, open `.github/workflows/prod.yml` and add `MIXPANEL_TOKEN` under `docker_build_args`,
then add the value to the `env`:

```yml
jobs:
  build:
    runs-on: ubuntu-18.04

    steps:
      - uses: actions/checkout@v2
      - name: Deploy to Heorku
        uses: akhileshns/heroku-deploy@v3.12.12
        with:
          heroku_api_key: ${{secrets.HEROKU_API_KEY}}
          heroku_app_name: 'zuut-prod' #Must be unique in Heroku
          heroku_email: 'zuutheroku@gmail.com'
          usedocker: true
          docker_build_args: |
            MIXPANEL_TOKEN
        env:
          MIXPANEL_TOKEN: '<mixpanel token>'
```

Then you must copy this value into the Docker environment. In the top-level Dockerfile, do the following:

```Dockerfile
ARG MIXPANEL_TOKEN
ENV REACT_APP_MIXPANEL_TOKEN $MIXPANEL_TOKEN
```

The variable will be accessible with `process.env.REACT_APP_MIXPANEL_TOKEN`.
