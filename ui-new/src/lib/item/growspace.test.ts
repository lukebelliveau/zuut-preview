import { feetToMm } from '../conversions';
import DuctItem from './ductItem';
import Tent from './tentItem';
import GrowspaceItem from './growspaceItem';
import { CollisionState } from './placeableItem';

describe('Growspace', () => {
  describe('#collisionStateBetween', () => {
    it('conflicts with other growspaces', () => {
      const growspace = new Tent({
        name: '',
        id: '1',
        x: feetToMm(100),
        y: feetToMm(100),
        width: feetToMm(100),
        length: feetToMm(100),
        amazonProducts: [],
        selectedAmazonASIN: '',
        linkedASINs: [],
      });
      const other = new Tent({
        name: '',
        id: '2',
        x: feetToMm(100),
        y: feetToMm(100),
        width: feetToMm(100),
        length: feetToMm(100),
        amazonProducts: [],
        selectedAmazonASIN: '',
        linkedASINs: [],
      });
      expect(growspace.collisionStateBetween(growspace, other)).toBe(CollisionState.CONFLICTED);
    });
    it('does not conflict with growspace items when item is placed inside growspace', () => {
      const growspace = new Tent({
        name: '',
        id: '2',
        x: feetToMm(1001),
        y: feetToMm(1001),
        width: feetToMm(1001),
        length: feetToMm(1001),
        amazonProducts: [],
        selectedAmazonASIN: '',
        linkedASINs: [],
      });
      const item = new GrowspaceItem({
        name: '',
        id: '1',
        x: feetToMm(100),
        y: feetToMm(100),
        width: feetToMm(100),
        length: feetToMm(100),
        amazonProducts: [],
        selectedAmazonASIN: '',
        linkedASINs: [],
      });
      expect(growspace.collisionStateBetween(growspace, item)).toBe(CollisionState.NEUTRAL);
    });
    it('does not conflict with ducts', () => {
      const growspace = new Tent({
        name: '',
        id: '1',
        x: feetToMm(1001),
        y: feetToMm(1001),
        width: feetToMm(1001),
        length: feetToMm(1001),
        amazonProducts: [],
        selectedAmazonASIN: '',
        linkedASINs: [],
      });
      const duct = new DuctItem({
        name: '',
        id: '2',
        x: feetToMm(950),
        y: feetToMm(950),
        width: feetToMm(2000),
        length: feetToMm(2000),
        amazonProducts: [],
        selectedAmazonASIN: '',
        linkedASINs: [],
      });

      expect(growspace.collisionStateBetween(growspace, duct)).toBe(CollisionState.NEUTRAL);
    });
    it('conflicts when GrowspaceItem is on growspace boundary', () => {
      const growspace = new Tent({
        name: '',
        id: '1',
        x: feetToMm(950),
        y: feetToMm(950),
        width: feetToMm(100),
        length: feetToMm(100),
        amazonProducts: [],
        selectedAmazonASIN: '',
        linkedASINs: [],
      });
      const item = new GrowspaceItem({
        name: '',
        id: '2',
        x: feetToMm(1001),
        y: feetToMm(1001),
        width: feetToMm(1001),
        length: feetToMm(1001),
        amazonProducts: [],
        selectedAmazonASIN: '',
        linkedASINs: [],
      });
      expect(growspace.collisionStateBetween(growspace, item)).toBe(CollisionState.CONFLICTED);
    });
  });
});
