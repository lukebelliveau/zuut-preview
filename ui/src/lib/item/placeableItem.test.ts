import { v4 } from 'uuid';
import { feetToMm } from '../conversions';
import { IItem } from '../item';
import { Layer } from '../layer';
import Plan from '../plan';
import Playground from '../playground';
import ModifierItem from './modifierItem';
import PlaceableItem, {
  CollisionState,
  PlacementShadow,
} from './placeableItem';
import PotItem from './potItem';

describe('PlaceableItem', () => {
  describe('addModifier', () => {
    it('throws an error if given an invalid modifier type', () => {
      expect(() => {
        const soilItem = new ModifierItem('soil');
        const placeableItem = new PlaceableItem('item', v4());

        placeableItem.addModifier(soilItem);
      }).toThrow();
    });
    it('adds a soil modifier when there are no modifiers', () => {
      const soilItem = new ModifierItem('soil');
      const placeableItem = new PlaceableItem(
        'item',
        v4(),
        0,
        0,
        100,
        100,
        100,
        0,
        { soil: [] }
      );

      placeableItem.addModifier(soilItem);

      expect(placeableItem.modifiers.soil.length).toBe(1);
      expect(placeableItem.modifiers.soil[0]).toBe(soilItem.id);
    });

    it('adds an additional soil modifier', () => {
      const soilItem1 = new ModifierItem('soil');
      const soilItem2 = new ModifierItem('soil');
      const placeableItem = new PlaceableItem(
        'item',
        v4(),
        0,
        0,
        100,
        100,
        100,
        0,
        { soil: [] }
      );

      placeableItem.addModifier(soilItem1);
      placeableItem.addModifier(soilItem2);

      expect(placeableItem.modifiers.soil.length).toBe(2);
      expect(placeableItem.modifiers.soil[0]).toBe(soilItem1.id);
      expect(placeableItem.modifiers.soil[1]).toBe(soilItem2.id);
    });

    it('adds multiple types of modifiers', () => {
      const soilItem = new ModifierItem('soil');
      const bambooItem = new ModifierItem('bamboo');
      const placeableItem = new PlaceableItem(
        'item',
        v4(),
        0,
        0,
        100,
        100,
        100,
        0,
        { soil: [], bamboo: [] }
      );

      placeableItem.addModifier(soilItem);
      placeableItem.addModifier(bambooItem);

      expect(placeableItem.modifiers.soil.length).toBe(1);
      expect(placeableItem.modifiers.bamboo.length).toBe(1);
      expect(placeableItem.modifiers.soil[0]).toBe(soilItem.id);
      expect(placeableItem.modifiers.bamboo[0]).toBe(bambooItem.id);
    });
  });

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
      item.drag({ x: 99, y: 99 }, [], playground);

      expect(item.x).toBe(99);
      expect(item.y).toBe(99);
    });

    it('creates a placement shadow based on snapped position and item dimensions', () => {
      const item = new PlaceableItem('item', v4(), 0, 0, 10, 20);
      item.drag({ x: 300, y: 600 }, [], playground);

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
        4500,
        3000,
        feetToMm(2),
        feetToMm(2),
        feetToMm(2)
      );

      const testItem = new PlaceableItem(
        'test',
        v4(),
        0,
        0,
        feetToMm(2),
        feetToMm(2),
        feetToMm(2)
      );

      const itemList: IItem[] = [];
      itemList.push(testItem);
      itemList.push(otherItem);

      // will collide with otherItem once this drag occurs
      testItem.drag({ x: 4000, y: 2600 }, itemList, playground);

      expect(testItem.collisionState).toBe(CollisionState.CONFLICTED);
      expect(testItem.placementShadow?.collisionState).toBe(
        CollisionState.CONFLICTED
      );
    });
  });

  describe('drop', () => {
    const placementShadow: PlacementShadow = {
      x: 90,
      y: 90,
      width: 10,
      height: 10,
      length: 10,
      collisionState: CollisionState.NEUTRAL,
      offset: { x: 95, y: 95 },
      northWest: { x: 90, y: 90 },
      northEast: { x: 100, y: 90 },
      southWest: { x: 90, y: 100 },
      southEast: { x: 100, y: 100 },
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
        0,
        {},
        CollisionState.NEUTRAL,
        placementShadow
      );
      expect(item.drop([], playground)).toBe(true);
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
        0,
        {},
        CollisionState.NEUTRAL
      );
      expect(item.drop([], playground)).toBe(false);
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
        0,
        {},
        CollisionState.NEUTRAL,
        placementShadow
      );
      item.drop([], playground);

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
        0,
        {},
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
        0,
        {},
        CollisionState.NEUTRAL,
        placementShadow
      );

      const itemList: IItem[] = [];
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
        0,
        {},
        CollisionState.NEUTRAL,
        placementShadow
      );

      testItem.drop([], playground);

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
        offset: { x: 0, y: 0 },
        northWest: { x: 0, y: 0 },
        northEast: { x: 1000, y: 0 },
        southWest: { x: 0, y: 1000 },
        southEast: { x: 1000, y: 1000 },
      };
      const testItem = new PlaceableItem(
        'collision item',
        v4(),
        0,
        0,
        1000,
        1000,
        1000,
        0,
        {},
        CollisionState.NEUTRAL,
        placementShadow
      );

      const items: IItem[] = [];
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
        offset: { x: 0, y: 0 },
        northWest: { x: 0, y: 0 },
        northEast: { x: 1000, y: 0 },
        southWest: { x: 0, y: 1000 },
        southEast: { x: 1000, y: 1000 },
      };
      const testItem = new PlaceableItem(
        'collision item',
        v4(),
        0,
        0,
        1000,
        1000,
        1000,
        0,
        {},
        CollisionState.CONFLICTED,
        placementShadow
      );

      const items: IItem[] = [];
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
        0,
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

  describe('#rotate', () => {
    it('rotates from 0 to 90 to 180 to 270 and back to 0 degrees', () => {
      const item = new PotItem('Item 1', '123', 10, 10, 100, 200, 0);
      expect(item.rotation).toEqual(0);

      item.rotate();
      expect(item.rotation).toEqual(90);
      expect(item.width).toEqual(200);
      expect(item.length).toEqual(100);

      item.rotate();
      expect(item.rotation).toEqual(180);
      expect(item.width).toEqual(100);
      expect(item.length).toEqual(200);

      item.rotate();
      expect(item.rotation).toEqual(270);
      expect(item.width).toEqual(200);
      expect(item.length).toEqual(100);

      item.rotate();
      expect(item.rotation).toEqual(0);
      expect(item.width).toEqual(100);
      expect(item.length).toEqual(200);
    });
  });

  describe('#opacity', () => {
    it('returns a lighter value when being dragged', () => {
      const item = new PlaceableItem('foo');
      item.placementShadow = {
        x: 1,
        y: 2,
        width: 3,
        length: 4,
        height: 7,
        collisionState: CollisionState.NEUTRAL,
        offset: { x: 1, y: 2 },
        northWest: { x: 1, y: 2 },
        northEast: { x: 1, y: 2 },
        southWest: { x: 1, y: 2 },
        southEast: { x: 1, y: 2 },
      };
      expect(
        item.opacity({
          [Layer.CEILING]: true,
          [Layer.FLOOR]: true,
          [Layer.BOTH]: true,
        })
      ).toBe(0.2);
    });
    it('returns a stronger value when at rest', () => {
      const item = new PlaceableItem('foo');
      expect(
        item.opacity({
          [Layer.CEILING]: true,
          [Layer.FLOOR]: true,
          [Layer.BOTH]: true,
        })
      ).toBe(1);
    });
    it('returns a lighter value when the item is not on the selected plane of existence', () => {
      const item = new PlaceableItem('foo');
      expect(
        item.opacity({
          [Layer.CEILING]: true,
          [Layer.FLOOR]: false,
          [Layer.BOTH]: true,
        })
      ).toBe(0.2);
    });
  });
});
