import { BaseItem } from '../../lib/items/itemTypes';

export interface PlacementState {
  x: number;
  y: number;
}

export interface ItemState extends BaseItem {
  id: string;
}

export interface PlaceableItemState extends ItemState {
  placement: PlacementState;
}
