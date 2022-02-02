import { BaseItem } from '../../lib/items/itemTypes';

export interface ItemState extends BaseItem {
  id: string;
}

export type CollisionStatus = 'GOOD' | 'BAD';
export interface CollisionError {
  id: string;
  message: string;
}
export interface CollisionState {
  status: CollisionStatus;
  errors: CollisionError[];
}

export interface PlacementState {
  x: number;
  y: number;
  collisionIds: string[];
  collisionState: CollisionState;
}

export interface PlaceableItemState extends ItemState {
  placement: PlacementState;
}
