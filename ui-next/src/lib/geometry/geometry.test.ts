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
    const item = new PlaceableItem({
      name: 'item',
      id: v4(),
      x: feetToMm(10),
      y: feetToMm(10),
      width: feetToMm(10),
      length: feetToMm(20),
      amazonProducts: [],
      selectedAmazonASIN: '',
      linkedASINs: [],
    });
    expect(itemHasVerticalOrientation(item)).toBe(true);
  });
  it('returns false when length < width', () => {
    // width=20, length=10
    const item = new PlaceableItem({
      name: 'item',
      id: v4(),
      x: feetToMm(10),
      y: feetToMm(10),
      width: feetToMm(20),
      length: feetToMm(10),
      amazonProducts: [],
      selectedAmazonASIN: '',
      linkedASINs: [],
    });
    expect(itemHasVerticalOrientation(item)).toBe(false);
  });
});

describe('itemHasHorizontalOrientation', () => {
  it('returns true when length > width', () => {
    // width=10, length=20
    const item = new PlaceableItem({
      name: 'item',
      id: v4(),
      x: feetToMm(10),
      y: feetToMm(10),
      width: feetToMm(10),
      length: feetToMm(20),
      amazonProducts: [],
      selectedAmazonASIN: '',
      linkedASINs: [],
    });
    expect(itemHasVerticalOrientation(item)).toBe(true);
  });
  it('returns false when length < width', () => {
    // width=20, length=10
    const item = new PlaceableItem({
      name: 'item',
      id: v4(),
      x: feetToMm(10),
      y: feetToMm(10),
      width: feetToMm(20),
      length: feetToMm(10),
      amazonProducts: [],
      selectedAmazonASIN: '',
      linkedASINs: [],
    });
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
    const item = new PlaceableItem({
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
    const other = new PlaceableItem({
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
    expect(areColliding(item, other)).toBe(false);
  });
  it('returns false if only the borders overlap', () => {
    const item = new PlaceableItem({
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
    const otherRight = new PlaceableItem({
      name: '',
      id: '2',
      x: feetToMm(200),
      y: feetToMm(100),
      width: feetToMm(100),
      length: feetToMm(100),
      amazonProducts: [],
      selectedAmazonASIN: '',
      linkedASINs: [],
    });
    expect(areColliding(item, otherRight)).toBe(false);
    const otherBelow = new PlaceableItem({
      name: '',
      id: '3',
      x: feetToMm(100),
      y: feetToMm(200),
      width: feetToMm(100),
      length: feetToMm(100),
      amazonProducts: [],
      selectedAmazonASIN: '',
      linkedASINs: [],
    });
    expect(areColliding(item, otherBelow)).toBe(false);
    const otherLeft = new PlaceableItem({
      name: '',
      id: '4',
      x: feetToMm(0),
      y: feetToMm(100),
      width: feetToMm(100),
      length: feetToMm(100),
      amazonProducts: [],
      selectedAmazonASIN: '',
      linkedASINs: [],
    });
    expect(areColliding(item, otherLeft)).toBe(false);
    const otherTop = new PlaceableItem({
      name: '',
      id: '5',
      x: feetToMm(100),
      y: feetToMm(0),
      width: feetToMm(100),
      length: feetToMm(100),
      amazonProducts: [],
      selectedAmazonASIN: '',
      linkedASINs: [],
    });
    expect(areColliding(item, otherTop)).toBe(false);
  });
  it('returns true if other item is in the northeast corner', () => {
    const item = new PlaceableItem({
      name: '',
      id: '1',
      x: feetToMm(100),
      y: feetToMm(100),
      width: feetToMm(10),
      length: feetToMm(10),
      amazonProducts: [],
      selectedAmazonASIN: '',
      linkedASINs: [],
    });
    const other = new PlaceableItem({
      name: '',
      id: '2',
      x: feetToMm(99),
      y: feetToMm(91),
      width: feetToMm(10),
      length: feetToMm(10),
      amazonProducts: [],
      selectedAmazonASIN: '',
      linkedASINs: [],
    });
    expect(areColliding(item, other)).toBe(true);
  });
  it('returns true if other item is in the southeast corner', () => {
    const item = new PlaceableItem({
      name: '',
      id: '1',
      x: feetToMm(100),
      y: feetToMm(100),
      width: feetToMm(10),
      length: feetToMm(10),
      amazonProducts: [],
      selectedAmazonASIN: '',
      linkedASINs: [],
    });
    const other = new PlaceableItem({
      name: '',
      id: '2',
      x: feetToMm(99),
      y: feetToMm(109),
      width: feetToMm(10),
      length: feetToMm(10),
      amazonProducts: [],
      selectedAmazonASIN: '',
      linkedASINs: [],
    });
    expect(areColliding(item, other)).toBe(true);
  });
  it('returns true if other item is in the southwest corner', () => {
    const item = new PlaceableItem({
      name: '',
      id: '1',
      x: feetToMm(100),
      y: feetToMm(100),
      width: feetToMm(10),
      length: feetToMm(10),
      amazonProducts: [],
      selectedAmazonASIN: '',
      linkedASINs: [],
    });
    const other = new PlaceableItem({
      name: '',
      id: '2',
      x: feetToMm(91),
      y: feetToMm(109),
      width: feetToMm(10),
      length: feetToMm(10),
      amazonProducts: [],
      selectedAmazonASIN: '',
      linkedASINs: [],
    });
    expect(areColliding(item, other)).toBe(true);
  });
  it('returns true if other item is in the northwest corner', () => {
    const item = new PlaceableItem({
      name: '',
      id: '1',
      x: feetToMm(100),
      y: feetToMm(100),
      width: feetToMm(10),
      length: feetToMm(10),
      amazonProducts: [],
      selectedAmazonASIN: '',
      linkedASINs: [],
    });
    const other = new PlaceableItem({
      name: '',
      id: '2',
      x: feetToMm(91),
      y: feetToMm(91),
      width: feetToMm(10),
      length: feetToMm(10),
      amazonProducts: [],
      selectedAmazonASIN: '',
      linkedASINs: [],
    });
    expect(areColliding(item, other)).toBe(true);
  });
});
