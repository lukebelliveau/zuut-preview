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
    createPlan(_, planInput, { dataSources }) {
      dataSources.plans.create(planInput.plan);
      return planInput.plan.id;
    }
  },
};