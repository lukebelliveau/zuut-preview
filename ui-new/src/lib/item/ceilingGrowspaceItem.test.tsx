import Tent from './tentItem';
import CeilingGrowspaceItem from './ceilingGrowspaceItem';
import GrowspaceItem from './growspaceItem';
import { CollisionState } from './placeableItem';
import { assert } from 'console';
import { feetToMm } from '../conversions';

describe('CeilingGrowspaceItem', () => {
  it('conflicts with other CeilingGrowspaceItems', () => {
    const item = new CeilingGrowspaceItem({
      name: '',
      id: '1',
      x: feetToMm(100),
      y: feetToMm(100),
      width: feetToMm(100),
      length: feetToMm(100),
    });
    const other = new CeilingGrowspaceItem({
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
  it('does not conflict with GrowspaceItems', () => {
    const item = new CeilingGrowspaceItem({
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
      CollisionState.NEUTRAL
    );
  });
  it('does not conflict with growspaces', () => {
    const item = new Tent({
      name: '',
      id: '1',
      x: feetToMm(100),
      y: feetToMm(100),
      width: feetToMm(100),
      length: feetToMm(100),
    });
    const other = new CeilingGrowspaceItem({
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
    const item = new CeilingGrowspaceItem({
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
    const item = new CeilingGrowspaceItem({
      name: '',
      id: '2',
      x: feetToMm(950),
      y: feetToMm(500),
      width: feetToMm(200),
      length: feetToMm(200),
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
    const item = new CeilingGrowspaceItem({
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
    const item = new CeilingGrowspaceItem({
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
