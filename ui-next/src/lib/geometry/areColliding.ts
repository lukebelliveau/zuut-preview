import { GeometryObject } from './GeometryObject';

function item1FullyToRightOfItem2(
  item2: GeometryObject,
  item1: GeometryObject
): boolean {
  return Math.floor(item2.northEast.x) <= Math.floor(item1.northWest.x);
}
const item1FullyToLeftOfItem2 = (
  item1: GeometryObject,
  item2: GeometryObject
): boolean => {
  return Math.floor(item2.northWest.x) >= Math.floor(item1.northEast.x);
};
function item1FullyBelowItem2(
  item2: GeometryObject,
  item1: GeometryObject
): boolean {
  return Math.floor(item2.southWest.y) <= Math.floor(item1.northWest.y);
}
function item1FullyAboveItem2(
  item2: GeometryObject,
  item1: GeometryObject
): boolean {
  return Math.floor(item2.northWest.y) >= Math.floor(item1.southWest.y);
}

export const areColliding = (item1: GeometryObject, item2: GeometryObject) => {
  /**
   * if item1 is not fully to the left/right/top/bottom of item2,
   * then it must be inside of item2
   */
  return !(
    item1FullyToLeftOfItem2(item1, item2) ||
    item1FullyToRightOfItem2(item2, item1) ||
    item1FullyAboveItem2(item2, item1) ||
    item1FullyBelowItem2(item2, item1)
  );
};
