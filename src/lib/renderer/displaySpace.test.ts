import DisplaySpace from './displaySpace';
import RoomRenderer from './roomRenderer';

describe('DisplaySpace', () => {
  describe('#place', () => {
    it('scales a square object to be within bounds of a square display area', () => {
      const space = new DisplaySpace(1000, 1000, 1524, 1524);
      const room = new RoomRenderer(space, 1524, 1524, 1);
      const placement = space.place(room);
      expect(placement.x).toBe(5);
      expect(placement.y).toBe(5);
      expect(placement.width).toBe(490);
      expect(placement.height).toBe(490);
    });
  });
});