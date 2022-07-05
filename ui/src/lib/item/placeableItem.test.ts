import { isTupleTypeNode } from 'typescript';
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
        const soilItem = new ModifierItem({
          name: 'soil',
          amazonProducts: undefined,
        });
        const placeableItem = new PlaceableItem({
          name: 'item',
          id: v4(),
          amazonProducts: undefined,
        });

        placeableItem.addModifier(soilItem);
      }).toThrow();
    });
    it('adds a soil modifier when there are no modifiers', () => {
      const soilItem = new ModifierItem({ name: 'soil' });
      const placeableItem = new PlaceableItem({
        name: 'item',
        id: v4(),
        x: feetToMm(0),
        y: feetToMm(0),
        width: feetToMm(100),
        length: feetToMm(100),
        height: feetToMm(100),
        description: '',
        rotation: 0,
        modifiers: { soil: [] },
      });

      placeableItem.addModifier(soilItem);

      expect(placeableItem.modifiers.soil.length).toBe(1);
      expect(placeableItem.modifiers.soil[0]).toBe(soilItem.id);
    });

    it('adds an additional soil modifier', () => {
      const soilItem1 = new ModifierItem({ name: 'soil' });
      const soilItem2 = new ModifierItem({ name: 'soil' });
      const placeableItem = new PlaceableItem({
        name: 'item',
        id: v4(),
        x: feetToMm(0),
        y: feetToMm(0),
        width: feetToMm(100),
        length: feetToMm(100),
        height: feetToMm(100),
        description: '',
        rotation: 0,
        modifiers: { soil: [] },
      });

      placeableItem.addModifier(soilItem1);
      placeableItem.addModifier(soilItem2);

      expect(placeableItem.modifiers.soil.length).toBe(2);
      expect(placeableItem.modifiers.soil[0]).toBe(soilItem1.id);
      expect(placeableItem.modifiers.soil[1]).toBe(soilItem2.id);
    });

    it('adds multiple types of modifiers', () => {
      const soilItem = new ModifierItem({ name: 'soil' });
      const bambooItem = new ModifierItem({ name: 'bamboo' });
      const placeableItem = new PlaceableItem({
        name: 'item',
        id: v4(),
        x: feetToMm(0),
        y: feetToMm(0),
        width: feetToMm(100),
        length: feetToMm(100),
        height: feetToMm(100),
        description: '',
        rotation: 0,
        modifiers: { soil: [], bamboo: [] },
      });

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
      const item = new PlaceableItem({
        name: 'item',
        id: v4(),
        x: 0,
        y: 0,
        width: 10,
        length: 20,
      });
      item.place({ x: 99, y: 99 });

      expect(item.x).toBe(99);
      expect(item.y).toBe(99);
    });
  });

  describe('drag', () => {
    const plan = new Plan('square', 10_000, 10_000, 12);
    const playground = new Playground(1_000, 1_000, undefined, plan);

    it("sets an item's position", () => {
      const item = new PlaceableItem({
        name: 'item',
        id: v4(),
        x: 0,
        y: 0,
        width: 10,
        length: 20,
      });
      item.drag({ x: 99, y: 99 }, [], playground);

      expect(item.x).toBe(99);
      expect(item.y).toBe(99);
    });

    it('creates a placement shadow based on snapped position and item dimensions', () => {
      const item = new PlaceableItem({
        name: 'item',
        id: v4(),
        x: 0,
        y: 0,
        width: 10,
        length: 20,
      });
      item.drag({ x: 300, y: 600 }, [], playground);

      const { placementShadow } = item;

      expect(placementShadow).not.toBeUndefined();
      /**
       * 309.8 === 304.8 (300mm from placementShadow, normalized to 3inches) + 5 (placementShadow.width)
       * placementShadow instantiated at {x: 300, y: 600}
       * must adjust for 3inch increments, and item offset (width and height divided by two)
       *
       * so, expect(placementShadow.x).toBe === (300mm in 3inches = 304.8) + (item width / 2)
       * = 304.8 + (10 / 2)
       * = 309.8
       *
       * expect (placementShadow.y).toBe === (600mm in 3inches = 612.8) + (item length / 2)
       * = 609.6 + (20 / 2)
       * = 619.6
       */
      expect(placementShadow?.x).toBe(309.8);
      expect(placementShadow?.y).toBe(619.6);
      expect(placementShadow?.height).toBe(item.height);
      expect(placementShadow?.length).toBe(item.length);
      expect(placementShadow?.width).toBe(item.width);
    });

    it('detects collisions based on location of placement shadow', () => {
      const otherItem = new PlaceableItem({
        name: 'collidingItem',
        id: v4(),
        x: 4500,
        y: 3000,
        width: feetToMm(2),
        length: feetToMm(2),
        height: feetToMm(2),
      });

      const testItem = new PlaceableItem({
        name: 'test',
        id: v4(),
        x: 0,
        y: 0,
        width: feetToMm(2),
        length: feetToMm(2),
        height: feetToMm(2),
      });

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
      x: feetToMm(90),
      y: feetToMm(90),
      width: feetToMm(10),
      height: feetToMm(10),
      length: feetToMm(10),
      collisionState: CollisionState.NEUTRAL,
      offset: { x: feetToMm(95), y: feetToMm(95) },
      northWest: { x: feetToMm(90), y: feetToMm(90) },
      northEast: { x: feetToMm(100), y: feetToMm(90) },
      southWest: { x: feetToMm(90), y: feetToMm(100) },
      southEast: { x: feetToMm(100), y: feetToMm(100) },
    };
    const plan = new Plan('square', 10_000, 10_000, 12);
    const playground = new Playground(1_000, 1_000, undefined, plan);

    it('returns true when item has a placementShadow', () => {
      const item = new PlaceableItem({
        name: 'item',
        id: '1',
        x: 0,
        y: 0,
        width: 10,
        length: 10,
        height: 10,
        description: '',
        rotation: 0,
        modifiers: {},
        collisionState: CollisionState.NEUTRAL,
        placementShadow,
      });
      expect(item.drop([], playground)).toBe(true);
    });

    it('returns false when item has no placementShadow', () => {
      const item = new PlaceableItem({
        name: 'item',
        id: '1',
        x: 0,
        y: 0,
        width: 10,
        length: 10,
        height: 10,
        description: '',
        rotation: 0,
        modifiers: {},
        collisionState: CollisionState.NEUTRAL,
      });
      expect(item.drop([], playground)).toBe(false);
    });

    it('sets current position/dimensions to placementShadow', () => {
      const item = new PlaceableItem({
        name: 'item',
        id: '1',
        x: 0,
        y: 0,
        width: 10,
        length: 10,
        height: 10,
        description: '',
        rotation: 0,
        modifiers: {},
        collisionState: CollisionState.NEUTRAL,
        placementShadow,
      });
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
      const collidingItem = new PlaceableItem({
        name: 'collidingItem',
        id: v4(),
        x: feetToMm(85),
        y: feetToMm(85),
        width: feetToMm(10),
        length: feetToMm(10),
        height: feetToMm(10),
        description: '',
        rotation: 0,
        modifiers: {},
        collisionState: CollisionState.NEUTRAL,
      });
      // does not currently collide with collidingItem, but has a placementShadow that does
      const testItem = new PlaceableItem({
        name: 'testItem',
        id: v4(),
        x: feetToMm(0),
        y: feetToMm(0),
        width: feetToMm(10),
        length: feetToMm(10),
        height: feetToMm(10),
        description: '',
        rotation: 0,
        modifiers: {},
        collisionState: CollisionState.NEUTRAL,
        placementShadow,
      });

      const itemList: IItem[] = [];
      itemList.push(testItem);
      itemList.push(collidingItem);

      testItem.drop(itemList, playground);

      expect(testItem.collisionState).toBe(CollisionState.CONFLICTED);
    });

    it('removes placementShadow from item on drop', () => {
      const testItem = new PlaceableItem({
        name: 'testItem',
        id: v4(),
        x: 0,
        y: 0,
        width: 10,
        length: 10,
        height: 10,
        description: '',
        rotation: 0,
        modifiers: {},
        collisionState: CollisionState.NEUTRAL,
        placementShadow,
      });

      testItem.drop([], playground);

      expect(testItem.placementShadow).toBeUndefined();
    });
  });

  describe('updateCollisions', () => {
    const plan = new Plan('square', feetToMm(10_000), feetToMm(10_000), 12);
    const playground = new Playground(1_000, 1_000, undefined, plan);
    it('sets collisionState=BAD to item and item.placementShadow when collisions occur', () => {
      const collisionItem = new PlaceableItem({
        name: 'collision item',
        id: v4(),
        x: 0,
        y: 0,
        width: 1000,
        length: 1000,
      });
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
      const testItem = new PlaceableItem({
        name: 'collision item',
        id: v4(),
        x: 0,
        y: 0,
        width: 1000,
        length: 1000,
        height: 1000,
        description: '',
        rotation: 0,
        modifiers: {},
        collisionState: CollisionState.NEUTRAL,
        placementShadow,
      });

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

    it('has collisionState=CONFLICTED if it is not a WallItem and straddles a wall of the plan', () => {
      const testItem = new PlaceableItem({
        name: 'collision item',
        id: v4(),
        x: feetToMm(0),
        y: feetToMm(0),
        width: feetToMm(1000),
        length: feetToMm(1000),
        height: feetToMm(1000),
        description: '',
        rotation: 0,
        modifiers: {},
        collisionState: CollisionState.NEUTRAL,
      });
      const playground = new Playground(1_000, 1_000, undefined, plan);
      const items: IItem[] = [];
      items.push(testItem);
      testItem.updateCollisions(items, playground);

      expect(testItem.collisionState).toBe(CollisionState.CONFLICTED);
    });

    it('assigns collisionState=GOOD to item and item.placementShadow when no collisions', () => {
      const noCollisionItem = new PlaceableItem({
        name: 'collision item',
        id: v4(),
        x: feetToMm(150),
        y: feetToMm(150),
        width: feetToMm(50),
        length: feetToMm(50),
      });
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
      const testItem = new PlaceableItem({
        name: 'test item',
        id: v4(),
        x: feetToMm(100),
        y: feetToMm(100),
        width: feetToMm(50),
        length: feetToMm(50),
        height: feetToMm(1000),
        description: '',
        rotation: 0,
        modifiers: {},
        collisionState: CollisionState.CONFLICTED,
        placementShadow,
      });

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
      const item = new PlaceableItem({
        name: '',
        id: '1',
        x: feetToMm(100),
        y: feetToMm(100),
        length: feetToMm(100),
        width: feetToMm(100),
      });
      const other = new PlaceableItem({
        name: '',
        id: '2',
        x: feetToMm(1001),
        y: feetToMm(1001),
        length: feetToMm(1001),
        width: feetToMm(1001),
      });
      expect(item.collisionStateBetween(item, other)).toBe(
        CollisionState.NEUTRAL
      );
    });
    it('returns neutral if only the borders overlap', () => {
      const item = new PlaceableItem({
        name: '',
        id: '1',
        x: feetToMm(100),
        y: feetToMm(100),
        length: feetToMm(100),
        width: feetToMm(100),
      });
      const otherRight = new PlaceableItem({
        name: '',
        id: '2',
        x: feetToMm(200),
        y: feetToMm(100),
        length: feetToMm(100),
        width: feetToMm(100),
      });
      expect(item.collisionStateBetween(item, otherRight)).toBe(
        CollisionState.NEUTRAL
      );
      const otherBelow = new PlaceableItem({
        name: '',
        id: '3',
        x: feetToMm(100),
        y: feetToMm(200),
        length: feetToMm(100),
        width: feetToMm(100),
      });
      expect(item.collisionStateBetween(item, otherBelow)).toBe(
        CollisionState.NEUTRAL
      );
      const otherLeft = new PlaceableItem({
        name: '',
        id: '4',
        x: feetToMm(0),
        y: feetToMm(100),
        length: feetToMm(100),
        width: feetToMm(100),
      });
      expect(item.collisionStateBetween(item, otherLeft)).toBe(
        CollisionState.NEUTRAL
      );
      const otherTop = new PlaceableItem({
        name: '',
        id: '5',
        x: feetToMm(100),
        y: feetToMm(0),
        width: feetToMm(100),
        length: feetToMm(0),
        collisionState: CollisionState.NEUTRAL,
      });
      expect(item.collisionStateBetween(item, otherTop)).toBe(
        CollisionState.NEUTRAL
      );
    });
    it('returns true if other item is in the northeast corner', () => {
      const item = new PlaceableItem({
        name: '',
        id: '1',
        x: feetToMm(100),
        y: feetToMm(100),
        length: feetToMm(10),
        width: feetToMm(10),
      });
      const other = new PlaceableItem({
        name: '',
        id: '2',
        x: feetToMm(99),
        y: feetToMm(91),
        length: feetToMm(10),
        width: feetToMm(10),
      });
      expect(item.collisionStateBetween(item, other)).toBe(
        CollisionState.CONFLICTED
      );
    });
    it('returns true if other item is in the southeast corner', () => {
      const item = new PlaceableItem({
        name: '',
        id: '1',
        x: feetToMm(100),
        y: feetToMm(100),
        length: feetToMm(10),
        width: feetToMm(10),
      });
      const other = new PlaceableItem({
        name: '',
        id: '2',
        x: feetToMm(99),
        y: feetToMm(109),
        length: feetToMm(10),
        width: feetToMm(10),
      });
      expect(item.collisionStateBetween(item, other)).toBe(
        CollisionState.CONFLICTED
      );
    });
    it('returns true if other item is in the southwest corner', () => {
      const item = new PlaceableItem({
        name: '',
        id: '1',
        x: feetToMm(100),
        y: feetToMm(100),
        length: feetToMm(10),
        width: feetToMm(10),
      });
      const other = new PlaceableItem({
        name: '',
        id: '2',
        x: feetToMm(91),
        y: feetToMm(109),
        length: feetToMm(10),
        width: feetToMm(10),
      });
      expect(item.collisionStateBetween(item, other)).toBe(
        CollisionState.CONFLICTED
      );
    });
    it('returns true if other item is in the northwest corner', () => {
      const item = new PlaceableItem({
        name: '',
        id: '1',
        x: feetToMm(100),
        y: feetToMm(100),
        length: feetToMm(10),
        width: feetToMm(10),
      });
      const other = new PlaceableItem({
        name: '',
        id: '2',
        x: feetToMm(91),
        y: feetToMm(91),
        length: feetToMm(10),
        width: feetToMm(10),
      });
      expect(item.collisionStateBetween(item, other)).toBe(
        CollisionState.CONFLICTED
      );
    });
  });

  describe('#createDefaultPlacementShadow', () => {
    it("creates a placementShadow with the item's dimensions and snapped coordinates", () => {
      const plan = new Plan('square', 10_000, 10_000, 12);
      const playground = new Playground(1_000, 1_000, undefined, plan);
      const item = new PlaceableItem({
        name: 'item',
        id: v4(),
        x: 0,
        y: 0,
        width: 10,
        length: 20,
      });

      const placementShadow = item.createDefaultPlacementShadow(
        { x: 300, y: 600 },
        playground
      );

      /**
       * 309.8 === 304.8 (300mm from placementShadow, normalized to 3inches) + 5 (placementShadow.width)
       * placementShadow instantiated at {x: 300, y: 600}
       * must adjust for 3inch increments, and item offset (width and height divided by two)
       *
       * so, expect(placementShadow.x).toBe === (300mm in 3inches = 304.8) + (item width / 2)
       * = 304.8 + (10 / 2)
       * = 309.8
       *
       * expect (placementShadow.y).toBe === (600mm in 3inches = 612.8) + (item length / 2)
       * = 609.6 + (20 / 2)
       * = 619.6
       */
      expect(placementShadow.x).toBe(309.8);
      expect(placementShadow.y).toBe(619.6);
      expect(placementShadow.height).toBe(item.height);
      expect(placementShadow.length).toBe(item.length);
      expect(placementShadow.width).toBe(item.width);
    });
  });

  describe('#rotate', () => {
    it('rotates from 0 to 90 to 180 to 270 and back to 0 degrees', () => {
      const item = new PotItem({
        name: 'Item 1',
        id: '123',
        x: 10,
        y: 10,
        width: 100,
        length: 200,
        height: 0,
      });
      expect(item.rotation).toEqual(0);

      item.rotate();
      expect(item.rotation).toEqual(90);

      item.rotate();
      expect(item.rotation).toEqual(180);

      item.rotate();
      expect(item.rotation).toEqual(270);

      item.rotate();
      expect(item.rotation).toEqual(0);
    });
  });

  describe('#opacity', () => {
    it('returns a lighter value when being dragged', () => {
      const item = new PlaceableItem({ name: 'foo' });
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
      const item = new PlaceableItem({ name: 'foo' });
      expect(
        item.opacity({
          [Layer.CEILING]: true,
          [Layer.FLOOR]: true,
          [Layer.BOTH]: true,
        })
      ).toBe(1);
    });
    it('returns a lighter value when the item is not on the selected plane of existence', () => {
      const item = new PlaceableItem({ name: 'foo' });
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
