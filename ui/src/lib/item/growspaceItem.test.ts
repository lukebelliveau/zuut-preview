import Growspace from './growspace';
import GrowspaceItem from './growspaceItem';

describe('GrowspaceItem', () => {
  describe('#isCollidingWith', () => {
    it('collides with other growspace items', () => {
      const item = new GrowspaceItem('', '1', 100, 100, 100, 100);
      const other = new GrowspaceItem('', '2', 100, 100, 100, 100);
      expect(item.isCollidingWith(item, other)).toBe(true);
    });
    it('does not collide with growspaces', () => {
      const item = new Growspace('', '1', 100, 100, 100, 100);
      const other = new GrowspaceItem('', '2', 1001, 1001, 1001, 1001);
      expect(item.isCollidingWith(item, other)).toBe(false);
    });
    it('collides if straddling left growspace boundary', () => {
      const item = new GrowspaceItem('', '2', -50, 500, 100, 100);
      const other = new Growspace('', '1', 0, 0, 1000, 1000);
      expect(item.isCollidingWith(item, other)).toBe(true);
    });
    it('collides if straddling right growspace boundary', () => {
      const item = new GrowspaceItem('', '2', 950, 500, 100, 100);
      const other = new Growspace('', '1', 0, 0, 1000, 1000);
      expect(item.isCollidingWith(item, other)).toBe(true);
    });
    it('collides if straddling bottom growspace boundary', () => {
      const item = new GrowspaceItem('', '2', 500, 950, 100, 100);
      const other = new Growspace('', '1', 0, 0, 1000, 1000);
      expect(item.isCollidingWith(item, other)).toBe(true);
    });
    it('collides if straddling top growspace boundary', () => {
      const item = new GrowspaceItem('', '2', 500, -50, 100, 100);
      const other = new Growspace('', '1', 0, 0, 1000, 1000);
      expect(item.isCollidingWith(item, other)).toBe(true);
    });
  });
});
