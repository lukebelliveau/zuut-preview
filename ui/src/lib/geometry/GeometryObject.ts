import { Point } from '../point';

export type GeometryObject = {
  northWest: Point;
  northEast: Point;
  southWest: Point;
  southEast: Point;
  length: number;
  width: number;
};
