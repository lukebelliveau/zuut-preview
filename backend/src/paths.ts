export const GRAPHQL_TYPES = __dirname.includes('dist') ? 
  `${__dirname}/../../../graphql/types.graphql` :
  `${__dirname}/../../graphql/types.graphql`;
export const UI_BUILD_DIR = `${__dirname}/../../ui/build`;