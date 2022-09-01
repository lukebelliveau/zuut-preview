import { feetToMm } from '../conversions';
import CeilingGrowspaceItem from './ceilingGrowspaceItem';
import Tent from './tentItem';
import GrowspaceItem from './growspaceItem';
import { CollisionState } from './placeableItem';

describe('GrowspaceItem', () => {
  describe('#isCollidingWith', () => {
    it('conflicts with other growspace items', () => {
      const item = new GrowspaceItem({
        name: '',
        id: '1',
        x: feetToMm(100),
        y: feetToMm(100),
        width: feetToMm(100),
        length: feetToMm(100),
      });
      const other = new GrowspaceItem({
        name: '',
        id: '2',
        x: feetToMm(100),
        y: feetToMm(100),
        width: feetToMm(100),
        length: feetToMm(100),
      });
      expect(item.collisionStateBetween(item, other)).toBe(
        CollisionState.CONFLICTED
      );
    });
    it('does not conflict with CeilingGrowspaceItems', () => {
      const item = new GrowspaceItem({
        name: '',
        id: '1',
        x: 100,
        y: 100,
        width: 100,
        length: 100,
      });
      const other = new CeilingGrowspaceItem({
        name: '',
        id: '2',
        x: 100,
        y: 100,
        width: 100,
        length: 100,
      });
      expect(item.collisionStateBetween(item, other)).toBe(
        CollisionState.NEUTRAL
      );
    });
    it('does not conflict with growspaces', () => {
      const item = new Tent({
        name: '',
        id: '1',
        x: feetToMm(100),
        y: 100,
        width: 100,
        length: 100,
      });
      const other = new GrowspaceItem({
        name: '',
        id: '2',
        x: feetToMm(1001),
        y: feetToMm(1001),
        width: feetToMm(1001),
        length: feetToMm(1001),
      });
      expect(item.collisionStateBetween(item, other)).toBe(
        CollisionState.NEUTRAL
      );
    });
    it('conflicts if straddling left growspace boundary', () => {
      const item = new GrowspaceItem({
        name: '',
        id: '2',
        x: feetToMm(-50),
        y: feetToMm(500),
        width: feetToMm(100),
        length: feetToMm(100),
      });
      const other = new Tent({
        name: '',
        id: '1',
        x: feetToMm(0),
        y: feetToMm(0),
        width: feetToMm(1000),
        length: feetToMm(1000),
      });
      expect(item.collisionStateBetween(item, other)).toBe(
        CollisionState.CONFLICTED
      );
    });
    it('conflicts if straddling right growspace boundary', () => {
      const item = new GrowspaceItem({
        name: '',
        id: '2',
        x: feetToMm(1000),
        y: feetToMm(500),
        width: feetToMm(100),
        length: feetToMm(100),
      });
      const other = new Tent({
        name: '',
        id: '1',
        x: feetToMm(500),
        y: feetToMm(500),
        width: feetToMm(1000),
        length: feetToMm(1000),
      });
      expect(item.collisionStateBetween(item, other)).toBe(
        CollisionState.CONFLICTED
      );
    });
    it('conflicts if straddling bottom growspace boundary', () => {
      const item = new GrowspaceItem({
        name: '',
        id: '2',
        x: feetToMm(500),
        y: feetToMm(1000),
        width: feetToMm(100),
        length: feetToMm(100),
      });
      const other = new Tent({
        name: '',
        id: '1',
        x: feetToMm(500),
        y: feetToMm(500),
        width: feetToMm(1000),
        length: feetToMm(1000),
      });

      expect(item.collisionStateBetween(item, other)).toBe(
        CollisionState.CONFLICTED
      );
    });
    it('conflicts if straddling top growspace boundary', () => {
      const item = new GrowspaceItem({
        name: '',
        id: '2',
        x: feetToMm(500),
        y: feetToMm(-50),
        width: feetToMm(100),
        length: feetToMm(100),
      });
      const other = new Tent({
        name: '',
        id: '1',
        x: feetToMm(0),
        y: feetToMm(0),
        width: feetToMm(1000),
        length: feetToMm(1000),
      });
      expect(item.collisionStateBetween(item, other)).toBe(
        CollisionState.CONFLICTED
      );
    });
  });
});
