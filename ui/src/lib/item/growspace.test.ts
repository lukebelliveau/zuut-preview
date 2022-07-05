import { feetToMm } from '../conversions';
import DuctItem from './ductItem';
import Growspace from './growspace';
import GrowspaceItem from './growspaceItem';
import { CollisionState } from './placeableItem';

describe('Growspace', () => {
  describe('#collisionStateBetween', () => {
    it('conflicts with other growspaces', () => {
      const growspace = new Growspace({
        name: '',
        id: '1',
        x: feetToMm(100),
        y: feetToMm(100),
        width: feetToMm(100),
        length: feetToMm(100),
      });
      const other = new Growspace({
        name: '',
        id: '2',
        x: feetToMm(100),
        y: feetToMm(100),
        width: feetToMm(100),
        length: feetToMm(100),
      });
      expect(growspace.collisionStateBetween(growspace, other)).toBe(
        CollisionState.CONFLICTED
      );
    });
    it('does not conflict with growspace items when item is placed inside growspace', () => {
      const growspace = new Growspace({
        name: '',
        id: '2',
        x: feetToMm(1001),
        y: feetToMm(1001),
        width: feetToMm(1001),
        length: feetToMm(1001),
      });
      const item = new GrowspaceItem({
        name: '',
        id: '1',
        x: feetToMm(100),
        y: feetToMm(100),
        width: feetToMm(100),
        length: feetToMm(100),
      });
      expect(growspace.collisionStateBetween(growspace, item)).toBe(
        CollisionState.NEUTRAL
      );
    });
    it('does not conflict with ducts', () => {
      const growspace = new Growspace({
        name: '',
        id: '1',
        x: feetToMm(1001),
        y: feetToMm(1001),
        width: feetToMm(1001),
        length: feetToMm(1001),
      });
      const duct = new DuctItem({
        name: '',
        id: '2',
        x: feetToMm(950),
        y: feetToMm(950),
        width: feetToMm(2000),
        length: feetToMm(2000),
      });

      expect(growspace.collisionStateBetween(growspace, duct)).toBe(
        CollisionState.NEUTRAL
      );
    });
    it('conflicts when GrowspaceItem is on growspace boundary', () => {
      const growspace = new Growspace({
        name: '',
        id: '1',
        x: feetToMm(950),
        y: feetToMm(950),
        width: feetToMm(100),
        length: feetToMm(100),
      });
      const item = new GrowspaceItem({
        name: '',
        id: '2',
        x: feetToMm(1001),
        y: feetToMm(1001),
        width: feetToMm(1001),
        length: feetToMm(1001),
      });
      expect(growspace.collisionStateBetween(growspace, item)).toBe(
        CollisionState.CONFLICTED
      );
    });
  });
});
