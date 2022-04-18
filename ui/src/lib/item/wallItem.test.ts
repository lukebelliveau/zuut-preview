import { v4 } from 'uuid';
import { IItem } from '../item';
import Plan from '../plan';
import Playground from '../playground';
import PlaceableItem, { CollisionState } from './placeableItem';
import WallItem from './wallItem';

describe('WallItem', () => {
  describe('drag', () => {
    const plan = new Plan('square', 100, 100, 12);
    const playground = new Playground(1_000, 1_000, undefined, plan);

    describe('item horizontally oriented', () => {
      const horizontalWallItem = new WallItem('wall', v4(), 0, 0, 10, 1, 100);

      it('rotates and aligns placementShadow when the closest wall is the left wall', () => {
        const items: IItem[] = [];
        items.push(horizontalWallItem);

        horizontalWallItem.drag({ x: 10, y: 50 }, items, playground);

        expect(horizontalWallItem.placementShadow).toMatchObject({
          x: -0.5,
          y: 50,
          length: horizontalWallItem.width,
          width: horizontalWallItem.length,
          height: horizontalWallItem.height,
          collisionState: CollisionState.NEUTRAL,
        });
      });

      it('rotates and aligns placementShadow when the closest wall is the right wall', () => {
        const items: IItem[] = [];
        items.push(horizontalWallItem);

        horizontalWallItem.drag({ x: 90, y: 50 }, items, playground);

        expect(horizontalWallItem.placementShadow).toMatchObject({
          x: 99.5,
          y: 50,
          length: horizontalWallItem.width,
          width: horizontalWallItem.length,
          height: horizontalWallItem.height,
          collisionState: CollisionState.NEUTRAL,
        });
      });

      it('aligns placementShadow without rotation when the closest wall is the bottom wall', () => {
        const items: IItem[] = [];
        items.push(horizontalWallItem);

        horizontalWallItem.drag({ x: 50, y: 90 }, items, playground);

        expect(horizontalWallItem.placementShadow).toMatchObject({
          x: 50,
          y: 99.5,
          length: horizontalWallItem.length,
          width: horizontalWallItem.width,
          height: horizontalWallItem.height,
          collisionState: CollisionState.NEUTRAL,
        });
      });

      it('aligns placementShadow without rotation when the closest wall is the top wall', () => {
        const items: IItem[] = [];
        items.push(horizontalWallItem);

        horizontalWallItem.drag({ x: 50, y: 10 }, items, playground);

        expect(horizontalWallItem.placementShadow).toMatchObject({
          x: 50,
          y: -0.5,
          length: horizontalWallItem.length,
          width: horizontalWallItem.width,
          height: horizontalWallItem.height,
          collisionState: CollisionState.NEUTRAL,
        });
      });
    });

    describe('item vertically oriented', () => {
      const verticalWallItem = new WallItem('wall', v4(), 0, 0, 1, 10, 100);

      it('aligns placementShadow without rotation when the closest wall is the left wall', () => {
        const items: IItem[] = [];
        items.push(verticalWallItem);

        verticalWallItem.drag({ x: 10, y: 50 }, items, playground);

        expect(verticalWallItem.placementShadow).toMatchObject({
          x: -0.5,
          y: 50,
          length: verticalWallItem.length,
          width: verticalWallItem.width,
          height: verticalWallItem.height,
          collisionState: CollisionState.NEUTRAL,
        });
      });

      it('aligns placementShadow without rotation when the closest wall is the right wall', () => {
        const items: IItem[] = [];
        items.push(verticalWallItem);

        verticalWallItem.drag({ x: 90, y: 50 }, items, playground);

        expect(verticalWallItem.placementShadow).toMatchObject({
          x: 99.5,
          y: 50,
          length: verticalWallItem.length,
          width: verticalWallItem.width,
          height: verticalWallItem.height,
          collisionState: CollisionState.NEUTRAL,
        });
      });

      it('aligns and rotates placementShadow when the closest wall is the bottom wall', () => {
        const items: IItem[] = [];
        items.push(verticalWallItem);

        verticalWallItem.drag({ x: 50, y: 90 }, items, playground);

        expect(verticalWallItem.placementShadow).toMatchObject({
          x: 50,
          y: 99.5,
          length: verticalWallItem.width,
          width: verticalWallItem.length,
          height: verticalWallItem.height,
          collisionState: CollisionState.NEUTRAL,
        });
      });

      it('aligns and rotates placementShadow when the closest wall is the top wall', () => {
        const items: IItem[] = [];
        items.push(verticalWallItem);

        verticalWallItem.drag({ x: 50, y: 10 }, items, playground);

        expect(verticalWallItem.placementShadow).toMatchObject({
          x: 50,
          y: -0.5,
          length: verticalWallItem.width,
          width: verticalWallItem.length,
          height: verticalWallItem.height,
          collisionState: CollisionState.NEUTRAL,
        });
      });
    });
  });

  describe('#createPlacementShadowOnClosestWall', () => {
    const plan = new Plan('square', 100, 100, 12);
    const playground = new Playground(1_000, 1_000, undefined, plan);

    describe('perpendicular & colliding with bottom wall', () => {
      // { x: 50, y: 90 width: 10, length: 50 }
      const item = new WallItem('Window', v4(), 50, 90, 10, 50);
      it('creates a placementShadow rotated & straddling the Room`s bottom wall', () => {
        const placementShadow =
          item.createPlacementShadowOnClosestWall(playground);

        expect(placementShadow.width).toBe(item.length);
        expect(placementShadow.length).toBe(item.width);
        expect(placementShadow.x).toBe(item.x);
        expect(placementShadow.y).toBe(95);
      });
    });

    describe('perpendicular & colliding with top wall', () => {
      // { x: 50, y: -10 width: 10, length: 50 }
      const item = new WallItem('Window', v4(), 50, -10, 10, 50);
      it('creates a placementShadow rotated & straddling the Room`s top wall', () => {
        const placementShadow =
          item.createPlacementShadowOnClosestWall(playground);

        expect(placementShadow.width).toBe(item.length);
        expect(placementShadow.length).toBe(item.width);
        expect(placementShadow.x).toBe(item.x);
        expect(placementShadow.y).toBe(-5);
      });
    });

    describe('perpendicular & colliding with left wall', () => {
      // { x: 50, y: -10 width: 10, length: 50 }
      const item = new WallItem('Window', v4(), -10, 10, 50, 10);
      it('creates a placementShadow rotated & straddling the Room`s left wall', () => {
        const placementShadow =
          item.createPlacementShadowOnClosestWall(playground);

        expect(placementShadow.width).toBe(item.length);
        expect(placementShadow.length).toBe(item.width);
        expect(placementShadow.x).toBe(-5);
        expect(placementShadow.y).toBe(item.y);
      });
    });

    describe('perpendicular & colliding with right wall', () => {
      const item = new WallItem('Window', v4(), 95, 10, 50, 10);
      it('creates a placementShadow rotated & straddling the Room`s right wall', () => {
        const placementShadow =
          item.createPlacementShadowOnClosestWall(playground);

        expect(placementShadow.width).toBe(item.length);
        expect(placementShadow.length).toBe(item.width);
        expect(placementShadow.x).toBe(95);
        expect(placementShadow.y).toBe(item.y);
      });
    });
  });
});
