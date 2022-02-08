import { v4 } from 'uuid';
import { feetToMm } from '../conversions';
import ItemList from '../itemList';
import Plan from '../plan';
import Playground from '../playground';
import PlaceableItem from './placeableItem';

describe('PlaceableItem', () => {
  describe('place', () => {
    it("sets an item's position", () => {
      const item = new PlaceableItem('item', v4(), 0, 0, 10, 20);
      item.place({ x: 99, y: 99 });

      expect(item.x).toBe(99);
      expect(item.y).toBe(99);
    });
  });

  describe('drag', () => {
    const plan = new Plan('square', 10_000, 10_000, 12);
    const playground = new Playground(1_000, 1_000, undefined, plan);

    it("sets an item's position", () => {
      const item = new PlaceableItem('item', v4(), 0, 0, 10, 20);
      item.drag({ x: 99, y: 99 }, new ItemList(), playground);

      expect(item.x).toBe(99);
      expect(item.y).toBe(99);
    });

    it('creates a placement shadow based on snapped position and item dimensions', () => {
      const item = new PlaceableItem('item', v4(), 0, 0, 10, 20);
      item.drag({ x: 300, y: 600 }, new ItemList(), playground);

      const { placementShadow } = item;
      expect(placementShadow).not.toBeUndefined();
      expect(placementShadow?.x).toBe(feetToMm(1));
      expect(placementShadow?.y).toBe(feetToMm(2));
      expect(placementShadow?.height).toBe(item.height);
      expect(placementShadow?.length).toBe(item.length);
      expect(placementShadow?.width).toBe(item.width);
    });

    it('detects collisions based on location of placement shadow', () => {
      const otherItem = new PlaceableItem(
        'collidingItem',
        v4(),
        600,
        600,
        10,
        10,
        10,
        false
      );
      const testItem = new PlaceableItem(
        'testItem',
        v4(),
        0,
        0,
        10,
        10,
        10,
        false
      );

      const itemList = new ItemList();
      itemList.push(testItem);
      itemList.push(otherItem);

      // will collide with otherItem once this drag occurs
      testItem.drag({ x: 600, y: 600 }, itemList, playground);

      expect(testItem.isColliding).toBe(true);
      expect(testItem.placementShadow?.isColliding).toBe(true);
    });
  });

  describe('drop', () => {
    const placementShadow = {
      x: 90,
      y: 90,
      width: 10,
      height: 10,
      length: 10,
      isColliding: false,
    };
    const plan = new Plan('square', 10_000, 10_000, 12);
    const playground = new Playground(1_000, 1_000, undefined, plan);

    it('sets current position/dimensions to placementShadow', () => {
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
      item.drop(new ItemList(1), playground);

      expect(item.x).toBe(placementShadow.x);
      expect(item.x).toBe(placementShadow.x);
      expect(item.y).toBe(placementShadow.y);
      expect(item.width).toBe(placementShadow.width);
      expect(item.height).toBe(placementShadow.height);
      expect(item.length).toBe(placementShadow.length);
    });

    it('detects collisions after placing item on placementShadow', () => {
      // collides with placementShadow
      const collidingItem = new PlaceableItem(
        'collidingItem',
        v4(),
        85,
        85,
        10,
        10,
        10,
        false
      );
      // does not currently collide with collidingItem, but has a placementShadow that does
      const testItem = new PlaceableItem(
        'testItem',
        v4(),
        0,
        0,
        10,
        10,
        10,
        false,
        placementShadow
      );

      const itemList = new ItemList();
      itemList.push(testItem);
      itemList.push(collidingItem);

      testItem.drop(itemList, playground);

      expect(testItem.isColliding).toBe(true);
    });

    it('removes placementShadow from item on drop', () => {
      const testItem = new PlaceableItem(
        'testItem',
        v4(),
        0,
        0,
        10,
        10,
        10,
        false,
        placementShadow
      );

      testItem.drop(new ItemList(), playground);

      expect(testItem.placementShadow).toBeUndefined();
    });
  });

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

  describe('#createDefaultPlacementShadow', () => {
    it("creates a placementShadow with the item's dimensions and snapped coordinates", () => {
      const plan = new Plan('square', 10_000, 10_000, 12);
      const playground = new Playground(1_000, 1_000, undefined, plan);
      const item = new PlaceableItem('item', v4(), 0, 0, 10, 20);

      const placementShadow = item.createDefaultPlacementShadow(
        { x: 300, y: 600 },
        playground
      );

      expect(placementShadow.x).toBe(feetToMm(1));
      expect(placementShadow.y).toBe(feetToMm(2));
      expect(placementShadow.height).toBe(item.height);
      expect(placementShadow.length).toBe(item.length);
      expect(placementShadow.width).toBe(item.width);
    });
  });
});
