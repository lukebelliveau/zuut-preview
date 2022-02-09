
import Growspace from './growspace';
import GrowspaceItem from './growspaceItem';

describe('Growspace', () => {
  describe('#isCollidingWith', () => {
    it('collides with other growspaces', () => {
      const item = new Growspace('', '1', 100, 100, 100, 100);
      const other = new Growspace('', '2', 100, 100, 100, 100);
      expect(item.isCollidingWith(other)).toBe(true);
    });
    it('does not collide with growspace items', () => {
      const item = new GrowspaceItem('', '1', 100, 100, 100, 100);
      const other = new GrowspaceItem('', '2', 1001, 1001, 1001, 1001);
      expect(item.isCollidingWith(other)).toBe(false);
    });
  });
});
