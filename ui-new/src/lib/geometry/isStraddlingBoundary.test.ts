import { v4 } from 'uuid';
import { feetToMm } from '../conversions';
import PlaceableItem from '../item/placeableItem';
import Room from '../room';
import {
  isStraddlingBoundary,
  itemIsBetweenLeftAndRightWall,
  itemIsBetweenTopAndBottomWall,
  itemStraddlesBottomXAxis,
  itemStraddlesLeftYAxis,
  itemStraddlesRightYAxis,
  itemStraddlesTopXAxis,
} from './isStraddlingBoundary';

// 100x100x100 room, placed at { x: 0; y: 0 }
const room = new Room(feetToMm(100), feetToMm(100), feetToMm(100));

describe('isStraddlingBoundary', () => {
  it('returns false if item is enclosed inside other item', () => {
    const item = new PlaceableItem({
      name: '',
      id: '1',
      x: 50,
      y: 50,
      width: 10,
      length: 10,
      amazonProducts: [],
      selectedAmazonASIN: '',
      linkedASINs: [],
    });
    const other = new PlaceableItem({
      name: '',
      id: '2',
      x: 50,
      y: 50,
      width: 100,
      length: 100,
      amazonProducts: [],
      selectedAmazonASIN: '',
      linkedASINs: [],
    });
    expect(isStraddlingBoundary(item, other)).toBe(false);
  });
  it('returns false if item is outside other item', () => {
    const item = new PlaceableItem({
      name: '',
      id: '1',
      x: 150,
      y: 150,
      width: 10,
      length: 10,
      amazonProducts: [],
      selectedAmazonASIN: '',
      linkedASINs: [],
    });
    const other = new PlaceableItem({
      name: '',
      id: '2',
      x: 0,
      y: 0,
      width: 100,
      length: 100,
      amazonProducts: [],
      selectedAmazonASIN: '',
      linkedASINs: [],
    });
    expect(isStraddlingBoundary(item, other)).toBe(false);
  });
  it('returns true if item straddles left boundary', () => {
    const item = new PlaceableItem({
      name: '',
      id: '1',
      x: feetToMm(0),
      y: feetToMm(0),
      width: feetToMm(10),
      length: feetToMm(10),
      amazonProducts: [],
      selectedAmazonASIN: '',
      linkedASINs: [],
    });
    const other = new PlaceableItem({
      name: '',
      id: '2',
      x: feetToMm(50),
      y: feetToMm(50),
      width: feetToMm(100),
      length: feetToMm(100),
      amazonProducts: [],
      selectedAmazonASIN: '',
      linkedASINs: [],
    });
    expect(isStraddlingBoundary(item, other)).toBe(true);
  });
  it('returns true if item straddles right boundary', () => {
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
      x: feetToMm(50),
      y: feetToMm(50),
      width: feetToMm(100),
      length: feetToMm(100),
      amazonProducts: [],
      selectedAmazonASIN: '',
      linkedASINs: [],
    });
    expect(isStraddlingBoundary(item, other)).toBe(true);
  });
  it('returns true if item straddles top boundary', () => {
    const item = new PlaceableItem({
      name: '',
      id: '1',
      x: feetToMm(50),
      y: feetToMm(-5),
      width: feetToMm(10),
      length: feetToMm(10),
      amazonProducts: [],
      selectedAmazonASIN: '',
      linkedASINs: [],
    });
    const other = new PlaceableItem({
      name: '',
      id: '2',
      x: feetToMm(0),
      y: feetToMm(0),
      width: feetToMm(100),
      length: feetToMm(100),
      amazonProducts: [],
      selectedAmazonASIN: '',
      linkedASINs: [],
    });
    expect(isStraddlingBoundary(item, other)).toBe(true);
  });
  it('returns true if item straddles bottom boundary', () => {
    const item = new PlaceableItem({
      name: '',
      id: '1',
      x: feetToMm(50),
      y: feetToMm(95),
      width: feetToMm(20),
      length: feetToMm(20),
      amazonProducts: [],
      selectedAmazonASIN: '',
      linkedASINs: [],
    });
    const other = new PlaceableItem({
      name: '',
      id: '2',
      x: feetToMm(50),
      y: feetToMm(50),
      width: feetToMm(100),
      length: feetToMm(100),
      amazonProducts: [],
      selectedAmazonASIN: '',
      linkedASINs: [],
    });
    expect(isStraddlingBoundary(item, other)).toBe(true);
  });
  it('returns true if item straddles northeast corner', () => {
    const item = new PlaceableItem({
      name: '',
      id: '1',
      x: feetToMm(100),
      y: feetToMm(0),
      width: feetToMm(10),
      length: feetToMm(10),
      amazonProducts: [],
      selectedAmazonASIN: '',
      linkedASINs: [],
    });
    const other = new PlaceableItem({
      name: '',
      id: '2',
      x: feetToMm(50),
      y: feetToMm(50),
      width: feetToMm(100),
      length: feetToMm(100),
      amazonProducts: [],
      selectedAmazonASIN: '',
      linkedASINs: [],
    });
    expect(isStraddlingBoundary(item, other)).toBe(true);
  });
  it('returns true if item straddles northwest corner', () => {
    const item = new PlaceableItem({
      name: '',
      id: '1',
      x: feetToMm(0),
      y: feetToMm(0),
      width: feetToMm(10),
      length: feetToMm(10),
      amazonProducts: [],
      selectedAmazonASIN: '',
      linkedASINs: [],
    });
    const other = new PlaceableItem({
      name: '',
      id: '2',
      x: feetToMm(50),
      y: feetToMm(50),
      width: feetToMm(100),
      length: feetToMm(100),
      amazonProducts: [],
      selectedAmazonASIN: '',
      linkedASINs: [],
    });
    expect(isStraddlingBoundary(item, other)).toBe(true);
  });
  it('returns true if item straddles southeast corner', () => {
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
      x: feetToMm(50),
      y: feetToMm(50),
      width: feetToMm(100),
      length: feetToMm(100),
      amazonProducts: [],
      selectedAmazonASIN: '',
      linkedASINs: [],
    });
    expect(isStraddlingBoundary(item, other)).toBe(true);
  });
  it('returns true if item straddles southwest corner', () => {
    const item = new PlaceableItem({
      name: '',
      id: '1',
      x: feetToMm(0),
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
      x: feetToMm(50),
      y: feetToMm(50),
      width: feetToMm(100),
      length: feetToMm(100),
      amazonProducts: [],
      selectedAmazonASIN: '',
      linkedASINs: [],
    });
    expect(isStraddlingBoundary(item, other)).toBe(true);
  });
  it('returns true if item straddles left wall and shares a top boundary with other item', () => {
    const item = new PlaceableItem({
      name: '',
      id: '1',
      x: feetToMm(0),
      y: feetToMm(5),
      width: feetToMm(10),
      length: feetToMm(10),
      amazonProducts: [],
      selectedAmazonASIN: '',
      linkedASINs: [],
    });
    const other = new PlaceableItem({
      name: '',
      id: '2',
      x: feetToMm(50),
      y: feetToMm(50),
      width: feetToMm(100),
      length: feetToMm(100),
      amazonProducts: [],
      selectedAmazonASIN: '',
      linkedASINs: [],
    });
    expect(isStraddlingBoundary(item, other)).toBe(true);
  });
  it('returns true if item straddles left wall and shares a bottom boundary with other item', () => {
    const item = new PlaceableItem({
      name: '',
      id: '1',
      x: feetToMm(0),
      y: feetToMm(95),
      width: feetToMm(10),
      length: feetToMm(10),
      amazonProducts: [],
      selectedAmazonASIN: '',
      linkedASINs: [],
    });
    const other = new PlaceableItem({
      name: '',
      id: '2',
      x: feetToMm(50),
      y: feetToMm(50),
      width: feetToMm(100),
      length: feetToMm(100),
      amazonProducts: [],
      selectedAmazonASIN: '',
      linkedASINs: [],
    });
    expect(isStraddlingBoundary(item, other)).toBe(true);
  });
  it('returns true if item straddles right wall and shares a top boundary with other item', () => {
    const item = new PlaceableItem({
      name: '',
      id: '1',
      x: feetToMm(100),
      y: feetToMm(5),
      width: feetToMm(10),
      length: feetToMm(10),
      amazonProducts: [],
      selectedAmazonASIN: '',
      linkedASINs: [],
    });
    const other = new PlaceableItem({
      name: '',
      id: '2',
      x: feetToMm(50),
      y: feetToMm(50),
      width: feetToMm(100),
      length: feetToMm(100),
      amazonProducts: [],
      selectedAmazonASIN: '',
      linkedASINs: [],
    });
    expect(isStraddlingBoundary(item, other)).toBe(true);
  });
  it('returns true if item straddles right wall and shares a bottom boundary with other item', () => {
    const item = new PlaceableItem({
      name: '',
      id: '1',
      x: feetToMm(100),
      y: feetToMm(95),
      width: feetToMm(10),
      length: feetToMm(10),
      amazonProducts: [],
      selectedAmazonASIN: '',
      linkedASINs: [],
    });
    const other = new PlaceableItem({
      name: '',
      id: '2',
      x: feetToMm(50),
      y: feetToMm(50),
      width: feetToMm(100),
      length: feetToMm(100),
      amazonProducts: [],
      selectedAmazonASIN: '',
      linkedASINs: [],
    });
    expect(isStraddlingBoundary(item, other)).toBe(true);
  });
  it('returns true if item straddles top wall and shares a left boundary with other item', () => {
    const item = new PlaceableItem({
      name: '',
      id: '1',
      x: feetToMm(5),
      y: feetToMm(0),
      width: feetToMm(10),
      length: feetToMm(10),
      amazonProducts: [],
      selectedAmazonASIN: '',
      linkedASINs: [],
    });
    const other = new PlaceableItem({
      name: '',
      id: '2',
      x: feetToMm(50),
      y: feetToMm(50),
      width: feetToMm(100),
      length: feetToMm(100),
      amazonProducts: [],
      selectedAmazonASIN: '',
      linkedASINs: [],
    });
    expect(isStraddlingBoundary(item, other)).toBe(true);
  });
  it('returns true if item straddles top wall and shares a right boundary with other item', () => {
    const item = new PlaceableItem({
      name: '',
      id: '1',
      x: feetToMm(95),
      y: feetToMm(0),
      width: feetToMm(10),
      length: feetToMm(10),
      amazonProducts: [],
      selectedAmazonASIN: '',
      linkedASINs: [],
    });
    const other = new PlaceableItem({
      name: '',
      id: '2',
      x: feetToMm(50),
      y: feetToMm(50),
      width: feetToMm(100),
      length: feetToMm(100),
      amazonProducts: [],
      selectedAmazonASIN: '',
      linkedASINs: [],
    });
    expect(isStraddlingBoundary(item, other)).toBe(true);
  });
  it('returns true if item straddles bottom wall and shares a left boundary with other item', () => {
    const item = new PlaceableItem({
      name: '',
      id: '1',
      x: feetToMm(5),
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
      x: feetToMm(50),
      y: feetToMm(50),
      width: feetToMm(100),
      length: feetToMm(100),
      amazonProducts: [],
      selectedAmazonASIN: '',
      linkedASINs: [],
    });
    expect(isStraddlingBoundary(item, other)).toBe(true);
  });
  it('returns true if item straddles bottom wall and shares a right boundary with other item', () => {
    const item = new PlaceableItem({
      name: '',
      id: '1',
      x: feetToMm(90),
      y: feetToMm(95),
      width: feetToMm(20),
      length: feetToMm(20),
      amazonProducts: [],
      selectedAmazonASIN: '',
      linkedASINs: [],
    });
    const other = new PlaceableItem({
      name: '',
      id: '2',
      x: feetToMm(50),
      y: feetToMm(50),
      width: feetToMm(100),
      length: feetToMm(100),
      amazonProducts: [],
      selectedAmazonASIN: '',
      linkedASINs: [],
    });
    expect(isStraddlingBoundary(item, other)).toBe(true);
  });
});

describe('itemStraddlesBottomXAxis', () => {
  it('returns true when item straddles y-coordinates of bottom wall', () => {
    // 20x20x20 window, placed at { x: 20; y: 90 }s
    const item = new PlaceableItem({
      name: 'Window',
      id: v4(),
      x: feetToMm(30),
      y: feetToMm(100),
      width: feetToMm(20),
      length: feetToMm(20),
      height: feetToMm(20),
      amazonProducts: [],
      selectedAmazonASIN: '',
      linkedASINs: [],
    });

    expect(itemStraddlesBottomXAxis(item, room)).toBe(true);
  });

  it('returns false when item does not straddle y-coordinate of bottom wall', () => {
    // 20x20x20 window, placed at { x: 20; y: 110 }
    const window: PlaceableItem = new PlaceableItem({
      name: 'Window',
      id: v4(),
      x: 20,
      y: 110,
      width: 20,
      length: 20,
      height: 20,
      amazonProducts: [],
      selectedAmazonASIN: '',
      linkedASINs: [],
    });
    expect(itemStraddlesBottomXAxis(window, room)).toBe(false);
  });
});

describe('itemStraddlesTopXAxis', () => {
  it('returns true when item straddles y-coordinates of top wall', () => {
    // 20x20x20 window, placed at { x: 20; y: -5}
    const item = new PlaceableItem({
      name: 'Window',
      id: v4(),
      x: feetToMm(20),
      y: feetToMm(-5),
      width: feetToMm(20),
      length: feetToMm(20),
      height: feetToMm(20),
      amazonProducts: [],
      selectedAmazonASIN: '',
      linkedASINs: [],
    });

    expect(itemStraddlesTopXAxis(item, room)).toBe(true);
  });
  it('returns false when item does not straddle y-coordinates of top wall', () => {
    // 20x20x20 window, placed at { x: 20; y: 5 }
    const item = new PlaceableItem({
      name: 'Window',
      id: v4(),
      x: feetToMm(30),
      y: feetToMm(15),
      width: feetToMm(20),
      length: feetToMm(20),
      height: feetToMm(20),
      amazonProducts: [],
      selectedAmazonASIN: '',
      linkedASINs: [],
    });

    expect(itemStraddlesTopXAxis(item, room)).toBe(false);
  });
});

describe('itemStraddlesLeftYAxis', () => {
  it('returns true when item straddles x-coordinates of left wall', () => {
    // 20x20x20 window, placed at { x: -5; y: 0}
    const item = new PlaceableItem({
      name: 'Window',
      id: v4(),
      x: feetToMm(-5),
      y: feetToMm(0),
      width: feetToMm(20),
      length: feetToMm(20),
      height: feetToMm(20),
      amazonProducts: [],
      selectedAmazonASIN: '',
      linkedASINs: [],
    });

    expect(itemStraddlesLeftYAxis(item, room)).toBe(true);
  });
  it('returns false when item does not straddle x-coordinates of left wall', () => {
    // 20x20x20 window, placed at { x: 5; y: 0 }
    const item = new PlaceableItem({
      name: 'Window',
      id: v4(),
      x: feetToMm(15),
      y: feetToMm(10),
      width: feetToMm(20),
      length: feetToMm(20),
      height: feetToMm(20),
      amazonProducts: [],
      selectedAmazonASIN: '',
      linkedASINs: [],
    });

    expect(itemStraddlesLeftYAxis(item, room)).toBe(false);
  });
});

describe('itemStraddlesRightYAxis', () => {
  it('returns true when item straddles x-coordinates of right wall', () => {
    // 20x20x20 window, placed at { x: 95; y: 0}
    const item = new PlaceableItem({
      name: 'Window',
      id: v4(),
      x: feetToMm(95),
      y: feetToMm(0),
      width: feetToMm(20),
      length: feetToMm(20),
      height: feetToMm(20),
      amazonProducts: [],
      selectedAmazonASIN: '',
      linkedASINs: [],
    });

    expect(itemStraddlesRightYAxis(item, room)).toBe(true);
  });
  it('returns false when item does not straddle x-coordinates of right wall', () => {
    // 20x20x20 window, placed at { x: 5; y: 0 }
    const item = new PlaceableItem({
      name: 'Window',
      id: v4(),
      x: feetToMm(5),
      y: feetToMm(0),
      width: feetToMm(20),
      length: feetToMm(20),
      height: feetToMm(20),
      amazonProducts: [],
      selectedAmazonASIN: '',
      linkedASINs: [],
    });

    expect(itemStraddlesRightYAxis(item, room)).toBe(false);
  });
});

describe('itemIsBetweenLeftAndRightWall', () => {
  it('returns true if first item is contained within left and right bounds of the second item', () => {
    // 20x20x20 window, placed at { x: 5; y: 0 }
    const window: PlaceableItem = new PlaceableItem({
      name: 'Window',
      id: v4(),
      x: feetToMm(15),
      y: feetToMm(10),
      width: feetToMm(20),
      length: feetToMm(20),
      height: feetToMm(20),
      amazonProducts: [],
      selectedAmazonASIN: '',
      linkedASINs: [],
    });

    expect(itemIsBetweenLeftAndRightWall(window, room)).toBe(true);
  });

  it('returns false if first item straddles the left boundary', () => {
    // 20x20x20 window, placed at { x: -5; y: 0 }
    const window: PlaceableItem = new PlaceableItem({
      name: 'Window',
      id: v4(),
      x: feetToMm(-5),
      y: feetToMm(0),
      width: feetToMm(20),
      length: feetToMm(20),
      height: feetToMm(20),
      amazonProducts: [],
      selectedAmazonASIN: '',
      linkedASINs: [],
    });

    expect(itemIsBetweenLeftAndRightWall(window, room)).toBe(false);
  });

  it('returns false if first item straddles the right boundary', () => {
    // 20x20x20 window, placed at { x: 95; y: 0 }
    const window: PlaceableItem = new PlaceableItem({
      name: 'Window',
      id: v4(),
      x: feetToMm(95),
      y: feetToMm(0),
      width: feetToMm(20),
      length: feetToMm(20),
      height: feetToMm(20),
      amazonProducts: [],
      selectedAmazonASIN: '',
      linkedASINs: [],
    });

    expect(itemIsBetweenLeftAndRightWall(window, room)).toBe(false);
  });

  it('returns false if first item is outside the left/right bounds', () => {
    // 20x20x20 window, placed at { x: 105; y: 0 }
    const window: PlaceableItem = new PlaceableItem({
      name: 'Window',
      id: v4(),
      x: feetToMm(105),
      y: feetToMm(0),
      width: feetToMm(20),
      length: feetToMm(20),
      height: feetToMm(20),
      amazonProducts: [],
      selectedAmazonASIN: '',
      linkedASINs: [],
    });

    expect(itemIsBetweenLeftAndRightWall(window, room)).toBe(false);
  });
});

describe('itemIsBetweenTopAndBottomWall', () => {
  it('returns true if first item is contained within top and bottom bounds of the second item', () => {
    // 20x20x20 window, placed at { x: 5; y: 5 }
    const window: PlaceableItem = new PlaceableItem({
      name: 'Window',
      id: v4(),
      x: feetToMm(15),
      y: feetToMm(15),
      width: feetToMm(20),
      length: feetToMm(20),
      height: feetToMm(20),
      amazonProducts: [],
      selectedAmazonASIN: '',
      linkedASINs: [],
    });

    expect(itemIsBetweenTopAndBottomWall(window, room)).toBe(true);
  });

  it('returns false if first item straddles the top boundary', () => {
    // 20x20x20 window, placed at { x: 0; y: -5 }
    const window: PlaceableItem = new PlaceableItem({
      name: 'Window',
      id: v4(),
      x: feetToMm(0),
      y: feetToMm(-5),
      width: feetToMm(20),
      length: feetToMm(20),
      height: feetToMm(20),
      amazonProducts: [],
      selectedAmazonASIN: '',
      linkedASINs: [],
    });

    expect(itemIsBetweenTopAndBottomWall(window, room)).toBe(false);
  });

  it('returns false if first item straddles the bottom boundary', () => {
    // 20x20x20 window, placed at { x: 0; y: 95 }
    const window: PlaceableItem = new PlaceableItem({
      name: 'Window',
      id: v4(),
      x: feetToMm(0),
      y: feetToMm(95),
      width: feetToMm(20),
      length: feetToMm(20),
      height: feetToMm(20),
      amazonProducts: [],
      selectedAmazonASIN: '',
      linkedASINs: [],
    });

    expect(itemIsBetweenTopAndBottomWall(window, room)).toBe(false);
  });

  it('returns false if first item is outside the top/bottom bounds', () => {
    // 20x20x20 window, placed at { x: 0; y: 105 }
    const window: PlaceableItem = new PlaceableItem({
      name: 'Window',
      id: v4(),
      x: feetToMm(0),
      y: feetToMm(105),
      width: feetToMm(20),
      length: feetToMm(20),
      height: feetToMm(20),
      amazonProducts: [],
      selectedAmazonASIN: '',
      linkedASINs: [],
    });

    expect(itemIsBetweenTopAndBottomWall(window, room)).toBe(false);
  });
});
