import { Resolvers } from "./graphql";
import { unwrapOrUndefined } from "./graphqlInput";
import { GraphqlContext } from "./server";

export const resolvers: Resolvers<GraphqlContext> = {
  Query: {
    plans: (_, __, { dataSources }) => {
      return dataSources.plans.all();
    },
  },
  Mutation: {
    async createPlan(_, planInput, { dataSources }) {
      return dataSources.plans.create(planInput.plan);
    },

    updatePlan(_, planInput, { dataSources }) {
      return dataSources.plans.update(planInput.plan);
    }
  },
};