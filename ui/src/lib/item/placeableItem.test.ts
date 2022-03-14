import { v4 } from 'uuid';
import { feetToMm } from '../conversions';
import ItemList from '../itemList';
import Plan from '../plan';
import Playground from '../playground';
import PlaceableItem, { CollisionState } from './placeableItem';

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
        CollisionState.NEUTRAL
      );
      const testItem = new PlaceableItem(
        'testItem',
        v4(),
        0,
        0,
        10,
        10,
        10,
        CollisionState.NEUTRAL
      );

      const itemList = new ItemList();
      itemList.push(testItem);
      itemList.push(otherItem);

      // will collide with otherItem once this drag occurs
      testItem.drag({ x: 600, y: 600 }, itemList, playground);

      expect(testItem.collisionState).toBe(CollisionState.CONFLICTED);
      expect(testItem.placementShadow?.collisionState).toBe(
        CollisionState.CONFLICTED
      );
    });
  });

  describe('drop', () => {
    const placementShadow = {
      x: 90,
      y: 90,
      width: 10,
      height: 10,
      length: 10,
      collisionState: CollisionState.NEUTRAL,
    };
    const plan = new Plan('square', 10_000, 10_000, 12);
    const playground = new Playground(1_000, 1_000, undefined, plan);

    it('returns true when item has a placementShadow', () => {
      const item = new PlaceableItem(
        'item',
        '1',
        0,
        0,
        10,
        10,
        10,
        CollisionState.NEUTRAL,
        placementShadow
      );
      expect(item.drop(new ItemList(1), playground)).toBe(true);
    });

    it('returns false when item has no placementShadow', () => {
      const item = new PlaceableItem(
        'item',
        '1',
        0,
        0,
        10,
        10,
        10,
        CollisionState.NEUTRAL
      );
      expect(item.drop(new ItemList(1), playground)).toBe(false);
    });

    it('sets current position/dimensions to placementShadow', () => {
      const item = new PlaceableItem(
        'item',
        '1',
        0,
        0,
        10,
        10,
        10,
        CollisionState.NEUTRAL,
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
        CollisionState.NEUTRAL
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
        CollisionState.NEUTRAL,
        placementShadow
      );

      const itemList = new ItemList();
      itemList.push(testItem);
      itemList.push(collidingItem);

      testItem.drop(itemList, playground);

      expect(testItem.collisionState).toBe(CollisionState.CONFLICTED);
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
        CollisionState.NEUTRAL,
        placementShadow
      );

      testItem.drop(new ItemList(), playground);

      expect(testItem.placementShadow).toBeUndefined();
    });
  });

  describe('updateCollisions', () => {
    const plan = new Plan('square', 10_000, 10_000, 12);
    const playground = new Playground(1_000, 1_000, undefined, plan);
    it('sets collisionState=BAD to item and item.placementShadow when collisions occur', () => {
      const collisionItem = new PlaceableItem(
        'collision item',
        v4(),
        0,
        0,
        1000,
        1000
      );
      const placementShadow = {
        x: 0,
        y: 0,
        width: 1000,
        height: 1000,
        length: 1000,
        collisionState: CollisionState.NEUTRAL,
      };
      const testItem = new PlaceableItem(
        'collision item',
        v4(),
        0,
        0,
        1000,
        1000,
        1000,
        CollisionState.NEUTRAL,
        placementShadow
      );

      const items = new ItemList();
      items.push(collisionItem);
      items.push(testItem);

      expect(testItem.collisionState).toBe(CollisionState.NEUTRAL);
      expect(testItem.placementShadow?.collisionState).toBe(
        CollisionState.NEUTRAL
      );
      testItem.updateCollisions(items, playground);
      expect(testItem.collisionState).toBe(CollisionState.CONFLICTED);
      expect(testItem.placementShadow?.collisionState).toBe(
        CollisionState.CONFLICTED
      );
    });

    it('assigns collisionState=GOOD to item and item.placementShadow when no collisions', () => {
      const noCollisionItem = new PlaceableItem(
        'collision item',
        v4(),
        2000,
        2000,
        1000,
        1000
      );
      const placementShadow = {
        x: 0,
        y: 0,
        width: 1000,
        height: 1000,
        length: 1000,
        collisionState: CollisionState.CONFLICTED,
      };
      const testItem = new PlaceableItem(
        'collision item',
        v4(),
        0,
        0,
        1000,
        1000,
        1000,
        CollisionState.CONFLICTED,
        placementShadow
      );

      const items = new ItemList();
      items.push(noCollisionItem);
      items.push(testItem);

      expect(testItem.collisionState).toBe(CollisionState.CONFLICTED);
      expect(testItem.placementShadow?.collisionState).toBe(
        CollisionState.CONFLICTED
      );
      testItem.updateCollisions(items, playground);
      expect(testItem.collisionState).toBe(CollisionState.NEUTRAL);
      expect(testItem.placementShadow?.collisionState).toBe(
        CollisionState.NEUTRAL
      );
    });
  });

  describe('#isCollidingWith', () => {
    it('returns neutral if other item is outside of the current item', () => {
      const item = new PlaceableItem('', '1', 100, 100, 100, 100);
      const other = new PlaceableItem('', '2', 1001, 1001, 1001, 1001);
      expect(item.collisionStateBetween(item, other)).toBe(
        CollisionState.NEUTRAL
      );
    });
    it('returns neutral if only the borders overlap', () => {
      const item = new PlaceableItem('', '1', 100, 100, 100, 100);
      const otherRight = new PlaceableItem('', '2', 200, 100, 100, 100);
      expect(item.collisionStateBetween(item, otherRight)).toBe(
        CollisionState.NEUTRAL
      );
      const otherBelow = new PlaceableItem('', '3', 100, 200, 100, 100);
      expect(item.collisionStateBetween(item, otherBelow)).toBe(
        CollisionState.NEUTRAL
      );
      const otherLeft = new PlaceableItem('', '4', 0, 100, 100, 100);
      expect(item.collisionStateBetween(item, otherLeft)).toBe(
        CollisionState.NEUTRAL
      );
      const otherTop = new PlaceableItem(
        '',
        '5',
        100,
        0,
        100,
        CollisionState.NEUTRAL
      );
      expect(item.collisionStateBetween(item, otherTop)).toBe(
        CollisionState.NEUTRAL
      );
    });
    it('returns true if other item is in the northeast corner', () => {
      const item = new PlaceableItem('', '1', 100, 100, 10, 10);
      const other = new PlaceableItem('', '2', 99, 91, 10, 10);
      expect(item.collisionStateBetween(item, other)).toBe(
        CollisionState.CONFLICTED
      );
    });
    it('returns true if other item is in the southeast corner', () => {
      const item = new PlaceableItem('', '1', 100, 100, 10, 10);
      const other = new PlaceableItem('', '2', 99, 109, 10, 10);
      expect(item.collisionStateBetween(item, other)).toBe(
        CollisionState.CONFLICTED
      );
    });
    it('returns true if other item is in the southwest corner', () => {
      const item = new PlaceableItem('', '1', 100, 100, 10, 10);
      const other = new PlaceableItem('', '2', 91, 109, 10, 10);
      expect(item.collisionStateBetween(item, other)).toBe(
        CollisionState.CONFLICTED
      );
    });
    it('returns true if other item is in the northwest corner', () => {
      const item = new PlaceableItem('', '1', 100, 100, 10, 10);
      const other = new PlaceableItem('', '2', 91, 91, 10, 10);
      expect(item.collisionStateBetween(item, other)).toBe(
        CollisionState.CONFLICTED
      );
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
