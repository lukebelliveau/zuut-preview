const appRoot = __dirname.includes('dist') ? `${__dirname}/../../..` : `${__dirname}/../..`;

export const GRAPHQL_TYPES = `${appRoot}/graphql/types.graphql`;
export const UI_BUILD_DIR = `${appRoot}/ui/build`;