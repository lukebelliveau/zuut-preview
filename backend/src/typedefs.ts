import { readFileSync } from 'fs';
import { GRAPHQL_TYPES } from './paths';

export const typeDefs = readFileSync(GRAPHQL_TYPES, { encoding: 'utf-8' });