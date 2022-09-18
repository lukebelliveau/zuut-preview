import { GeometryObject } from './GeometryObject';

export const isStraddlingBoundary = (
  item1: GeometryObject,
  item2: GeometryObject
) => {
  const isBetweenTopAndBottom = itemIsBetweenTopAndBottomWallInclusive(
    item1,
    item2
  );
  const isBetweenLeftAndRight = itemIsBetweenLeftAndRightWallInclusive(
    item1,
    item2
  );
  const straddlesLeftAxis = itemStraddlesLeftYAxis(item1, item2);
  const straddlesRightAxis = itemStraddlesRightYAxis(item1, item2);
  const straddlesBottomAxis = itemStraddlesBottomXAxis(item1, item2);
  const straddlesTopAxis = itemStraddlesTopXAxis(item1, item2);

  if (straddlesLeftAxis || straddlesRightAxis) {
    if (
      isBetweenTopAndBottom ||
      straddlesTopAxis ||
      straddlesBottomAxis ||
      item1.northWest.y === item2.northWest.y ||
      item1.southWest.y === item2.southWest.y
    ) {
      return true;
    }
  } else if (straddlesTopAxis || straddlesBottomAxis) {
    if (
      isBetweenLeftAndRight ||
      straddlesLeftAxis ||
      straddlesRightAxis ||
      item1.northWest.x === item2.northWest.x ||
      item1.northEast.x === item2.northEast.x
    ) {
      return true;
    }
  }
  return false;
};

export const itemStraddlesTopXAxis = (
  item: GeometryObject,
  room: GeometryObject
) =>
  Math.floor(item.northWest.y) < Math.floor(room.northWest.y) &&
  Math.floor(room.northWest.y) < Math.floor(item.southWest.y);
export const itemStraddlesBottomXAxis = (
  item: GeometryObject,
  room: GeometryObject
) =>
  Math.floor(item.northWest.y) < Math.floor(room.southWest.y) &&
  Math.floor(room.southWest.y) < Math.floor(item.southWest.y);
export const itemStraddlesLeftYAxis = (
  item: GeometryObject,
  room: GeometryObject
) => {
  return (
    Math.floor(item.northWest.x) < Math.floor(room.northWest.x) &&
    Math.floor(room.northWest.x) < Math.floor(item.northEast.x)
  );
};
export const itemStraddlesRightYAxis = (
  item: GeometryObject,
  room: GeometryObject
) =>
  Math.floor(item.northWest.x) < Math.floor(room.northEast.x) &&
  Math.floor(room.northEast.x) < Math.floor(item.northEast.x);
export const itemIsBetweenTopAndBottomWall = (
  item: GeometryObject,
  room: GeometryObject
) =>
  Math.floor(room.northWest.y) < Math.floor(item.northWest.y) &&
  Math.floor(item.southWest.y) < Math.floor(room.southWest.y);
export const itemIsBetweenTopAndBottomWallInclusive = (
  item: GeometryObject,
  room: GeometryObject
) =>
  Math.floor(room.northWest.y) <= Math.floor(item.northWest.y) &&
  Math.floor(item.southWest.y) <= Math.floor(room.southWest.y);
export const itemIsBetweenLeftAndRightWall = (
  item: GeometryObject,
  room: GeometryObject
) =>
  Math.floor(room.northWest.x) < Math.floor(item.northWest.x) &&
  Math.floor(item.northEast.x) < Math.floor(room.northEast.x);
export const itemIsBetweenLeftAndRightWallInclusive = (
  item: GeometryObject,
  room: GeometryObject
) =>
  Math.floor(room.northWest.x) <= Math.floor(item.northWest.x) &&
  Math.floor(item.northEast.x) <= Math.floor(room.northEast.x);
