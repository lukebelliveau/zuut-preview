import { Point } from '../point';
import { normalizeMmTo3Inches } from '../conversions';

/**
 * Pure functions handy for checking the spatial relationship between two objects
 * and computing values based on these positions.
 */
export type GeometryObject = {
  northWest: Point;
  northEast: Point;
  southWest: Point;
  southEast: Point;
  length: number;
  width: number;
};

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
  const isAlignedWithLeftWall = itemStraddlesLeftYAxis(item1, item2);
  const isAlignedWithRightWall = itemIsAlignedWithRightWall(item1, item2);
  const isAlignedWithBottomWall = itemIsAlignedWithBottomWall(item1, item2);
  const isAlignedWithTopWall = itemIsAlignedWithTopWall(item1, item2);

  if (isAlignedWithLeftWall || isAlignedWithRightWall) {
    if (
      isBetweenTopAndBottom ||
      isAlignedWithTopWall ||
      isAlignedWithBottomWall ||
      item1.northWest.y === item2.northWest.y ||
      item1.southWest.y === item2.southWest.y
    ) {
      return true;
    }
  } else if (isAlignedWithTopWall || isAlignedWithBottomWall) {
    if (
      isBetweenLeftAndRight ||
      isAlignedWithLeftWall ||
      isAlignedWithRightWall ||
      item1.northWest.x === item2.northWest.x ||
      item1.northEast.x === item2.northEast.x
    ) {
      return true;
    }
  }
  return false;
};

export const itemStraddlesLeftYAxis = (
  item: GeometryObject,
  room: GeometryObject
) => {
  return (
    Math.floor(item.northWest.x) < Math.floor(room.northWest.x) &&
    Math.floor(room.northWest.x) < Math.floor(item.northEast.x)
  );
};
export const itemIsAlignedWithRightWall = (
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

export const itemIsAlignedWithBottomWall = (
  item: GeometryObject,
  room: GeometryObject
) =>
  Math.floor(item.northWest.y) < Math.floor(room.southWest.y) &&
  Math.floor(room.southWest.y) < Math.floor(item.southWest.y);
export const itemIsAlignedWithTopWall = (
  item: GeometryObject,
  room: GeometryObject
) =>
  Math.floor(item.northWest.y) < Math.floor(room.northWest.y) &&
  Math.floor(room.northWest.y) < Math.floor(item.southWest.y);
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

export const itemHasVerticalOrientation = (item: GeometryObject) =>
  item.length > item.width;
export const itemHasHorizontalOrientation = (item: GeometryObject) =>
  !itemHasVerticalOrientation(item);

export const areColliding = (item1: GeometryObject, item2: GeometryObject) => {
  return !(
    Math.floor(item2.northWest.x) >= Math.floor(item1.northEast.x) ||
    Math.floor(item2.northEast.x) <= Math.floor(item1.northWest.x) ||
    Math.floor(item2.northWest.y) >= Math.floor(item1.southWest.y) ||
    Math.floor(item2.southWest.y) <= Math.floor(item1.northWest.y)
  );
};

/**
 * "exactly sharing" = the shared borders have the same origin & length.
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

const distanceFromExteriorLeftWall = (
  interiorItem: GeometryObject,
  exteriorItem: GeometryObject
) => {
  return interiorItem.northWest.x - exteriorItem.northWest.x;
};
const distanceFromExteriorRightWall = (
  interiorItem: GeometryObject,
  exteriorItem: GeometryObject
) => {
  return exteriorItem.northEast.x - interiorItem.northEast.x;
};
const distanceFromExteriorTopWall = (
  interiorItem: GeometryObject,
  exteriorItem: GeometryObject
) => {
  return interiorItem.northWest.y - exteriorItem.northWest.y;
};
const distanceFromExteriorBottomWall = (
  interiorItem: GeometryObject,
  exteriorItem: GeometryObject
) => {
  return exteriorItem.southWest.y - interiorItem.southWest.y;
};

interface WallDistances {
  left: number;
  right: number;
  top: number;
  bottom: number;
}

export const closestToLeftWall = ({
  left,
  right,
  top,
  bottom,
}: WallDistances) => {
  return left < right && left < top && left < bottom;
};
export const closestToRightWall = ({
  left,
  right,
  top,
  bottom,
}: WallDistances) => {
  return right < left && right < top && right < bottom;
};
export const closestToTopWall = ({
  left,
  right,
  top,
  bottom,
}: WallDistances) => {
  return top < left && top < right && top < bottom;
};
export const closestToBottomWall = ({
  left,
  right,
  top,
  bottom,
}: WallDistances) => {
  return bottom < left && bottom < right && bottom < top;
};

type WallOrientation = 'left' | 'right' | 'top' | 'bottom';

export const findClosestWallPointToInteriorItem = (
  interiorItem: GeometryObject,
  exteriorItem: GeometryObject
): { stickingTo: WallOrientation; position: Point; distance: number } => {
  const left = distanceFromExteriorLeftWall(interiorItem, exteriorItem);
  const right = distanceFromExteriorRightWall(interiorItem, exteriorItem);
  const bottom = distanceFromExteriorBottomWall(interiorItem, exteriorItem);
  const top = distanceFromExteriorTopWall(interiorItem, exteriorItem);

  if (closestToLeftWall({ left, right, bottom, top })) {
    const position = {
      x: exteriorItem.northWest.x,
      y: interiorItem.northWest.y,
    };
    return {
      stickingTo: 'left',
      position,
      distance: left,
    };
  } else if (closestToRightWall({ left, right, bottom, top })) {
    const position = {
      x: exteriorItem.northWest.x + exteriorItem.width,
      y: interiorItem.northWest.y,
    };
    return {
      stickingTo: 'right',
      position,
      distance: right,
    };
  } else if (closestToTopWall({ left, right, bottom, top })) {
    const position = {
      x: interiorItem.northWest.x,
      y: exteriorItem.northWest.y,
    };
    return {
      stickingTo: 'top',
      position,
      distance: top,
    };
  } else {
    const position = {
      x: interiorItem.northWest.x,
      y: exteriorItem.southWest.y,
    };
    return {
      stickingTo: 'bottom',
      position,
      distance: bottom,
    };
  }
};

interface PlaceableObject {
  x: number;
  y: number;
  width: number;
  length: number;
  offset: Point;
}

export interface OffsetObject {
  x: number;
  y: number;
  offset: Point;
  width: number;
  length: number;
  rotation?: number;
}

export const computeNorthWest = (offsetObject: OffsetObject): Point => {
  if (
    !offsetObject.rotation ||
    offsetObject.rotation === 0 ||
    offsetObject.rotation === 180
  ) {
    return {
      x: Math.round(offsetObject.x - offsetObject.offset.x),
      y: Math.round(offsetObject.y - offsetObject.offset.y),
    };
  } else {
    return {
      x: Math.round(offsetObject.x - offsetObject.offset.y),
      y: Math.round(offsetObject.y - offsetObject.offset.x),
    };
  }
};

export const computeNorthEast = (offsetObject: OffsetObject): Point => {
  const northWest = computeNorthWest(offsetObject);
  if (
    !offsetObject.rotation ||
    offsetObject.rotation === 0 ||
    offsetObject.rotation === 180
  ) {
    return {
      x: northWest.x + offsetObject.width,
      y: northWest.y,
    };
  } else {
    return {
      x: northWest.x + offsetObject.length,
      y: northWest.y,
    };
  }
};

export const computeSouthWest = (offsetObject: OffsetObject): Point => {
  const northWest = computeNorthWest(offsetObject);
  if (
    !offsetObject.rotation ||
    offsetObject.rotation === 0 ||
    offsetObject.rotation === 180
  ) {
    return {
      x: northWest.x,
      y: northWest.y + offsetObject.length,
    };
  } else {
    return {
      x: northWest.x,
      y: northWest.y + offsetObject.width,
    };
  }
};

export const computeSouthEast = (offsetObject: OffsetObject): Point => {
  const northWest = computeNorthWest(offsetObject);
  if (
    !offsetObject.rotation ||
    offsetObject.rotation === 0 ||
    offsetObject.rotation === 180
  ) {
    return {
      x: northWest.x + offsetObject.width,
      y: northWest.y + offsetObject.length,
    };
  } else {
    return {
      x: northWest.x + offsetObject.length,
      y: northWest.y + offsetObject.width,
    };
  }
};
