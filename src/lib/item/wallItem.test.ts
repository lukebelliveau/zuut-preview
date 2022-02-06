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

  describe('needsRotation', () => {
    const room = new Room(100, 100, 100);
    it('returns false when horizontal inside Room and not colliding with any walls', () => {
      // horizontally-oriented window, placed at { x: 5; y: 5 }
      const window = new WallItem('Window', v4(), 5, 5, 20, 5);
      expect(window.needsRotation(room)).toBe(false);
    });
    it('returns false when vertical inside Room and not colliding with any walls', () => {
      // vertically-oriented window, placed at { x: 5; y: 5 }
      const window = new WallItem('Window', v4(), 5, 5, 5, 20);
      expect(window.needsRotation(room)).toBe(false);
    });
    it('returns false when horizontal outside Room and not colliding with any walls', () => {
      // horizontally-oriented window, placed at { x: -30; y: -30 }
      const window = new WallItem('Window', v4(), -30, -30, 20, 5);
      expect(window.needsRotation(room)).toBe(false);
    });

    it("returns true when horizontal & colliding with the Room's left wall", () => {
      // horizontally-oriented window, placed at { x: -5; y: 5 }
      const window = new WallItem('Window', v4(), -5, 5, 20, 5);
      expect(window.needsRotation(room)).toBe(true);
    });
    it("returns true when horizontal & colliding with the Room's right wall", () => {
      // horizontally-oriented window, placed at { x: 95; y: 5 }
      const window = new WallItem('Window', v4(), 95, 5, 20, 5);
      expect(window.needsRotation(room)).toBe(true);
    });
    it("returns true when vertical & colliding with the Room's bottom wall", () => {
      // horizontally-oriented window, placed at { x: 5; y: 95 }
      const window = new WallItem('Window', v4(), 5, 95, 5, 20);
      expect(window.needsRotation(room)).toBe(true);
    });
    it("returns true when vertical & colliding with the Room's top wall", () => {
      // horizontally-oriented window, placed at { x: 5; y: -5 }
      const window = new WallItem('Window', v4(), 5, -5, 5, 20);
      expect(window.needsRotation(room)).toBe(true);
    });
    it("returns false when vertical & colliding with the Room's left wall", () => {
      // vertically-oriented window, placed at { x: -5; y: 5 }
      const window = new WallItem('Window', v4(), -5, 5, 5, 20);
      expect(window.needsRotation(room)).toBe(false);
    });
    it("returns false when vertical & colliding with the Room's right wall", () => {
      // vertically-oriented window, placed at { x: 95; y: 5 }
      const window = new WallItem('Window', v4(), 95, 5, 5, 20);
      expect(window.needsRotation(room)).toBe(false);
    });
    it("returns false when horizontal & colliding with the Room's bottom wall", () => {
      // horizontally-oriented window, placed at { x: 5; y: 95 }
      const window = new WallItem('Window', v4(), 5, 95, 20, 5);
      expect(window.needsRotation(room)).toBe(false);
    });
    it("returns false when horizontal & colliding with the Room's top wall", () => {
      // horizontally-oriented window, placed at { x: 5; y: -5 }
      const window = new WallItem('Window', v4(), 5, -5, 20, 5);
      expect(window.needsRotation(room)).toBe(false);
    });
  });
});
