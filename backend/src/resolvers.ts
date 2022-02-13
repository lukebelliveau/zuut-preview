import { MutationCreatePlanArgs, Resolvers } from "./graphql";
import { unwrapOrUndefined } from "./graphqlInput";
import { GraphqlContext } from "./server";

export const resolvers: Resolvers<GraphqlContext> = {
  Query: {
    plans: () => [],
  },
  Mutation: {
    async createPlan(_, { id, name }, { plans }) {
      plans.create(id, unwrapOrUndefined(name));
      return id;
    }
  },
};