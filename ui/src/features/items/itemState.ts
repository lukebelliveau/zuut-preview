import { PlacementShadow } from '../../lib/item/placeableItem';

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
  placementShadow?: PlacementShadow;
};
