import { v4 } from 'uuid';
import PlaceableItem from '../item/placeableItem';

import Room from '../room';
import {
  itemHasVerticalOrientation,
  itemIsAlignedWithBottomWall,
  itemIsAlignedWithLeftWall,
  itemIsAlignedWithRightWall,
  itemIsAlignedWithTopWall,
  itemIsBetweenLeftAndRightWall,
  itemIsBetweenTopAndBottomWall,
} from './geometry';

// 100x100x100 room, placed at { x: 0; y: 0 }
const room = new Room(100, 100, 100);
describe('itemIsAlignedWithBottomWall', () => {
  it('returns true when item straddles y-coordinates of bottom wall', () => {
    // 20x20x20 window, placed at { x: 20; y: 90 }s
    const item = new PlaceableItem('Window', v4(), 20, 90, 20, 20, 20);

    expect(itemIsAlignedWithBottomWall(item, room)).toBe(true);
  });

  it('returns false when item does not straddle y-coordinate of bottom wall', () => {
    // 20x20x20 window, placed at { x: 20; y: 110 }
    const window: PlaceableItem = new PlaceableItem(
      'Window',
      v4(),
      20,
      110,
      20,
      20,
      20
    );
    expect(itemIsAlignedWithBottomWall(window, room)).toBe(false);
  });
});

describe('itemIsAlignedWithTopWall', () => {
  it('returns true when item straddles y-coordinates of top wall', () => {
    // 20x20x20 window, placed at { x: 20; y: -5}
    const item = new PlaceableItem('Window', v4(), 20, -5, 20, 20, 20);

    expect(itemIsAlignedWithTopWall(item, room)).toBe(true);
  });
  it('returns false when item does not straddle y-coordinates of top wall', () => {
    // 20x20x20 window, placed at { x: 20; y: 5 }
    const item = new PlaceableItem('Window', v4(), 20, 5, 20, 20, 20);

    expect(itemIsAlignedWithTopWall(item, room)).toBe(false);
  });
});

describe('itemIsAlignedWithLeftWall', () => {
  it('returns true when item straddles x-coordinates of left wall', () => {
    // 20x20x20 window, placed at { x: -5; y: 0}
    const item = new PlaceableItem('Window', v4(), -5, 0, 20, 20, 20);

    expect(itemIsAlignedWithLeftWall(item, room)).toBe(true);
  });
  it('returns false when item does not straddle x-coordinates of left wall', () => {
    // 20x20x20 window, placed at { x: 5; y: 0 }
    const item = new PlaceableItem('Window', v4(), 5, 0, 20, 20, 20);

    expect(itemIsAlignedWithLeftWall(item, room)).toBe(false);
  });
});

describe('itemIsAlignedWithRightWall', () => {
  it('returns true when item straddles x-coordinates of right wall', () => {
    // 20x20x20 window, placed at { x: 95; y: 0}
    const item = new PlaceableItem('Window', v4(), 95, 0, 20, 20, 20);

    expect(itemIsAlignedWithRightWall(item, room)).toBe(true);
  });
  it('returns false when item does not straddle x-coordinates of right wall', () => {
    // 20x20x20 window, placed at { x: 5; y: 0 }
    const item = new PlaceableItem('Window', v4(), 5, 0, 20, 20, 20);

    expect(itemIsAlignedWithRightWall(item, room)).toBe(false);
  });
});

describe('itemHasVerticalOrientation', () => {
  it('returns true when length > width', () => {
    // width=10, length=20
    const item = new PlaceableItem('item', v4(), 10, 10, 10, 20);
    expect(itemHasVerticalOrientation(item)).toBe(true);
  });
  it('returns false when length < width', () => {
    // width=20, length=10
    const item = new PlaceableItem('item', v4(), 10, 10, 20, 10);
    expect(itemHasVerticalOrientation(item)).toBe(false);
  });
});

describe('itemHasHorizontalOrientation', () => {
  it('returns true when length > width', () => {
    // width=10, length=20
    const item = new PlaceableItem('item', v4(), 10, 10, 10, 20);
    expect(itemHasVerticalOrientation(item)).toBe(true);
  });
  it('returns false when length < width', () => {
    // width=20, length=10
    const item = new PlaceableItem('item', v4(), 10, 10, 20, 10);
    expect(itemHasVerticalOrientation(item)).toBe(false);
  });
});

describe('itemIsBetweenLeftAndRightWall', () => {
  it('returns true if first item is contained within left and right bounds of the second item', () => {
    // 20x20x20 window, placed at { x: 5; y: 0 }
    const window: PlaceableItem = new PlaceableItem(
      'Window',
      v4(),
      5,
      0,
      20,
      20,
      20
    );

    expect(itemIsBetweenLeftAndRightWall(window, room)).toBe(true);
  });

  it('returns false if first item straddles the left boundary', () => {
    // 20x20x20 window, placed at { x: -5; y: 0 }
    const window: PlaceableItem = new PlaceableItem(
      'Window',
      v4(),
      -5,
      0,
      20,
      20,
      20
    );

    expect(itemIsBetweenLeftAndRightWall(window, room)).toBe(false);
  });

  it('returns false if first item straddles the right boundary', () => {
    // 20x20x20 window, placed at { x: 95; y: 0 }
    const window: PlaceableItem = new PlaceableItem(
      'Window',
      v4(),
      95,
      0,
      20,
      20,
      20
    );

    expect(itemIsBetweenLeftAndRightWall(window, room)).toBe(false);
  });

  it('returns false if first item is outside the left/right bounds', () => {
    // 20x20x20 window, placed at { x: 105; y: 0 }
    const window: PlaceableItem = new PlaceableItem(
      'Window',
      v4(),
      105,
      0,
      20,
      20,
      20
    );

    expect(itemIsBetweenLeftAndRightWall(window, room)).toBe(false);
  });
});

describe('itemIsBetweenTopAndBottomWall', () => {
  it('returns true if first item is contained within top and bottom bounds of the second item', () => {
    // 20x20x20 window, placed at { x: 5; y: 5 }
    const window: PlaceableItem = new PlaceableItem(
      'Window',
      v4(),
      5,
      5,
      20,
      20,
      20
    );

    expect(itemIsBetweenTopAndBottomWall(window, room)).toBe(true);
  });

  it('returns false if first item straddles the top boundary', () => {
    // 20x20x20 window, placed at { x: 0; y: -5 }
    const window: PlaceableItem = new PlaceableItem(
      'Window',
      v4(),
      0,
      -5,
      20,
      20,
      20
    );

    expect(itemIsBetweenTopAndBottomWall(window, room)).toBe(false);
  });

  it('returns false if first item straddles the bottom boundary', () => {
    // 20x20x20 window, placed at { x: 0; y: 95 }
    const window: PlaceableItem = new PlaceableItem(
      'Window',
      v4(),
      0,
      95,
      20,
      20,
      20
    );

    expect(itemIsBetweenTopAndBottomWall(window, room)).toBe(false);
  });

  it('returns false if first item is outside the top/bottom bounds', () => {
    // 20x20x20 window, placed at { x: 0; y: 105 }
    const window: PlaceableItem = new PlaceableItem(
      'Window',
      v4(),
      0,
      105,
      20,
      20,
      20
    );

    expect(itemIsBetweenTopAndBottomWall(window, room)).toBe(false);
  });
});
