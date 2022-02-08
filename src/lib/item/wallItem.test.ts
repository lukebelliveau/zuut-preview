import { v4 } from 'uuid';
import ItemList from '../itemList';
import Plan from '../plan';
import Playground from '../playground';
import PlaceableItem from './placeableItem';
import WallItem from './wallItem';

describe('WallItem', () => {
  describe('place', () => {
    it('sets position to coordinates given', () => {
      const window: PlaceableItem = new WallItem('Window', v4(), 10, 20);
      const items: ItemList = new ItemList();
      window.place({ x: 100, y: 200 });

      expect(window.x).toBe(100);
      expect(window.y).toBe(200);
    });
  });

  describe('handleRotation', () => {
    const plan = new Plan('square', 100, 100, 12);
    const playground = new Playground(1_000, 1_000, undefined, plan);
    it('removes placementShadow if no invalid collisions', () => {
      const item = new WallItem('Window', v4(), 50, 50, 10, 10, 10);
      item.handleRotation(playground);

      expect(item.placementShadow).toBeUndefined();
    });

    describe('perpendicular & colliding with bottom wall', () => {
      // { x: 50, y: 90 width: 10, length: 50 }
      const item = new WallItem('Window', v4(), 50, 90, 10, 50);
      it('creates a placementShadow rotated & straddling the Room`s bottom wall', () => {
        item.handleRotation(playground);

        expect(item.placementShadow?.width).toBe(item.length);
        expect(item.placementShadow?.length).toBe(item.width);
        expect(item.placementShadow?.x).toBe(item.x);
        expect(item.placementShadow?.y).toBe(95);
      });
    });

    describe('perpendicular & colliding with top wall', () => {
      // { x: 50, y: -10 width: 10, length: 50 }
      const item = new WallItem('Window', v4(), 50, -10, 10, 50);
      it('creates a placementShadow rotated & straddling the Room`s bottom wall', () => {
        item.handleRotation(playground);

        expect(item.placementShadow?.width).toBe(item.length);
        expect(item.placementShadow?.length).toBe(item.width);
        expect(item.placementShadow?.x).toBe(item.x);
        expect(item.placementShadow?.y).toBe(-5);
      });
    });

    describe('perpendicular & colliding with left wall', () => {
      // { x: 50, y: -10 width: 10, length: 50 }
      const item = new WallItem('Window', v4(), -10, 10, 50, 10);
      it('creates a placementShadow rotated & straddling the Room`s bottom wall', () => {
        item.handleRotation(playground);

        expect(item.placementShadow?.width).toBe(item.length);
        expect(item.placementShadow?.length).toBe(item.width);
        expect(item.placementShadow?.x).toBe(-5);
        expect(item.placementShadow?.y).toBe(item.y);
      });
    });

    describe('perpendicular & colliding with right wall', () => {
      // { x: 50, y: -10 width: 10, length: 50 }
      const item = new WallItem('Window', v4(), 90, 10, 50, 10);
      it('creates a placementShadow rotated & straddling the Room`s bottom wall', () => {
        item.handleRotation(playground);

        expect(item.placementShadow?.width).toBe(item.length);
        expect(item.placementShadow?.length).toBe(item.width);
        expect(item.placementShadow?.x).toBe(95);
        expect(item.placementShadow?.y).toBe(item.y);
      });
    });
  });
});
