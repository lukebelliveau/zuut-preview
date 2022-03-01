import { MISC_ITEM_TYPE } from '../item/miscItem';
import PlanReduxAdapter from './planReduxAdapter';

describe('PlanReduxAdapter', () => {
  describe('#stateToPlan', () => {
    it("doesn't include items if not provided", () => {
      const plan = PlanReduxAdapter.stateToPlan({
        id: '123',
        name: 'Topo Chico',
        room: {},
      });
      expect(plan.items.length).toEqual(0);
    });
    it('includes items if provided', () => {
      const plan = PlanReduxAdapter.stateToPlan({
        id: '123',
        name: 'Topo Chico',
        room: {},
      }, [
        { 
          id: '456',
          type: MISC_ITEM_TYPE,
          name: 'Mackerel'
        },
        { 
          id: '789',
          type: MISC_ITEM_TYPE,
          name: 'Canyon'
        },
      ]);
      expect(plan.items.length).toEqual(2);
    });
  });
});