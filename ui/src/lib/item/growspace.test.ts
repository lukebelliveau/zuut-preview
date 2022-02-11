import Growspace from './growspace';
import GrowspaceItem from './growspaceItem';

describe('Growspace', () => {
  describe('#isCollidingWith', () => {
    it('collides with other growspaces', () => {
      const growspace = new Growspace('', '1', 100, 100, 100, 100);
      const other = new Growspace('', '2', 100, 100, 100, 100);
      expect(growspace.isCollidingWith(growspace, other)).toBe(true);
    });
    it('does not collide with growspace items when item is placed inside growspace', () => {
      const growspace = new Growspace('', '2', 1001, 1001, 1001, 1001);
      const item = new GrowspaceItem('', '1', 100, 100, 100, 100);
      expect(growspace.isCollidingWith(growspace, item)).toBe(false);
    });
    it('collides when GrowspaceItem is on growspace boundary', () => {
      const growspace = new Growspace('', '1', 950, 950, 100, 100);
      const item = new GrowspaceItem('', '2', 1001, 1001, 1001, 1001);
      expect(growspace.isCollidingWith(growspace, item)).toBe(true);
    });
  });
});
