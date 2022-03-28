import CeilingGrowspaceItem from './ceilingGrowspaceItem';
import Growspace from './growspace';
import GrowspaceItem from './growspaceItem';
import { CollisionState } from './placeableItem';

describe('GrowspaceItem', () => {
  describe('#isCollidingWith', () => {
    it('conflicts with other growspace items', () => {
      const item = new GrowspaceItem('', '1', 100, 100, 100, 100);
      const other = new GrowspaceItem('', '2', 100, 100, 100, 100);
      expect(item.collisionStateBetween(item, other)).toBe(
        CollisionState.CONFLICTED
      );
    });
    it('does not conflict with CeilingGrowspaceItems', () => {
      const item = new GrowspaceItem('', '1', 100, 100, 100, 100);
      const other = new CeilingGrowspaceItem('', '2', 100, 100, 100, 100);
      expect(item.collisionStateBetween(item, other)).toBe(
        CollisionState.NEUTRAL
      );
    });
    it('does not conflict with growspaces', () => {
      const item = new Growspace('', '1', 100, 100, 100, 100);
      const other = new GrowspaceItem('', '2', 1001, 1001, 1001, 1001);
      expect(item.collisionStateBetween(item, other)).toBe(
        CollisionState.NEUTRAL
      );
    });
    it('conflicts if straddling left growspace boundary', () => {
      const item = new GrowspaceItem('', '2', -50, 500, 100, 100);
      const other = new Growspace('', '1', 0, 0, 1000, 1000);
      expect(item.collisionStateBetween(item, other)).toBe(
        CollisionState.CONFLICTED
      );
    });
    it('conflicts if straddling right growspace boundary', () => {
      const item = new GrowspaceItem('', '2', 1000, 500, 100, 100);
      const other = new Growspace('', '1', 500, 500, 1000, 1000);
      expect(item.collisionStateBetween(item, other)).toBe(
        CollisionState.CONFLICTED
      );
    });
    it('conflicts if straddling bottom growspace boundary', () => {
      const item = new GrowspaceItem('', '2', 500, 1000, 100, 100);
      const other = new Growspace('', '1', 500, 500, 1000, 1000);

      expect(item.collisionStateBetween(item, other)).toBe(
        CollisionState.CONFLICTED
      );
    });
    it('conflicts if straddling top growspace boundary', () => {
      const item = new GrowspaceItem('', '2', 500, -50, 100, 100);
      const other = new Growspace('', '1', 0, 0, 1000, 1000);
      expect(item.collisionStateBetween(item, other)).toBe(
        CollisionState.CONFLICTED
      );
    });
  });
});
