import {
  ApolloClient,
  InMemoryCache,
  createHttpLink,
  NormalizedCacheObject,
  gql
} from '@apollo/client';
import { setContext } from '@apollo/client/link/context';

import { Query } from '../../graphql';
import { unwrapOrError, unwrapOrUndefined } from '../graphqlData';
import Plan from '../plan';

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

  async current(): Promise<Plan> {
    const result = await this.client.query({
      query: gql`
        {
          plans {
            id
            name
            room {
              width
              length
            }
          }
        }
      `,
    });
    const query = result.data as Query;
    const gqlPlans = query.plans;
    if (!gqlPlans || gqlPlans?.length === 0) throw new Error('No plans returned');
    const gqlPlan = unwrapOrError(gqlPlans[0]);

    return new Plan(
      unwrapOrUndefined(gqlPlan.name),
      gqlPlan.room?.width,
      gqlPlan.room?.length,
      undefined,
      gqlPlan.id,
    );
  }

  create(plan: Plan) {
    return this.client.mutate({
      mutation: gql`
        mutation CreatePlan($plan: PlanInput!) {
          createPlan(plan: $plan)
        }
      `,
      variables: {
        plan: {
          id: plan.id,
          name: plan.name,
          room: {
            width: plan.room.width,
            length: plan.room.length,
          }
        }
      }
    });
  }
}