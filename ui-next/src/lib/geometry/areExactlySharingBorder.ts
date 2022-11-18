import { GeometryObject } from './GeometryObject';

/**
 * "exactly sharing" = the shared borders (lines of rectangles) have the same origin, length, & direction.
 */
export const areExactlySharingBorder = (
  item1: GeometryObject,
  item2: GeometryObject
): boolean => {
  // item1's right border and item2's left border
  if (
    Math.round(item1.northEast.x) === Math.round(item2.northWest.x) &&
    Math.round(item1.northWest.y) === Math.round(item2.northWest.y) &&
    Math.round(item1.length) === Math.round(item2.length)
  ) {
    return true;
  }

  // item1's left border and item2's right border
  if (
    Math.round(item2.northEast.x) === Math.round(item1.northWest.x) &&
    Math.round(item1.northWest.y) === Math.round(item2.northWest.y) &&
    Math.round(item1.length) === Math.round(item2.length)
  ) {
    return true;
  }

  // item1's top border and item2's bottom border
  if (
    Math.round(item1.northWest.y) === Math.round(item2.southWest.y) &&
    Math.round(item1.northWest.x) === Math.round(item2.northWest.x) &&
    Math.round(item1.width) === Math.round(item2.width)
  ) {
    return true;
  }

  // item1's bottom border and item2's top border
  if (
    Math.round(item2.northWest.y) === Math.round(item1.southWest.y) &&
    Math.round(item1.northWest.x) === Math.round(item2.northWest.x) &&
    Math.round(item1.width) === Math.round(item2.width)
  ) {
    return true;
  }

  return false;
};
