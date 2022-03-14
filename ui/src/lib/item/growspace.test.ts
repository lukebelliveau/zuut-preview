import Growspace from './growspace';
import GrowspaceItem from './growspaceItem';
import { CollisionState } from './placeableItem';

describe('Growspace', () => {
  describe.only('#collisionStateBetween', () => {
    it('conflicts with other growspaces', () => {
      const growspace = new Growspace('', '1', 100, 100, 100, 100);
      const other = new Growspace('', '2', 100, 100, 100, 100);
      expect(growspace.collisionStateBetween(growspace, other)).toBe(
        CollisionState.CONFLICTED
      );
    });
    it('does not conflict with growspace items when item is placed inside growspace', () => {
      const growspace = new Growspace('', '2', 1001, 1001, 1001, 1001);
      const item = new GrowspaceItem('', '1', 100, 100, 100, 100);
      expect(growspace.collisionStateBetween(growspace, item)).toBe(
        CollisionState.NEUTRAL
      );
    });
    it('conflicts when GrowspaceItem is on growspace boundary', () => {
      const growspace = new Growspace('', '1', 950, 950, 100, 100);
      const item = new GrowspaceItem('', '2', 1001, 1001, 1001, 1001);
      expect(growspace.collisionStateBetween(growspace, item)).toBe(
        CollisionState.CONFLICTED
      );
    });
  });
});
