import {
  ApolloClient,
  InMemoryCache,
  createHttpLink,
  NormalizedCacheObject,
  gql
} from '@apollo/client';
import { setContext } from '@apollo/client/link/context';

import { PlanState } from '../../features/plans/planState';

const CREATE_PLAN = gql`
  mutation CreatePlan($id: ID!, $name: String) {
    createPlan(id: $id, name: $name)
  }
`;

export default class PlanGraphqlAdapter {
  client: ApolloClient<NormalizedCacheObject>;

  constructor(jwt: string) {
    this.client = new ApolloClient<NormalizedCacheObject>({
      cache: new InMemoryCache(),
      link: setContext((_, { headers }) => ({
          headers: {
            ...headers,
            Authorization: `Bearer ${jwt}`
          }
      })).concat(createHttpLink({
        uri: '/graphql'
      })),
    });
  }

  save(plan: PlanState) {
    return this.client.mutate({
      mutation: CREATE_PLAN,
      variables: {
        id: plan.id,
        name: plan.name,
      }
    });
  }
}