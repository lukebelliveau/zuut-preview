import { feetToMm } from '../conversions';
import DuctItem from './ductItem';
import Growspace from './growspace';
import GrowspaceItem from './growspaceItem';
import { CollisionState } from './placeableItem';

describe('Growspace', () => {
  describe('#collisionStateBetween', () => {
    it('conflicts with other growspaces', () => {
      const growspace = new Growspace(
        '',
        '1',
        feetToMm(100),
        feetToMm(100),
        feetToMm(100),
        feetToMm(100)
      );
      const other = new Growspace(
        '',
        '2',
        feetToMm(100),
        feetToMm(100),
        feetToMm(100),
        feetToMm(100)
      );
      expect(growspace.collisionStateBetween(growspace, other)).toBe(
        CollisionState.CONFLICTED
      );
    });
    it('does not conflict with growspace items when item is placed inside growspace', () => {
      const growspace = new Growspace(
        '',
        '2',
        feetToMm(1001),
        feetToMm(1001),
        feetToMm(1001),
        feetToMm(1001)
      );
      const item = new GrowspaceItem(
        '',
        '1',
        feetToMm(100),
        feetToMm(100),
        feetToMm(100),
        feetToMm(100)
      );
      expect(growspace.collisionStateBetween(growspace, item)).toBe(
        CollisionState.NEUTRAL
      );
    });
    it('does not conflict with ducts', () => {
      const growspace = new Growspace(
        '',
        '1',
        feetToMm(1001),
        feetToMm(1001),
        feetToMm(1001),
        feetToMm(1001)
      );
      const duct = new DuctItem(
        '',
        '2',
        feetToMm(950),
        feetToMm(950),
        feetToMm(2000),
        feetToMm(2000)
      );

      expect(growspace.collisionStateBetween(growspace, duct)).toBe(
        CollisionState.NEUTRAL
      );
    });
    it('conflicts when GrowspaceItem is on growspace boundary', () => {
      const growspace = new Growspace(
        '',
        '1',
        feetToMm(950),
        feetToMm(950),
        feetToMm(100),
        feetToMm(100)
      );
      const item = new GrowspaceItem(
        '',
        '2',
        feetToMm(1001),
        feetToMm(1001),
        feetToMm(1001),
        feetToMm(1001)
      );
      expect(growspace.collisionStateBetween(growspace, item)).toBe(
        CollisionState.CONFLICTED
      );
    });
  });
});
