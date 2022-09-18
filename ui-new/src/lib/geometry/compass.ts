import { Point } from '../point';

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
