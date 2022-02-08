import ItemList from '../itemList';
import PlaceableItem from './placeableItem';

describe('PlaceableItem', () => {
  describe('#isCollidingWith', () => {
    it('returns false if the other item is actually the current item', () => {
      const item = new PlaceableItem('', '1', 100, 100, 100, 100);
      const other = new PlaceableItem('', '1', 100, 100, 100, 100);
      expect(item.isCollidingWith(other)).toBe(false);
    });
    it('returns false if other item is outside of the current item', () => {
      const item = new PlaceableItem('', '1', 100, 100, 100, 100);
      const other = new PlaceableItem('', '2', 1001, 1001, 1001, 1001);
      expect(item.isCollidingWith(other)).toBe(false);
    });
    it('returns false if only the borders overlap', () => {
      const item = new PlaceableItem('', '1', 100, 100, 100, 100);
      const otherRight = new PlaceableItem('', '2', 200, 100, 100, 100);
      expect(item.isCollidingWith(otherRight)).toBe(false);
      const otherBelow = new PlaceableItem('', '3', 100, 200, 100, 100);
      expect(item.isCollidingWith(otherBelow)).toBe(false);
      const otherLeft = new PlaceableItem('', '4', 0, 100, 100, 100);
      expect(item.isCollidingWith(otherLeft)).toBe(false);
      const otherTop = new PlaceableItem('', '5', 100, 0, 100, 100);
      expect(item.isCollidingWith(otherTop)).toBe(false);
    });
    it('returns true if other item is in the northeast corner', () => {
      const item = new PlaceableItem('', '1', 100, 100, 10, 10);
      const other = new PlaceableItem('', '2', 99, 91, 10, 10);
      expect(item.isCollidingWith(other)).toBe(true);
    });
    it('returns true if other item is in the southeast corner', () => {
      const item = new PlaceableItem('', '1', 100, 100, 10, 10);
      const other = new PlaceableItem('', '2', 99, 109, 10, 10);
      expect(item.isCollidingWith(other)).toBe(true);
    });
    it('returns true if other item is in the southwest corner', () => {
      const item = new PlaceableItem('', '1', 100, 100, 10, 10);
      const other = new PlaceableItem('', '2', 91, 109, 10, 10);
      expect(item.isCollidingWith(other)).toBe(true);
    });
    it('returns true if other item is in the northwest corner', () => {
      const item = new PlaceableItem('', '1', 100, 100, 10, 10);
      const other = new PlaceableItem('', '2', 91, 91, 10, 10);
      expect(item.isCollidingWith(other)).toBe(true);
    });
  });

  describe('#rotate90Degrees', () => {
    it("flips item's length and width", () => {
      // width=10, height=20
      const item = new PlaceableItem('item', '1', 0, 0, 10, 20);

      item.rotate90Degrees();

      expect(item.width).toBe(20);
      expect(item.length).toBe(10);
    });
  });

  describe('#drop', () => {
    it('sets location/dimensions to current position if no placementShadow', () => {
      const item = new PlaceableItem('item', '1', 0, 0, 10, 10, 10, false);
      item.drop({ x: 50, y: 60 }, new ItemList());

      expect(item.x).toBe(50);
      expect(item.y).toBe(60);
    });

    it('sets location/dimensions to that of placementShadow when present', () => {
      const placementShadow = {
        x: 999,
        y: 999,
        length: 999,
        height: 999,
        width: 999,
      };
      const item = new PlaceableItem(
        'item',
        '1',
        0,
        0,
        10,
        10,
        10,
        false,
        placementShadow
      );

      expect(item.x).not.toBe(placementShadow.x);
      expect(item.y).not.toBe(placementShadow.y);
      expect(item.length).not.toBe(placementShadow.length);
      expect(item.width).not.toBe(placementShadow.width);
      expect(item.height).not.toBe(placementShadow.height);

      item.drop({ x: 50, y: 50 }, new ItemList());

      expect(item.x).toBe(placementShadow.x);
      expect(item.y).toBe(placementShadow.y);
      expect(item.length).toBe(placementShadow.length);
      expect(item.width).toBe(placementShadow.width);
      expect(item.height).toBe(placementShadow.height);
    });
  });
});
