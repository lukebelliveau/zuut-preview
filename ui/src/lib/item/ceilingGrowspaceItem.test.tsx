import Growspace from './growspace';
import CeilingGrowspaceItem from './ceilingGrowspaceItem';
import GrowspaceItem from './growspaceItem';
import { CollisionState } from './placeableItem';
import { assert } from 'console';

describe('CeilingGrowspaceItem', () => {
  it('conflicts with other CeilingGrowspaceItems', () => {
    const item = new CeilingGrowspaceItem('', '1', 100, 100, 100, 100);
    const other = new CeilingGrowspaceItem('', '2', 100, 100, 100, 100);
    expect(item.collisionStateBetween(item, other)).toBe(
      CollisionState.CONFLICTED
    );
  });
  it('does not conflict with GrowspaceItems', () => {
    const item = new CeilingGrowspaceItem('', '1', 100, 100, 100, 100);
    const other = new GrowspaceItem('', '2', 100, 100, 100, 100);
    expect(item.collisionStateBetween(item, other)).toBe(
      CollisionState.NEUTRAL
    );
  });
  it('does not conflict with growspaces', () => {
    const item = new Growspace('', '1', 100, 100, 100, 100);
    const other = new CeilingGrowspaceItem('', '2', 1001, 1001, 1001, 1001);
    expect(item.collisionStateBetween(item, other)).toBe(
      CollisionState.NEUTRAL
    );
  });
  it('conflicts if straddling left growspace boundary', () => {
    const item = new CeilingGrowspaceItem('', '2', -50, 500, 100, 100);
    const other = new Growspace('', '1', 0, 0, 1000, 1000);
    expect(item.collisionStateBetween(item, other)).toBe(
      CollisionState.CONFLICTED
    );
  });
  it('conflicts if straddling right growspace boundary', () => {
    const item = new CeilingGrowspaceItem('', '2', 950, 500, 200, 200);
    const other = new Growspace('', '1', 500, 500, 1000, 1000);

    expect(item.collisionStateBetween(item, other)).toBe(
      CollisionState.CONFLICTED
    );
  });
  it('conflicts if straddling bottom growspace boundary', () => {
    const item = new CeilingGrowspaceItem('', '2', 500, 1000, 100, 100);
    const other = new Growspace('', '1', 500, 500, 1000, 1000);

    expect(item.collisionStateBetween(item, other)).toBe(
      CollisionState.CONFLICTED
    );
  });
  it('conflicts if straddling top growspace boundary', () => {
    const item = new CeilingGrowspaceItem('', '2', 500, -50, 100, 100);
    const other = new Growspace('', '1', 0, 0, 1000, 1000);
    expect(item.collisionStateBetween(item, other)).toBe(
      CollisionState.CONFLICTED
    );
  });
});
