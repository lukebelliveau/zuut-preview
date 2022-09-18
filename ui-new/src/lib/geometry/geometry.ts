import { Point } from '../point';
import { areColliding } from './areColliding';
import { areExactlySharingBorder } from './areExactlySharingBorder';
import { GeometryObject } from './GeometryObject';
import { isStraddlingBoundary } from './isStraddlingBoundary';
import {
  computeNorthEast,
  computeNorthWest,
  computeSouthEast,
  computeSouthWest,
  OffsetObject,
} from './compass';

export {
  areColliding,
  areExactlySharingBorder,
  isStraddlingBoundary,
  computeNorthEast,
  computeNorthWest,
  computeSouthEast,
  computeSouthWest,
};

export type { OffsetObject };

/**
 * Pure functions handy for checking the spatial relationship between two objects
 * and computing values based on these positions.
 */
export const itemHasVerticalOrientation = (item: GeometryObject) =>
  item.length > item.width;
export const itemHasHorizontalOrientation = (item: GeometryObject) =>
  !itemHasVerticalOrientation(item);

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
