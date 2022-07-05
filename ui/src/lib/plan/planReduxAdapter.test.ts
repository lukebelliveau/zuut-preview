import { MISC_ITEM_TYPE } from '../item/miscItem';
import Room from '../room';
import PlanReduxAdapter from './planReduxAdapter';

describe('PlanReduxAdapter', () => {
  describe('#stateToPlan', () => {
    it("doesn't include items if not provided", () => {
      const plan = PlanReduxAdapter.stateToPlan({
        id: '123',
        name: 'Topo Chico',
        room: new Room(10, 10),
      });
      expect(plan.items.length).toEqual(0);
    });
    it('includes items if provided', () => {
      const plan = PlanReduxAdapter.stateToPlan(
        {
          id: '123',
          name: 'Topo Chico',
          room: new Room(10, 10),
        },
        [
          {
            id: '456',
            type: MISC_ITEM_TYPE,
            name: 'Mackerel',
            ASIN: null,
          },
          {
            id: '789',
            type: MISC_ITEM_TYPE,
            name: 'Canyon',
            ASIN: null,
          },
        ]
      );
      expect(plan.items.length).toEqual(2);
    });
  });
});
