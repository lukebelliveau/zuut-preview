import { Point } from '../point';

/**
 * Pure functions handy for checking the spatial relationship between two objects
 * and computing values based on these positions.
 */
export type GeometryObject = {
  x: number;
  y: number;
  height?: number;
  width: number;
  length: number;
  offset: Point;
};

export const isStraddlingBoundary = (
  item1: GeometryObject,
  item2: GeometryObject
) => {
  const isBetweenTopAndBottom = itemIsBetweenTopAndBottomWall(item1, item2);
  const isBetweenLeftAndRight = itemIsBetweenLeftAndRightWall(item1, item2);
  const isAlignedWithLeftWall = itemIsAlignedWithLeftWall(item1, item2);
  const isAlignedWithRightWall = itemIsAlignedWithRightWall(item1, item2);
  const isAlignedWithBottomWall = itemIsAlignedWithBottomWall(item1, item2);
  const isAlignedWithTopWall = itemIsAlignedWithTopWall(item1, item2);
  if (isAlignedWithLeftWall || isAlignedWithRightWall) {
    if (
      isBetweenTopAndBottom ||
      isAlignedWithTopWall ||
      isAlignedWithBottomWall ||
      item1.y - item1.offset.y === item2.y - item1.offset.y ||
      item1.y + item1.offset.y === item2.y + item2.offset.y
    ) {
      return true;
    }
  } else if (isAlignedWithTopWall || isAlignedWithBottomWall) {
    if (
      isBetweenLeftAndRight ||
      isAlignedWithLeftWall ||
      isAlignedWithRightWall ||
      item1.x - item1.offset.x === item2.x - item2.offset.x ||
      item1.x + item1.offset.x === item2.x + item2.offset.x
    ) {
      return true;
    }
  }
  return false;
};

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

/*
  For these calculations, the x,y position of the item is its center due 
  to Konva's implementation of drawing Rects and how they need to be rotated
  around the center.
  
  top left corner: x - offset.x, y - offset.y
  top right corner: x + offset.x, y - offset.y
  bottom right corner: x + offset.x, y + offset.y
  bottom left corner: x - offset.x, y + offset.y
*/
export const areColliding = (item1: GeometryObject, item2: GeometryObject) => {
  return !(
    Math.floor(item2.x - item2.offset.x) >= Math.floor(item1.x + item1.offset.x) || // left border of item2 is to the right of item1 right border
    Math.floor(item2.x + item2.offset.x) <= Math.floor(item1.x - item1.offset.x) || // right border of item2 is to the left of item1 left border
    Math.floor(item2.y - item2.offset.y) >= Math.floor(item1.y + item1.offset.y) || // top border of item2 is below bottom border of item1
    Math.floor(item2.y + item2.offset.y) <= Math.floor(item1.y - item1.offset.y)    // bottom border of item2 is above top border of item1
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
    Math.floor(item1.x + item1.offset.x) === Math.floor(item2.x - item2.offset.x) &&
    Math.floor(item1.y - item1.offset.y) === Math.floor(item2.y - item2.offset.y) &&
    Math.floor(item1.length) === Math.floor(item2.length)
  ) {
    return true;
  }

  // item1's left border and item2's right border
  if (
    Math.floor(item2.x + item2.offset.x) === Math.floor(item1.x - item1.offset.x) &&
    Math.floor(item1.y - item1.offset.y) === Math.floor(item2.y - item2.offset.y) &&
    Math.floor(item1.length) === Math.floor(item2.length)
  ) {
    return true;
  }

  // item1's top border and item2's bottom border
  if (
    Math.floor(item1.y + item1.offset.y) === Math.floor(item2.y - item2.offset.y) &&
    Math.floor(item1.x - item1.offset.x) === Math.floor(item2.x - item2.offset.x) &&
    Math.floor(item1.width) === Math.floor(item2.width)
  ) {
    return true;
  }

  // item1's bottom border and item2's top border
  if (
    Math.floor(item2.y - item2.offset.y) === Math.floor(item1.y + item1.offset.y) &&
    Math.floor(item1.x - item1.offset.x) === Math.floor(item2.x + item2.offset.x) &&
    Math.floor(item1.width) === Math.floor(item2.width)
  ) {
    return true;
  }

  return false;
};

const distanceFromExteriorLeftWall = (
  interiorItem: GeometryObject,
  exteriorItem: GeometryObject
) => {
  return interiorItem.x - exteriorItem.x;
};
const distanceFromExteriorRightWall = (
  interiorItem: GeometryObject,
  exteriorItem: GeometryObject
) => {
  return (
    exteriorItem.x + exteriorItem.width - (interiorItem.x + interiorItem.width)
  );
};
const distanceFromExteriorTopWall = (
  interiorItem: GeometryObject,
  exteriorItem: GeometryObject
) => {
  return interiorItem.y - exteriorItem.y;
};
const distanceFromExteriorBottomWall = (
  interiorItem: GeometryObject,
  exteriorItem: GeometryObject
) => {
  return (
    exteriorItem.y +
    exteriorItem.length -
    (interiorItem.y + interiorItem.length)
  );
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
    const position = { x: exteriorItem.x, y: interiorItem.y };
    return {
      stickingTo: 'left',
      position,
      distance: left,
    };
  } else if (closestToRightWall({ left, right, bottom, top })) {
    const position = {
      x: exteriorItem.x + exteriorItem.width,
      y: interiorItem.y,
    };
    return {
      stickingTo: 'right',
      position,
      distance: right,
    };
  } else if (closestToTopWall({ left, right, bottom, top })) {
    const position = { x: interiorItem.x, y: exteriorItem.y };
    return {
      stickingTo: 'top',
      position,
      distance: top,
    };
  } else {
    const position = {
      x: interiorItem.x,
      y: exteriorItem.y + exteriorItem.length,
    };
    return {
      stickingTo: 'bottom',
      position,
      distance: bottom,
    };
  }
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
    offset: item1.offset,
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
    offset: item1.offset,
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
    offset: item1.offset,
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
    offset: item1.offset,
  };
};
