import { v4 } from 'uuid';
import { feetToMm } from '../conversions';
import { IItem } from '../item';
import Plan from '../plan';
import Playground from '../playground';
import PlaceableItem, { CollisionState } from './placeableItem';
import WallItem from './wallItem';
import { closeTo } from '../../../tests/closeTo';

describe('WallItem', () => {
  describe('drag', () => {
    const plan = new Plan('square', feetToMm(100), feetToMm(100), feetToMm(12));
    const playground = new Playground(1_000, 1_000, undefined, plan);

    describe('item horizontally oriented', () => {
      const horizontalWallItem = new WallItem({
        name: 'wall',
        id: v4(),
        x: feetToMm(0),
        y: feetToMm(0),
        width: feetToMm(10),
        length: feetToMm(1),
        height: feetToMm(100),
        amazonProducts: undefined,
      });

      it('rotates and aligns placementShadow when the closest wall is the left wall', () => {
        const items: IItem[] = [];
        items.push(horizontalWallItem);

        horizontalWallItem.drag({ x: feetToMm(10), y: feetToMm(50) }, items, playground);

        expect(horizontalWallItem.placementShadow).toMatchObject({
          x: closeTo(feetToMm(-0.5)),
          y: feetToMm(50),
          length: horizontalWallItem.width,
          width: horizontalWallItem.length,
          height: horizontalWallItem.height,
          collisionState: CollisionState.NEUTRAL,
        });
      });

      it('rotates and aligns placementShadow when the closest wall is the right wall', () => {
        const items: IItem[] = [];
        items.push(horizontalWallItem);

        horizontalWallItem.drag({ x: feetToMm(90), y: feetToMm(50) }, items, playground);

        expect(horizontalWallItem.placementShadow).toMatchObject({
          x: closeTo(feetToMm(99.5)),
          y: feetToMm(50),
          length: horizontalWallItem.width,
          width: horizontalWallItem.length,
          height: horizontalWallItem.height,
          collisionState: CollisionState.NEUTRAL,
        });
      });

      it('aligns placementShadow without rotation when the closest wall is the bottom wall', () => {
        const items: IItem[] = [];
        items.push(horizontalWallItem);

        horizontalWallItem.drag({ x: feetToMm(50), y: feetToMm(90) }, items, playground);

        expect(horizontalWallItem.placementShadow).toMatchObject({
          x: feetToMm(50),
          y: closeTo(feetToMm(99.5)),
          length: horizontalWallItem.length,
          width: horizontalWallItem.width,
          height: horizontalWallItem.height,
          collisionState: CollisionState.NEUTRAL,
        });
      });

      it('aligns placementShadow without rotation when the closest wall is the top wall', () => {
        const items: IItem[] = [];
        items.push(horizontalWallItem);

        horizontalWallItem.drag({ x: feetToMm(50), y: feetToMm(10) }, items, playground);

        expect(horizontalWallItem.placementShadow).toMatchObject({
          x: feetToMm(50),
          y: closeTo(feetToMm(-0.5)),
          length: horizontalWallItem.length,
          width: horizontalWallItem.width,
          height: horizontalWallItem.height,
          collisionState: CollisionState.NEUTRAL,
        });
      });
    });

    describe('item vertically oriented', () => {
      const verticalWallItem = new WallItem({
        name: 'wall',
        id: v4(),
        x: feetToMm(0),
        y: feetToMm(0),
        width: feetToMm(1),
        length: feetToMm(10),
        height: feetToMm(100),
        amazonProducts: undefined,
      });

      it('aligns placementShadow without rotation when the closest wall is the left wall', () => {
        const items: IItem[] = [];
        items.push(verticalWallItem);

        verticalWallItem.drag({ x: feetToMm(10), y: feetToMm(50) }, items, playground);

        expect(verticalWallItem.placementShadow).toMatchObject({
          x: closeTo(feetToMm(-0.5)),
          y: feetToMm(50),
          length: verticalWallItem.length,
          width: verticalWallItem.width,
          height: verticalWallItem.height,
          collisionState: CollisionState.NEUTRAL,
        });
      });

      it('aligns placementShadow without rotation when the closest wall is the right wall', () => {
        const items: IItem[] = [];
        items.push(verticalWallItem);

        verticalWallItem.drag({ x: feetToMm(90), y: feetToMm(50) }, items, playground);

        expect(verticalWallItem.placementShadow).toMatchObject({
          x: closeTo(feetToMm(99.5)),
          y: closeTo(feetToMm(50)),
          length: verticalWallItem.length,
          width: verticalWallItem.width,
          height: verticalWallItem.height,
          collisionState: CollisionState.NEUTRAL,
        });
      });

      it('aligns and rotates placementShadow when the closest wall is the bottom wall', () => {
        const items: IItem[] = [];
        items.push(verticalWallItem);

        verticalWallItem.drag({ x: feetToMm(50), y: feetToMm(90) }, items, playground);

        expect(verticalWallItem.placementShadow).toMatchObject({
          x: feetToMm(50),
          y: closeTo(feetToMm(99.5)),
          length: verticalWallItem.width,
          width: verticalWallItem.length,
          height: verticalWallItem.height,
          collisionState: CollisionState.NEUTRAL,
        });
      });

      it('aligns and rotates placementShadow when the closest wall is the top wall', () => {
        const items: IItem[] = [];
        const verticalWallItem = new WallItem({
          name: 'wall',
          id: v4(),
          x: feetToMm(0),
          y: feetToMm(0),
          width: feetToMm(1),
          length: feetToMm(10),
          height: feetToMm(100),
          amazonProducts: undefined,
        });
        items.push(verticalWallItem);

        verticalWallItem.drag({ x: feetToMm(50), y: feetToMm(10) }, items, playground);

        expect(verticalWallItem.placementShadow).toMatchObject({
          x: feetToMm(50),
          y: closeTo(feetToMm(-0.5)),
          length: verticalWallItem.width,
          width: verticalWallItem.length,
          height: verticalWallItem.height,
          collisionState: CollisionState.NEUTRAL,
        });
      });
    });
  });

  describe('#createPlacementShadowOnClosestWall', () => {
    const plan = new Plan('square', feetToMm(100), feetToMm(100), feetToMm(12));
    const playground = new Playground(1_000, 1_000, undefined, plan);

    describe('perpendicular & colliding with bottom wall', () => {
      // { x: 50, y: 90 width: 10, length: 50 }
      const item = new WallItem({
        name: 'Window',
        id: v4(),
        x: feetToMm(50),
        y: feetToMm(90),
        width: feetToMm(10),
        length: feetToMm(50),
        amazonProducts: undefined,
      });
      it('creates a placementShadow rotated & straddling the Room`s bottom wall', () => {
        const placementShadow = item.createPlacementShadowOnClosestWall(playground);

        expect(placementShadow.width).toBe(item.length);
        expect(placementShadow.length).toBe(item.width);
        expect(placementShadow.x).toBe(item.x);
        expect(placementShadow.y).toBe(feetToMm(95));
      });
    });

    describe('perpendicular & colliding with top wall', () => {
      // { x: 50, y: -10 width: 10, length: 50 }
      const item = new WallItem({
        name: 'Window',
        id: v4(),
        x: feetToMm(50),
        y: feetToMm(-10),
        width: feetToMm(10),
        length: feetToMm(50),
        amazonProducts: undefined,
      });
      it('creates a placementShadow rotated & straddling the Room`s top wall', () => {
        const placementShadow = item.createPlacementShadowOnClosestWall(playground);

        expect(placementShadow.width).toBe(item.length);
        expect(placementShadow.length).toBe(item.width);
        expect(placementShadow.x).toBe(item.x);
        expect(placementShadow.y).toBe(feetToMm(-5));
      });
    });

    describe('perpendicular & colliding with left wall', () => {
      // { x: 50, y: -10 width: 10, length: 50 }
      const item = new WallItem({
        name: 'Window',
        id: v4(),
        x: feetToMm(-10),
        y: feetToMm(10),
        width: feetToMm(50),
        length: feetToMm(10),
        amazonProducts: undefined,
      });
      it('creates a placementShadow rotated & straddling the Room`s left wall', () => {
        const placementShadow = item.createPlacementShadowOnClosestWall(playground);

        expect(placementShadow.width).toBe(item.length);
        expect(placementShadow.length).toBe(item.width);
        expect(placementShadow.x).toBe(feetToMm(-5));
        expect(placementShadow.y).toBe(item.y);
      });
    });

    describe('perpendicular & colliding with right wall', () => {
      const item = new WallItem({
        name: 'Window',
        id: v4(),
        x: feetToMm(95),
        y: feetToMm(10),
        width: feetToMm(50),
        length: feetToMm(10),
        amazonProducts: undefined,
      });
      it('creates a placementShadow rotated & straddling the Room`s right wall', () => {
        const placementShadow = item.createPlacementShadowOnClosestWall(playground);

        expect(placementShadow.width).toBe(item.length);
        expect(placementShadow.length).toBe(item.width);
        expect(placementShadow.x).toBe(feetToMm(95));
        expect(placementShadow.y).toBe(item.y);
      });
    });
  });
});
