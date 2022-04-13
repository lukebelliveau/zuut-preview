import {
  ApolloClient,
  InMemoryCache,
  createHttpLink,
  NormalizedCacheObject,
  gql,
} from '@apollo/client';
import { setContext } from '@apollo/client/link/context';

import { Query } from '../../graphql';
import { unwrapOrError, unwrapOrUndefined } from '../graphqlData';
import ItemGraphqlAdapter from '../item/itemGraphqlAdapter';
import Plan from '../plan';

export default class PlanGraphqlAdapter {
  client: ApolloClient<NormalizedCacheObject>;

  constructor(jwt: string) {
    this.client = new ApolloClient<NormalizedCacheObject>({
      cache: new InMemoryCache(),
      link: setContext((_, { headers }) => ({
        headers: {
          ...headers,
          Authorization: `Bearer ${jwt}`,
        },
      })).concat(
        createHttpLink({
          uri: '/graphql',
        })
      ),
    });
  }

  async current(): Promise<Plan | undefined> {
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
            items {
              id
              name
              type
              x
              y
              width
              length
              height
              rotation
              modifiers
            }
          }
        }
      `,
    });
    const query = result.data as Query;
    const gqlPlans = query.plans;
    if (!gqlPlans || gqlPlans?.length === 0) return;
    const gqlPlan = gqlPlans[0];
    if (!gqlPlan) return;

    const plan = new Plan(
      unwrapOrUndefined(gqlPlan.name),
      gqlPlan.room?.width,
      gqlPlan.room?.length,
      undefined,
      gqlPlan.id
    );
    gqlPlan.items.forEach((gqlItem) =>
      plan.addItem(ItemGraphqlAdapter.graphqlToItem(gqlItem))
    );

    return plan;
  }

  async create(plan: Plan): Promise<string> {
    const result = await this.client.mutate({
      mutation: gql`
        mutation CreatePlan($plan: PlanInput!) {
          createPlan(plan: $plan)
        }
      `,
      variables: {
        plan: {
          name: plan.name,
          room: {
            width: plan.room.width,
            length: plan.room.length,
          },
          items: plan.items,
        },
      },
    });

    return result.data.createPlan;
  }

  deleteAll() {
    return this.client.mutate({
      mutation: gql`
        mutation DeleteAllPlans {
          deleteAllPlans {
            id
          }
        }
      `,
    });
  }

  update(plan: Plan) {
    return this.client.mutate({
      mutation: gql`
        mutation UpdatePlan($plan: PlanInput!) {
          updatePlan(plan: $plan) {
            id
          }
        }
      `,
      variables: {
        plan: {
          id: plan.id,
          name: plan.name,
          room: {
            width: plan.room.width,
            length: plan.room.length,
          },
          items: plan.items.map(ItemGraphqlAdapter.itemToGraphql),
        },
      },
    });
  }
}
