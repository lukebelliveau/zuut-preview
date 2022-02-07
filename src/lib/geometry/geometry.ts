import PlaceableItem from '../item/placeableItem';
import Room from '../room';

/**
 * Pure functions handy for checking the spatial relationship between two objects
 * and computing values based on these positions.
 */
export type GeometryObject = PlaceableItem | Room;

export const itemIsAlignedWithLeftWall = (
  item: GeometryObject,
  room: GeometryObject
) => item.x < room.x && room.x < item.x + item.width;
export const itemIsAlignedWithRightWall = (
  item: GeometryObject,
  room: GeometryObject
) => item.x < room.x + room.width && room.x + room.width < item.x + item.width;
export const itemIsBetweenTopAndBottomWall = (
  item: GeometryObject,
  room: GeometryObject
) => room.y < item.y && item.y + item.length < room.y + room.length;

export const itemIsAlignedWithBottomWall = (
  item: GeometryObject,
  room: GeometryObject
) =>
  item.y < room.y + room.length && room.y + room.length < item.y + item.length;
export const itemIsAlignedWithTopWall = (
  item: GeometryObject,
  room: GeometryObject
) => item.y < room.y && room.y < item.y + item.length;
export const itemIsBetweenLeftAndRightWall = (
  item: GeometryObject,
  room: GeometryObject
) => room.x < item.x && item.x + item.width < room.x + room.width;

export const itemHasVerticalOrientation = (item: GeometryObject) =>
  item.length > item.width;
export const itemHasHorizontalOrientation = (item: GeometryObject) =>
  !itemHasVerticalOrientation(item);

export const rotated90Degrees = (item: GeometryObject): GeometryObject => {
  const { width, length, height } = item;

  return {
    x: item.x,
    y: item.y,
    length: width,
    width: length,
    height: height,
  };
};

/**
 * Straddle item1 on bottom boundary of item2
 */
export const placedOnBottomBoundary = (
  item1: GeometryObject,
  item2: GeometryObject
): GeometryObject => {
  const newItem1Y = item2.y + item2.length - item1.length / 2;

  return {
    x: item1.x,
    y: newItem1Y,
    length: item1.length,
    height: item1.height,
    width: item1.width,
  };
};

/**
 * Straddle item1 on top boundary of item2
 */
export const placedOnTopBoundary = (
  item1: GeometryObject,
  item2: GeometryObject
): GeometryObject => {
  const newItem1Y = item2.y - item1.length / 2;

  return {
    x: item1.x,
    y: newItem1Y,
    length: item1.length,
    height: item1.height,
    width: item1.width,
  };
};

/**
 * Straddle item1 on left boundary of item2
 */
export const placedOnLeftBoundary = (
  item1: GeometryObject,
  item2: GeometryObject
): GeometryObject => {
  const newItem1X = item2.x - item1.width / 2;

  return {
    x: newItem1X,
    y: item1.y,
    length: item1.length,
    height: item1.height,
    width: item1.width,
  };
};

/**
 * Straddle item1 on right boundary of item2
 */
export const placedOnRightBoundary = (
  item1: GeometryObject,
  item2: GeometryObject
): GeometryObject => {
  const newItem1X = item2.x + item2.width - item1.width / 2;

  return {
    x: newItem1X,
    y: item1.y,
    length: item1.length,
    height: item1.height,
    width: item1.width,
  };
};
