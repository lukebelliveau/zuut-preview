import { v4 } from 'uuid';
import ItemList from '../itemList';
import Room from '../room';
import PlaceableItem from './placeableItem';
import WallItem from './wallItem';

describe('WallItem', () => {
  describe('setPosition without playground', () => {
    it('sets position when no playground provided', () => {
      const window: PlaceableItem = new WallItem('Window', v4(), 10, 20);
      const items: ItemList = new ItemList();
      window.setPosition({ x: 100, y: 200 }, items);

      expect(window.x).toBe(100);
      expect(window.y).toBe(200);
    });
  });

  describe('handleRotation', () => {
    const room = new Room(100, 100, 100);
    it('removes placementShadow if no invalid collisions', () => {
      const item = new WallItem('Window', v4(), 50, 50, 10, 10, 10);
      item.handleRotation(room);

      expect(item.placementShadow).toBeUndefined();
    });

    describe('perpendicular & colliding with bottom wall', () => {
      // { x: 50, y: 90 width: 10, length: 50 }
      const item = new WallItem('Window', v4(), 50, 90, 10, 50);
      it('creates a placementShadow rotated & straddling the Room`s bottom wall', () => {
        item.handleRotation(room);

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
        item.handleRotation(room);

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
        item.handleRotation(room);

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
        item.handleRotation(room);

        expect(item.placementShadow?.width).toBe(item.length);
        expect(item.placementShadow?.length).toBe(item.width);
        expect(item.placementShadow?.x).toBe(95);
        expect(item.placementShadow?.y).toBe(item.y);
      });
    });
  });
});
