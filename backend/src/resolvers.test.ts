import { resolvers } from "./resolvers";

describe('resolver', () => {
  describe('plans', () => {
    it('returns an empty list', () => {
      expect(resolvers.Query.plans()).toEqual([]);
    });
  });
});