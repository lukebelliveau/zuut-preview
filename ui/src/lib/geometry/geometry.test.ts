import { v4 } from 'uuid';
import PlaceableItem from '../item/placeableItem';

import Room from '../room';
import {
  areColliding,
  isStraddlingBoundary,
  itemHasVerticalOrientation,
  itemIsAlignedWithBottomWall,
  itemIsAlignedWithLeftWall,
  itemIsAlignedWithRightWall,
  itemIsAlignedWithTopWall,
  itemIsBetweenLeftAndRightWall,
  itemIsBetweenTopAndBottomWall,
  placedOnBottomBoundary,
  placedOnLeftBoundary,
  placedOnRightBoundary,
  placedOnTopBoundary,
  rotated90Degrees,
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

describe('rotated90Degrees', () => {
  it('swaps length and width', () => {
    const item = {
      x: 5,
      y: 10,
      width: 20,
      length: 30,
      height: 40,
    };

    const rotated = rotated90Degrees(item);

    expect(rotated).toStrictEqual({
      x: 5,
      y: 10,
      width: 30,
      length: 20,
      height: 40,
    });
  });
});

describe('placeOnBottomBoundary', () => {
  it('adjusts y-coordinate so first item straddles bottom boundary of second item', () => {
    const item1 = {
      x: 50,
      y: 91,
      length: 10,
      height: 10,
      width: 10,
    };
    const item2 = {
      x: 0,
      y: 0,
      length: 100,
      height: 100,
      width: 100,
    };

    const placedOnBottom = placedOnBottomBoundary(item1, item2);

    expect(placedOnBottom.y).toBe(95);
  });
});

describe('placeOnTopBoundary', () => {
  it('adjusts y-coordinate so first item straddles bottom boundary of second item', () => {
    const item1 = {
      x: 50,
      y: -1,
      length: 10,
      height: 10,
      width: 10,
    };
    const item2 = {
      x: 0,
      y: 0,
      length: 100,
      height: 100,
      width: 100,
    };

    const placedOnBottom = placedOnTopBoundary(item1, item2);

    expect(placedOnBottom.y).toBe(-5);
  });
});

describe('placeOnLeftBoundary', () => {
  it('adjusts x-coordinate so first item straddles left boundary of second item', () => {
    const item1 = {
      x: -2,
      y: 50,
      length: 10,
      height: 10,
      width: 10,
    };
    const item2 = {
      x: 0,
      y: 0,
      length: 100,
      height: 100,
      width: 100,
    };

    const placedOnBottom = placedOnLeftBoundary(item1, item2);

    expect(placedOnBottom.x).toBe(-5);
  });
});

describe('placeOnRightBoundary', () => {
  it('adjusts x-coordinate so first item straddles right boundary of second item', () => {
    const item1 = {
      x: 97,
      y: 50,
      length: 10,
      height: 10,
      width: 10,
    };
    const item2 = {
      x: 0,
      y: 0,
      length: 100,
      height: 100,
      width: 100,
    };

    const placedOnBottom = placedOnRightBoundary(item1, item2);

    expect(placedOnBottom.x).toBe(95);
  });
});

describe('areColliding', () => {
  it('returns false if other item is outside of the current item', () => {
    const item = new PlaceableItem('', '1', 100, 100, 100, 100);
    const other = new PlaceableItem('', '2', 1001, 1001, 1001, 1001);
    expect(areColliding(item, other)).toBe(false);
  });
  it('returns false if only the borders overlap', () => {
    const item = new PlaceableItem('', '1', 100, 100, 100, 100);
    const otherRight = new PlaceableItem('', '2', 200, 100, 100, 100);
    expect(areColliding(item, otherRight)).toBe(false);
    const otherBelow = new PlaceableItem('', '3', 100, 200, 100, 100);
    expect(areColliding(item, otherBelow)).toBe(false);
    const otherLeft = new PlaceableItem('', '4', 0, 100, 100, 100);
    expect(areColliding(item, otherLeft)).toBe(false);
    const otherTop = new PlaceableItem('', '5', 100, 0, 100, 100);
    expect(areColliding(item, otherTop)).toBe(false);
  });
  it('returns true if other item is in the northeast corner', () => {
    const item = new PlaceableItem('', '1', 100, 100, 10, 10);
    const other = new PlaceableItem('', '2', 99, 91, 10, 10);
    expect(areColliding(item, other)).toBe(true);
  });
  it('returns true if other item is in the southeast corner', () => {
    const item = new PlaceableItem('', '1', 100, 100, 10, 10);
    const other = new PlaceableItem('', '2', 99, 109, 10, 10);
    expect(areColliding(item, other)).toBe(true);
  });
  it('returns true if other item is in the southwest corner', () => {
    const item = new PlaceableItem('', '1', 100, 100, 10, 10);
    const other = new PlaceableItem('', '2', 91, 109, 10, 10);
    expect(areColliding(item, other)).toBe(true);
  });
  it('returns true if other item is in the northwest corner', () => {
    const item = new PlaceableItem('', '1', 100, 100, 10, 10);
    const other = new PlaceableItem('', '2', 91, 91, 10, 10);
    expect(areColliding(item, other)).toBe(true);
  });
});

describe('isStraddlingBoundary', () => {
  it('returns false if item is enclosed inside other item', () => {
    const item = new PlaceableItem('', '1', 50, 50, 10, 10);
    const other = new PlaceableItem('', '2', 0, 0, 100, 100);
    expect(isStraddlingBoundary(item, other)).toBe(false);
  });
  it('returns false if item is outside other item', () => {
    const item = new PlaceableItem('', '1', 150, 150, 10, 10);
    const other = new PlaceableItem('', '2', 0, 0, 100, 100);
    expect(isStraddlingBoundary(item, other)).toBe(false);
  });
  it('returns true if item straddles left boundary', () => {
    const item = new PlaceableItem('', '1', -5, -5, 10, 10);
    const other = new PlaceableItem('', '2', 0, 0, 100, 100);
    expect(isStraddlingBoundary(item, other)).toBe(true);
  });
  it('returns true if item straddles right boundary', () => {
    const item = new PlaceableItem('', '1', 95, 95, 10, 10);
    const other = new PlaceableItem('', '2', 0, 0, 100, 100);
    expect(isStraddlingBoundary(item, other)).toBe(true);
  });
  it('returns true if item straddles top boundary', () => {
    const item = new PlaceableItem('', '1', 50, -5, 10, 10);
    const other = new PlaceableItem('', '2', 0, 0, 100, 100);
    expect(isStraddlingBoundary(item, other)).toBe(true);
  });
  it('returns true if item straddles bottom boundary', () => {
    const item = new PlaceableItem('', '1', 50, 95, 10, 10);
    const other = new PlaceableItem('', '2', 0, 0, 100, 100);
    expect(isStraddlingBoundary(item, other)).toBe(true);
  });
  it('returns true if item straddles northeast corner', () => {
    const item = new PlaceableItem('', '1', 95, -5, 10, 10);
    const other = new PlaceableItem('', '2', 0, 0, 100, 100);
    expect(isStraddlingBoundary(item, other)).toBe(true);
  });
  it('returns true if item straddles northwest corner', () => {
    const item = new PlaceableItem('', '1', -5, -5, 10, 10);
    const other = new PlaceableItem('', '2', 0, 0, 100, 100);
    expect(isStraddlingBoundary(item, other)).toBe(true);
  });
  it('returns true if item straddles southeast corner', () => {
    const item = new PlaceableItem('', '1', 95, 95, 10, 10);
    const other = new PlaceableItem('', '2', 0, 0, 100, 100);
    expect(isStraddlingBoundary(item, other)).toBe(true);
  });
  it('returns true if item straddles southwest corner', () => {
    const item = new PlaceableItem('', '1', -5, 95, 10, 10);
    const other = new PlaceableItem('', '2', 0, 0, 100, 100);
    expect(isStraddlingBoundary(item, other)).toBe(true);
  });
  it('returns true if item straddles left wall and shares a top boundary with other item', () => {
    const item = new PlaceableItem('', '1', -5, 0, 10, 10);
    const other = new PlaceableItem('', '2', 0, 0, 100, 100);
    expect(isStraddlingBoundary(item, other)).toBe(true);
  });
  it('returns true if item straddles left wall and shares a bottom boundary with other item', () => {
    const item = new PlaceableItem('', '1', -5, 90, 10, 10);
    const other = new PlaceableItem('', '2', 0, 0, 100, 100);
    expect(isStraddlingBoundary(item, other)).toBe(true);
  });
  it('returns true if item straddles right wall and shares a top boundary with other item', () => {
    const item = new PlaceableItem('', '1', 95, 0, 10, 10);
    const other = new PlaceableItem('', '2', 0, 0, 100, 100);
    expect(isStraddlingBoundary(item, other)).toBe(true);
  });
  it('returns true if item straddles right wall and shares a bottom boundary with other item', () => {
    const item = new PlaceableItem('', '1', 95, 90, 10, 10);
    const other = new PlaceableItem('', '2', 0, 0, 100, 100);
    expect(isStraddlingBoundary(item, other)).toBe(true);
  });
  it('returns true if item straddles top wall and shares a left boundary with other item', () => {
    const item = new PlaceableItem('', '1', 0, -5, 10, 10);
    const other = new PlaceableItem('', '2', 0, 0, 100, 100);
    expect(isStraddlingBoundary(item, other)).toBe(true);
  });
  it('returns true if item straddles top wall and shares a right boundary with other item', () => {
    const item = new PlaceableItem('', '1', 90, -5, 10, 10);
    const other = new PlaceableItem('', '2', 0, 0, 100, 100);
    expect(isStraddlingBoundary(item, other)).toBe(true);
  });
  it('returns true if item straddles bottom wall and shares a left boundary with other item', () => {
    const item = new PlaceableItem('', '1', 0, 95, 10, 10);
    const other = new PlaceableItem('', '2', 0, 0, 100, 100);
    expect(isStraddlingBoundary(item, other)).toBe(true);
  });
  it('returns true if item straddles bottom wall and shares a right boundary with other item', () => {
    const item = new PlaceableItem('', '1', 90, 95, 10, 10);
    const other = new PlaceableItem('', '2', 0, 0, 100, 100);
    expect(isStraddlingBoundary(item, other)).toBe(true);
  });
});
