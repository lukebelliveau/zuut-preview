import { GeometryObject } from '../../lib/geometry/geometry';

export type ItemState = {
  id: string;
  type: string;
  name: string;
  x?: number;
  y?: number;
  width?: number;
  length?: number;
  height?: number;
  isColliding: boolean;
  placementShadow?: GeometryObject;
};
