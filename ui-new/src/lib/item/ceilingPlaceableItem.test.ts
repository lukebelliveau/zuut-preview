import { Layer } from '../layer';
import CeilingPlaceableItem from './ceilingPlaceableItem';
import { CollisionState } from './placeableItem';

describe('CeilingPlaceableItem', () => {
  describe('#opacity', () => {
    it('returns a lighter value when being dragged', () => {
      const item = new CeilingPlaceableItem({
        name: 'foo',
        amazonProducts: [],
        selectedAmazonASIN: '',
      });
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
      const item = new CeilingPlaceableItem({
        name: 'foo',
        amazonProducts: [],
        selectedAmazonASIN: '',
      });
      expect(
        item.opacity({
          [Layer.CEILING]: true,
          [Layer.FLOOR]: true,
          [Layer.BOTH]: true,
        })
      ).toBe(1);
    });
    it('returns a lighter value when the item is not on the selected plane of existence', () => {
      const item = new CeilingPlaceableItem({
        name: 'foo',
        amazonProducts: [],
        selectedAmazonASIN: '',
      });
      expect(
        item.opacity({
          [Layer.CEILING]: false,
          [Layer.FLOOR]: true,
          [Layer.BOTH]: true,
        })
      ).toBe(0.2);
    });
  });
});
