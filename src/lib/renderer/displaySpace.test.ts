import DisplaySpace from './displaySpace';
import Room from '../objects/room';

describe('DisplaySpace', () => {
  describe('#place', () => {
    it('scales a square object to be within bounds of a square display area', () => {
      const space = new DisplaySpace(1000, 1000, 1524, 1524);
      const room = new Room(1524, 1524, 1);
      const placement = space.place(room);
      expect(placement.x).toBe(20);
      expect(placement.y).toBe(20);
      expect(placement.width).toBe(960);
      expect(placement.height).toBe(960);
    });
  });
});