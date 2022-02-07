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
    describe('when placement shadow present', () => {
      const placementShadow = {
        x: 999,
        y: 999,
        length: 999,
        height: 999,
        width: 999,
      };

      it('sets location/dimensions to that of placementShadow', () => {
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

        item.drop({ x: 50, y: 50 }, new ItemList());
      });
    });
  });
});
