import {
  ApolloClient,
  InMemoryCache,
  createHttpLink,
  NormalizedCacheObject,
  gql,
} from '@apollo/client';
import { NetworkError } from '@apollo/client/errors';
import { setContext } from '@apollo/client/link/context';
import { onError } from '@apollo/client/link/error';
import { push } from 'connected-react-router';

import { Query } from '../../graphql';
import { unwrapOrError, unwrapOrUndefined } from '../graphqlData';
import ItemGraphqlAdapter from '../item/itemGraphqlAdapter';
import Plan from '../plan';

const requestLink = (jwt: string) => {
  return setContext((_, { headers }) => {
    return {
      headers: {
        ...headers,
        Authorization: `Bearer ${jwt}`,
      },
    };
  })
    .concat(
      onError((e: any) => {
        /**
         * seems like sometimes auth0 does not refresh tokens and user is left with stale token
         * resulting in what was previously a 401 error invisible to the user
         * this is a quick & hacky workaround
         *
         * I'm so sorry
         */
        if (e.networkError?.message?.includes('401')) {
          // eslint-disable-next-line
          location.href = '/session-expired';
        }
      })
    )
    .concat(
      createHttpLink({
        uri: '/graphql',
      })
    );
};

export default class PlanGraphqlAdapter {
  client: ApolloClient<NormalizedCacheObject>;

  constructor(jwt: string) {
    this.client = new ApolloClient<NormalizedCacheObject>({
      cache: new InMemoryCache(),
      link: requestLink(jwt),
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
