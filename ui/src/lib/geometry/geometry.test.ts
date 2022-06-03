import { v4 } from 'uuid';
import { feetToMm } from '../conversions';
import PlaceableItem, { IPlaceableItem } from '../item/placeableItem';

import Room from '../room';
import {
  areColliding,
  areExactlySharingBorder,
  isStraddlingBoundary,
  itemHasVerticalOrientation,
} from './geometry';
import { GeometryObject } from './GeometryObject';

// 100x100x100 room, placed at { x: 0; y: 0 }
const room = new Room(feetToMm(100), feetToMm(100), feetToMm(100));

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
