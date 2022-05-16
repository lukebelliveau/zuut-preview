import { v4 } from 'uuid';
import { feetToMm } from '../conversions';
import PlaceableItem, { IPlaceableItem } from '../item/placeableItem';

import Room from '../room';
import {
  areColliding,
  areExactlySharingBorder,
  GeometryObject,
  isStraddlingBoundary,
  itemHasVerticalOrientation,
  itemIsAlignedWithBottomWall,
  itemStraddlesLeftYAxis,
  itemIsAlignedWithRightWall,
  itemIsAlignedWithTopWall,
  itemIsBetweenLeftAndRightWall,
  itemIsBetweenTopAndBottomWall,
} from './geometry';

// 100x100x100 room, placed at { x: 0; y: 0 }
const room = new Room(feetToMm(100), feetToMm(100), feetToMm(100));
describe('itemIsAlignedWithBottomWall', () => {
  it('returns true when item straddles y-coordinates of bottom wall', () => {
    // 20x20x20 window, placed at { x: 20; y: 90 }s
    const item = new PlaceableItem(
      'Window',
      v4(),
      feetToMm(30),
      feetToMm(100),
      feetToMm(20),
      feetToMm(20),
      feetToMm(20)
    );

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
    const item = new PlaceableItem(
      'Window',
      v4(),
      feetToMm(20),
      feetToMm(-5),
      feetToMm(20),
      feetToMm(20),
      feetToMm(20)
    );

    expect(itemIsAlignedWithTopWall(item, room)).toBe(true);
  });
  it('returns false when item does not straddle y-coordinates of top wall', () => {
    // 20x20x20 window, placed at { x: 20; y: 5 }
    const item = new PlaceableItem(
      'Window',
      v4(),
      feetToMm(30),
      feetToMm(15),
      feetToMm(20),
      feetToMm(20),
      feetToMm(20)
    );

    expect(itemIsAlignedWithTopWall(item, room)).toBe(false);
  });
});

describe('itemIsAlignedWithLeftWall', () => {
  it('returns true when item straddles x-coordinates of left wall', () => {
    // 20x20x20 window, placed at { x: -5; y: 0}
    const item = new PlaceableItem(
      'Window',
      v4(),
      feetToMm(-5),
      feetToMm(0),
      feetToMm(20),
      feetToMm(20),
      feetToMm(20)
    );

    expect(itemStraddlesLeftYAxis(item, room)).toBe(true);
  });
  it('returns false when item does not straddle x-coordinates of left wall', () => {
    // 20x20x20 window, placed at { x: 5; y: 0 }
    const item = new PlaceableItem(
      'Window',
      v4(),
      feetToMm(15),
      feetToMm(10),
      feetToMm(20),
      feetToMm(20),
      feetToMm(20)
    );

    expect(itemStraddlesLeftYAxis(item, room)).toBe(false);
  });
});

describe('itemIsAlignedWithRightWall', () => {
  it('returns true when item straddles x-coordinates of right wall', () => {
    // 20x20x20 window, placed at { x: 95; y: 0}
    const item = new PlaceableItem(
      'Window',
      v4(),
      feetToMm(95),
      feetToMm(0),
      feetToMm(20),
      feetToMm(20),
      feetToMm(20)
    );

    expect(itemIsAlignedWithRightWall(item, room)).toBe(true);
  });
  it('returns false when item does not straddle x-coordinates of right wall', () => {
    // 20x20x20 window, placed at { x: 5; y: 0 }
    const item = new PlaceableItem(
      'Window',
      v4(),
      feetToMm(5),
      feetToMm(0),
      feetToMm(20),
      feetToMm(20),
      feetToMm(20)
    );

    expect(itemIsAlignedWithRightWall(item, room)).toBe(false);
  });
});

describe('itemHasVerticalOrientation', () => {
  it('returns true when length > width', () => {
    // width=10, length=20
    const item = new PlaceableItem(
      'item',
      v4(),
      feetToMm(10),
      feetToMm(10),
      feetToMm(10),
      feetToMm(20)
    );
    expect(itemHasVerticalOrientation(item)).toBe(true);
  });
  it('returns false when length < width', () => {
    // width=20, length=10
    const item = new PlaceableItem(
      'item',
      v4(),
      feetToMm(10),
      feetToMm(10),
      feetToMm(20),
      feetToMm(10)
    );
    expect(itemHasVerticalOrientation(item)).toBe(false);
  });
});

describe('itemHasHorizontalOrientation', () => {
  it('returns true when length > width', () => {
    // width=10, length=20
    const item = new PlaceableItem(
      'item',
      v4(),
      feetToMm(10),
      feetToMm(10),
      feetToMm(10),
      feetToMm(20)
    );
    expect(itemHasVerticalOrientation(item)).toBe(true);
  });
  it('returns false when length < width', () => {
    // width=20, length=10
    const item = new PlaceableItem(
      'item',
      v4(),
      feetToMm(10),
      feetToMm(10),
      feetToMm(20),
      feetToMm(10)
    );
    expect(itemHasVerticalOrientation(item)).toBe(false);
  });
});

describe('itemIsBetweenLeftAndRightWall', () => {
  it('returns true if first item is contained within left and right bounds of the second item', () => {
    // 20x20x20 window, placed at { x: 5; y: 0 }
    const window: PlaceableItem = new PlaceableItem(
      'Window',
      v4(),
      feetToMm(15),
      feetToMm(10),
      feetToMm(20),
      feetToMm(20),
      feetToMm(20)
    );

    expect(itemIsBetweenLeftAndRightWall(window, room)).toBe(true);
  });

  it('returns false if first item straddles the left boundary', () => {
    // 20x20x20 window, placed at { x: -5; y: 0 }
    const window: PlaceableItem = new PlaceableItem(
      'Window',
      v4(),
      feetToMm(-5),
      feetToMm(0),
      feetToMm(20),
      feetToMm(20),
      feetToMm(20)
    );

    expect(itemIsBetweenLeftAndRightWall(window, room)).toBe(false);
  });

  it('returns false if first item straddles the right boundary', () => {
    // 20x20x20 window, placed at { x: 95; y: 0 }
    const window: PlaceableItem = new PlaceableItem(
      'Window',
      v4(),
      feetToMm(95),
      feetToMm(0),
      feetToMm(20),
      feetToMm(20),
      feetToMm(20)
    );

    expect(itemIsBetweenLeftAndRightWall(window, room)).toBe(false);
  });

  it('returns false if first item is outside the left/right bounds', () => {
    // 20x20x20 window, placed at { x: 105; y: 0 }
    const window: PlaceableItem = new PlaceableItem(
      'Window',
      v4(),
      feetToMm(105),
      feetToMm(0),
      feetToMm(20),
      feetToMm(20),
      feetToMm(20)
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
      feetToMm(15),
      feetToMm(15),
      feetToMm(20),
      feetToMm(20),
      feetToMm(20)
    );

    expect(itemIsBetweenTopAndBottomWall(window, room)).toBe(true);
  });

  it('returns false if first item straddles the top boundary', () => {
    // 20x20x20 window, placed at { x: 0; y: -5 }
    const window: PlaceableItem = new PlaceableItem(
      'Window',
      v4(),
      feetToMm(0),
      feetToMm(-5),
      feetToMm(20),
      feetToMm(20),
      feetToMm(20)
    );

    expect(itemIsBetweenTopAndBottomWall(window, room)).toBe(false);
  });

  it('returns false if first item straddles the bottom boundary', () => {
    // 20x20x20 window, placed at { x: 0; y: 95 }
    const window: PlaceableItem = new PlaceableItem(
      'Window',
      v4(),
      feetToMm(0),
      feetToMm(95),
      feetToMm(20),
      feetToMm(20),
      feetToMm(20)
    );

    expect(itemIsBetweenTopAndBottomWall(window, room)).toBe(false);
  });

  it('returns false if first item is outside the top/bottom bounds', () => {
    // 20x20x20 window, placed at { x: 0; y: 105 }
    const window: PlaceableItem = new PlaceableItem(
      'Window',
      v4(),
      feetToMm(0),
      feetToMm(105),
      feetToMm(20),
      feetToMm(20),
      feetToMm(20)
    );

    expect(itemIsBetweenTopAndBottomWall(window, room)).toBe(false);
  });
});

describe('areExactlySharingBorder', () => {
  it('returns true if item exactly shares left border', () => {
    // const item: GeometryObject = {
    //   x: 50,
    //   y: 0,
    //   width: 50,
    //   length: 50,
    //   offset: { x: 25, y: 25 },
    // };

    const item: GeometryObject = {
      northWest: { x: 50, y: 0 },
      northEast: { x: 100, y: 0 },
      southWest: { x: 50, y: 50 },
      southEast: { x: 100, y: 50 },
      width: 50,
      length: 50,
    };

    // const otherItem: GeometryObject = {
    //   x: 0,
    //   y: 0,
    //   width: 50,
    //   length: 50,
    //   offset: { x: 25, y: 25 },
    // };
    const otherItem: GeometryObject = {
      northWest: { x: 0, y: 0 },
      northEast: { x: 50, y: 0 },
      southWest: { x: 0, y: 50 },
      southEast: { x: 50, y: 50 },
      width: 50,
      length: 50,
    };

    expect(areExactlySharingBorder(item, otherItem)).toBe(true);
  });

  it('returns true if item exactly shares right border', () => {
    // const item: GeometryObject = {
    //   x: 0,
    //   y: 0,
    //   width: 50,
    //   length: 50,
    //   offset: { x: 25, y: 25 },
    // };
    const item: GeometryObject = {
      northWest: { x: 0, y: 0 },
      northEast: { x: 50, y: 0 },
      southWest: { x: 0, y: 50 },
      southEast: { x: 50, y: 50 },
      width: 50,
      length: 50,
    };

    // const otherItem: GeometryObject = {
    //   x: 50,
    //   y: 0,
    //   width: 50,
    //   length: 50,
    //   offset: { x: 25, y: 25 },
    // };
    const otherItem: GeometryObject = {
      northWest: { x: 50, y: 0 },
      northEast: { x: 100, y: 0 },
      southWest: { x: 50, y: 50 },
      southEast: { x: 100, y: 50 },
      width: 50,
      length: 50,
    };

    expect(areExactlySharingBorder(item, otherItem)).toBe(true);
  });

  it('returns true if item exactly shares top border', () => {
    const item: GeometryObject = {
      northWest: { x: 0, y: 50 },
      northEast: { x: 50, y: 50 },
      southWest: { x: 0, y: 100 },
      southEast: { x: 50, y: 100 },
      width: 50,
      length: 50,
    };

    const otherItem: GeometryObject = {
      northWest: { x: 0, y: 0 },
      northEast: { x: 50, y: 0 },
      southWest: { x: 0, y: 50 },
      southEast: { x: 50, y: 50 },
      width: 50,
      length: 50,
    };

    expect(areExactlySharingBorder(item, otherItem)).toBe(true);
  });

  it('returns true if item exactly shares bottom border', () => {
    const item: GeometryObject = {
      northWest: { x: 0, y: 0 },
      northEast: { x: 50, y: 0 },
      southWest: { x: 0, y: 50 },
      southEast: { x: 50, y: 50 },
      width: 50,
      length: 50,
    };

    const otherItem: GeometryObject = {
      northWest: { x: 0, y: 50 },
      northEast: { x: 50, y: 50 },
      southWest: { x: 0, y: 100 },
      southEast: { x: 50, y: 100 },
      width: 50,
      length: 50,
    };

    expect(areExactlySharingBorder(item, otherItem)).toBe(true);
  });

  it('returns false if items are not touching', () => {
    const item: GeometryObject = {
      northWest: { x: 0, y: 0 },
      northEast: { x: 50, y: 0 },
      southWest: { x: 0, y: 50 },
      southEast: { x: 50, y: 50 },
      width: 50,
      length: 50,
    };

    const otherItem: GeometryObject = {
      northWest: { x: 100, y: 0 },
      northEast: { x: 150, y: 0 },
      southWest: { x: 100, y: 50 },
      southEast: { x: 150, y: 50 },
      width: 50,
      length: 50,
    };

    expect(areExactlySharingBorder(item, otherItem)).toBe(false);
  });

  it('returns false if items are colliding', () => {
    const item: GeometryObject = {
      northWest: { x: 0, y: 0 },
      northEast: { x: 50, y: 0 },
      southWest: { x: 0, y: 50 },
      southEast: { x: 50, y: 50 },
      width: 50,
      length: 50,
    };

    const otherItem: GeometryObject = {
      northWest: { x: 25, y: 25 },
      northEast: { x: 75, y: 25 },
      southWest: { x: 25, y: 75 },
      southEast: { x: 75, y: 75 },
      width: 50,
      length: 50,
    };

    expect(areExactlySharingBorder(item, otherItem)).toBe(false);
  });

  it('returns false if item shares left border, but has bottom overhang', () => {
    /**
     *      ___
     *  ___|   |
     * |   |___|
     * |___|
     *
     */
    const item: GeometryObject = {
      northWest: { x: 50, y: 0 },
      northEast: { x: 100, y: 0 },
      southWest: { x: 50, y: 50 },
      southEast: { x: 100, y: 50 },
      width: 50,
      length: 50,
    };

    const otherItem: GeometryObject = {
      northWest: { x: 0, y: 25 },
      northEast: { x: 50, y: 25 },
      southWest: { x: 0, y: 75 },
      southEast: { x: 50, y: 75 },
      width: 50,
      length: 50,
    };

    expect(areExactlySharingBorder(item, otherItem)).toBe(false);
  });

  it('returns false if item shares left border, but has top overhang', () => {
    /**
     *   ___
     *  |   |___
     *  |___|   |
     *      |___|
     *
     */
    const item: GeometryObject = {
      northWest: { x: 50, y: 25 },
      northEast: { x: 100, y: 25 },
      southWest: { x: 50, y: 75 },
      southEast: { x: 100, y: 75 },
      width: 50,
      length: 50,
    };

    const otherItem: GeometryObject = {
      northWest: { x: 0, y: 0 },
      northEast: { x: 50, y: 0 },
      southWest: { x: 0, y: 50 },
      southEast: { x: 50, y: 50 },
      width: 50,
      length: 50,
    };

    expect(areExactlySharingBorder(item, otherItem)).toBe(false);
  });

  it('returns false if item shares right border, but has bottom overhang', () => {
    const item: GeometryObject = {
      northWest: { x: 0, y: 0 },
      northEast: { x: 50, y: 0 },
      southWest: { x: 0, y: 50 },
      southEast: { x: 50, y: 50 },
      width: 50,
      length: 50,
    };

    const otherItem: GeometryObject = {
      northWest: { x: 50, y: 25 },
      northEast: { x: 100, y: 25 },
      southWest: { x: 50, y: 75 },
      southEast: { x: 100, y: 75 },
      width: 50,
      length: 50,
    };

    expect(areExactlySharingBorder(item, otherItem)).toBe(false);
  });

  it('returns false if item shares right border, but has top overhang', () => {
    const item: GeometryObject = {
      northWest: { x: 0, y: 25 },
      northEast: { x: 50, y: 25 },
      southWest: { x: 0, y: 75 },
      southEast: { x: 50, y: 75 },
      width: 50,
      length: 50,
    };

    const otherItem: GeometryObject = {
      northWest: { x: 50, y: 0 },
      northEast: { x: 100, y: 0 },
      southWest: { x: 50, y: 50 },
      southEast: { x: 100, y: 50 },
      width: 50,
      length: 50,
    };

    expect(areExactlySharingBorder(item, otherItem)).toBe(false);
  });

  it('returns false if item shares top border, but has left overhang', () => {
    const item: GeometryObject = {
      northWest: { x: 50, y: 50 },
      northEast: { x: 100, y: 50 },
      southWest: { x: 50, y: 100 },
      southEast: { x: 100, y: 100 },
      width: 50,
      length: 50,
    };

    const otherItem: GeometryObject = {
      northWest: { x: 25, y: 0 },
      northEast: { x: 75, y: 0 },
      southWest: { x: 25, y: 50 },
      southEast: { x: 75, y: 50 },
      width: 50,
      length: 50,
    };

    expect(areExactlySharingBorder(item, otherItem)).toBe(false);
  });

  it('returns false if item shares top border, but has right overhang', () => {
    const item: GeometryObject = {
      northWest: { x: 0, y: 50 },
      northEast: { x: 50, y: 50 },
      southWest: { x: 0, y: 100 },
      southEast: { x: 50, y: 100 },
      width: 50,
      length: 50,
    };

    const otherItem: GeometryObject = {
      northWest: { x: 25, y: 0 },
      northEast: { x: 75, y: 0 },
      southWest: { x: 25, y: 50 },
      southEast: { x: 75, y: 50 },
      width: 50,
      length: 50,
    };

    expect(areExactlySharingBorder(item, otherItem)).toBe(false);
  });

  it('returns false if item shares bottom border, but has left overhang', () => {
    const item: GeometryObject = {
      northWest: { x: 50, y: 0 },
      northEast: { x: 100, y: 0 },
      southWest: { x: 50, y: 50 },
      southEast: { x: 100, y: 50 },
      width: 50,
      length: 50,
    };

    const otherItem: GeometryObject = {
      northWest: { x: 25, y: 50 },
      northEast: { x: 75, y: 50 },
      southWest: { x: 25, y: 100 },
      southEast: { x: 75, y: 100 },
      width: 50,
      length: 50,
    };

    expect(areExactlySharingBorder(item, otherItem)).toBe(false);
  });

  it('returns false if item shares bottom border, but has right overhang', () => {
    const item: GeometryObject = {
      northWest: { x: 0, y: 0 },
      northEast: { x: 50, y: 0 },
      southWest: { x: 0, y: 50 },
      southEast: { x: 50, y: 50 },
      width: 50,
      length: 50,
    };

    const otherItem: GeometryObject = {
      northWest: { x: 25, y: 50 },
      northEast: { x: 75, y: 50 },
      southWest: { x: 25, y: 100 },
      southEast: { x: 75, y: 100 },
      width: 50,
      length: 50,
    };

    expect(areExactlySharingBorder(item, otherItem)).toBe(false);
  });
});

describe('areColliding', () => {
  it('returns false if other item is outside of the current item', () => {
    const item = new PlaceableItem(
      '',
      '1',
      feetToMm(100),
      feetToMm(100),
      feetToMm(100),
      feetToMm(100)
    );
    const other = new PlaceableItem(
      '',
      '2',
      feetToMm(1001),
      feetToMm(1001),
      feetToMm(1001),
      feetToMm(1001)
    );
    expect(areColliding(item, other)).toBe(false);
  });
  it('returns false if only the borders overlap', () => {
    const item = new PlaceableItem(
      '',
      '1',
      feetToMm(100),
      feetToMm(100),
      feetToMm(100),
      feetToMm(100)
    );
    const otherRight = new PlaceableItem(
      '',
      '2',
      feetToMm(200),
      feetToMm(100),
      feetToMm(100),
      feetToMm(100)
    );
    expect(areColliding(item, otherRight)).toBe(false);
    const otherBelow = new PlaceableItem(
      '',
      '3',
      feetToMm(100),
      feetToMm(200),
      feetToMm(100),
      feetToMm(100)
    );
    expect(areColliding(item, otherBelow)).toBe(false);
    const otherLeft = new PlaceableItem(
      '',
      '4',
      feetToMm(0),
      feetToMm(100),
      feetToMm(100),
      feetToMm(100)
    );
    expect(areColliding(item, otherLeft)).toBe(false);
    const otherTop = new PlaceableItem(
      '',
      '5',
      feetToMm(100),
      feetToMm(0),
      feetToMm(100),
      feetToMm(100)
    );
    expect(areColliding(item, otherTop)).toBe(false);
  });
  it('returns true if other item is in the northeast corner', () => {
    const item = new PlaceableItem(
      '',
      '1',
      feetToMm(100),
      feetToMm(100),
      feetToMm(10),
      feetToMm(10)
    );
    const other = new PlaceableItem(
      '',
      '2',
      feetToMm(99),
      feetToMm(91),
      feetToMm(10),
      feetToMm(10)
    );
    expect(areColliding(item, other)).toBe(true);
  });
  it('returns true if other item is in the southeast corner', () => {
    const item = new PlaceableItem(
      '',
      '1',
      feetToMm(100),
      feetToMm(100),
      feetToMm(10),
      feetToMm(10)
    );
    const other = new PlaceableItem(
      '',
      '2',
      feetToMm(99),
      feetToMm(109),
      feetToMm(10),
      feetToMm(10)
    );
    expect(areColliding(item, other)).toBe(true);
  });
  it('returns true if other item is in the southwest corner', () => {
    const item = new PlaceableItem(
      '',
      '1',
      feetToMm(100),
      feetToMm(100),
      feetToMm(10),
      feetToMm(10)
    );
    const other = new PlaceableItem(
      '',
      '2',
      feetToMm(91),
      feetToMm(109),
      feetToMm(10),
      feetToMm(10)
    );
    expect(areColliding(item, other)).toBe(true);
  });
  it('returns true if other item is in the northwest corner', () => {
    const item = new PlaceableItem(
      '',
      '1',
      feetToMm(100),
      feetToMm(100),
      feetToMm(10),
      feetToMm(10)
    );
    const other = new PlaceableItem(
      '',
      '2',
      feetToMm(91),
      feetToMm(91),
      feetToMm(10),
      feetToMm(10)
    );
    expect(areColliding(item, other)).toBe(true);
  });
});

describe('isStraddlingBoundary', () => {
  it('returns false if item is enclosed inside other item', () => {
    const item = new PlaceableItem('', '1', 50, 50, 10, 10);
    const other = new PlaceableItem('', '2', 50, 50, 100, 100);
    expect(isStraddlingBoundary(item, other)).toBe(false);
  });
  it('returns false if item is outside other item', () => {
    const item = new PlaceableItem('', '1', 150, 150, 10, 10);
    const other = new PlaceableItem('', '2', 0, 0, 100, 100);
    expect(isStraddlingBoundary(item, other)).toBe(false);
  });
  it('returns true if item straddles left boundary', () => {
    const item = new PlaceableItem(
      '',
      '1',
      feetToMm(0),
      feetToMm(0),
      feetToMm(10),
      feetToMm(10)
    );
    const other = new PlaceableItem(
      '',
      '2',
      feetToMm(50),
      feetToMm(50),
      feetToMm(100),
      feetToMm(100)
    );
    expect(isStraddlingBoundary(item, other)).toBe(true);
  });
  it('returns true if item straddles right boundary', () => {
    const item = new PlaceableItem(
      '',
      '1',
      feetToMm(100),
      feetToMm(100),
      feetToMm(10),
      feetToMm(10)
    );
    const other = new PlaceableItem(
      '',
      '2',
      feetToMm(50),
      feetToMm(50),
      feetToMm(100),
      feetToMm(100)
    );
    expect(isStraddlingBoundary(item, other)).toBe(true);
  });
  it('returns true if item straddles top boundary', () => {
    const item = new PlaceableItem(
      '',
      '1',
      feetToMm(50),
      feetToMm(-5),
      feetToMm(10),
      feetToMm(10)
    );
    const other = new PlaceableItem(
      '',
      '2',
      feetToMm(0),
      feetToMm(0),
      feetToMm(100),
      feetToMm(100)
    );
    expect(isStraddlingBoundary(item, other)).toBe(true);
  });
  it('returns true if item straddles bottom boundary', () => {
    const item = new PlaceableItem(
      '',
      '1',
      feetToMm(50),
      feetToMm(95),
      feetToMm(20),
      feetToMm(20)
    );
    const other = new PlaceableItem(
      '',
      '2',
      feetToMm(50),
      feetToMm(50),
      feetToMm(100),
      feetToMm(100)
    );
    expect(isStraddlingBoundary(item, other)).toBe(true);
  });
  it('returns true if item straddles northeast corner', () => {
    const item = new PlaceableItem(
      '',
      '1',
      feetToMm(100),
      feetToMm(0),
      feetToMm(10),
      feetToMm(10)
    );
    const other = new PlaceableItem(
      '',
      '2',
      feetToMm(50),
      feetToMm(50),
      feetToMm(100),
      feetToMm(100)
    );
    expect(isStraddlingBoundary(item, other)).toBe(true);
  });
  it('returns true if item straddles northwest corner', () => {
    const item = new PlaceableItem(
      '',
      '1',
      feetToMm(0),
      feetToMm(0),
      feetToMm(10),
      feetToMm(10)
    );
    const other = new PlaceableItem(
      '',
      '2',
      feetToMm(50),
      feetToMm(50),
      feetToMm(100),
      feetToMm(100)
    );
    expect(isStraddlingBoundary(item, other)).toBe(true);
  });
  it('returns true if item straddles southeast corner', () => {
    const item = new PlaceableItem(
      '',
      '1',
      feetToMm(100),
      feetToMm(100),
      feetToMm(10),
      feetToMm(10)
    );
    const other = new PlaceableItem(
      '',
      '2',
      feetToMm(50),
      feetToMm(50),
      feetToMm(100),
      feetToMm(100)
    );
    expect(isStraddlingBoundary(item, other)).toBe(true);
  });
  it('returns true if item straddles southwest corner', () => {
    const item = new PlaceableItem(
      '',
      '1',
      feetToMm(0),
      feetToMm(100),
      feetToMm(10),
      feetToMm(10)
    );
    const other = new PlaceableItem(
      '',
      '2',
      feetToMm(50),
      feetToMm(50),
      feetToMm(100),
      feetToMm(100)
    );
    expect(isStraddlingBoundary(item, other)).toBe(true);
  });
  it('returns true if item straddles left wall and shares a top boundary with other item', () => {
    const item = new PlaceableItem(
      '',
      '1',
      feetToMm(0),
      feetToMm(5),
      feetToMm(10),
      feetToMm(10)
    );
    const other = new PlaceableItem(
      '',
      '2',
      feetToMm(50),
      feetToMm(50),
      feetToMm(100),
      feetToMm(100)
    );
    expect(isStraddlingBoundary(item, other)).toBe(true);
  });
  it('returns true if item straddles left wall and shares a bottom boundary with other item', () => {
    const item = new PlaceableItem(
      '',
      '1',
      feetToMm(0),
      feetToMm(95),
      feetToMm(10),
      feetToMm(10)
    );
    const other = new PlaceableItem(
      '',
      '2',
      feetToMm(50),
      feetToMm(50),
      feetToMm(100),
      feetToMm(100)
    );
    expect(isStraddlingBoundary(item, other)).toBe(true);
  });
  it('returns true if item straddles right wall and shares a top boundary with other item', () => {
    const item = new PlaceableItem(
      '',
      '1',
      feetToMm(100),
      feetToMm(5),
      feetToMm(10),
      feetToMm(10)
    );
    const other = new PlaceableItem(
      '',
      '2',
      feetToMm(50),
      feetToMm(50),
      feetToMm(100),
      feetToMm(100)
    );
    expect(isStraddlingBoundary(item, other)).toBe(true);
  });
  it('returns true if item straddles right wall and shares a bottom boundary with other item', () => {
    const item = new PlaceableItem(
      '',
      '1',
      feetToMm(100),
      feetToMm(95),
      feetToMm(10),
      feetToMm(10)
    );
    const other = new PlaceableItem(
      '',
      '2',
      feetToMm(50),
      feetToMm(50),
      feetToMm(100),
      feetToMm(100)
    );
    expect(isStraddlingBoundary(item, other)).toBe(true);
  });
  it('returns true if item straddles top wall and shares a left boundary with other item', () => {
    const item = new PlaceableItem(
      '',
      '1',
      feetToMm(5),
      feetToMm(0),
      feetToMm(10),
      feetToMm(10)
    );
    const other = new PlaceableItem(
      '',
      '2',
      feetToMm(50),
      feetToMm(50),
      feetToMm(100),
      feetToMm(100)
    );
    expect(isStraddlingBoundary(item, other)).toBe(true);
  });
  it('returns true if item straddles top wall and shares a right boundary with other item', () => {
    const item = new PlaceableItem(
      '',
      '1',
      feetToMm(95),
      feetToMm(0),
      feetToMm(10),
      feetToMm(10)
    );
    const other = new PlaceableItem(
      '',
      '2',
      feetToMm(50),
      feetToMm(50),
      feetToMm(100),
      feetToMm(100)
    );
    expect(isStraddlingBoundary(item, other)).toBe(true);
  });
  it('returns true if item straddles bottom wall and shares a left boundary with other item', () => {
    const item = new PlaceableItem(
      '',
      '1',
      feetToMm(5),
      feetToMm(100),
      feetToMm(10),
      feetToMm(10)
    );
    const other = new PlaceableItem(
      '',
      '2',
      feetToMm(50),
      feetToMm(50),
      feetToMm(100),
      feetToMm(100)
    );
    expect(isStraddlingBoundary(item, other)).toBe(true);
  });
  it('returns true if item straddles bottom wall and shares a right boundary with other item', () => {
    const item = new PlaceableItem(
      '',
      '1',
      feetToMm(90),
      feetToMm(95),
      feetToMm(20),
      feetToMm(20)
    );
    const other = new PlaceableItem(
      '',
      '2',
      feetToMm(50),
      feetToMm(50),
      feetToMm(100),
      feetToMm(100)
    );
    expect(isStraddlingBoundary(item, other)).toBe(true);
  });
});
