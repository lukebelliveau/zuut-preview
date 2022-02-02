import { BaseItem } from '../../lib/items/itemTypes';

export interface PlaceableState {
  x: number;
  y: number;
}

export interface ItemState extends BaseItem {
  id: string;
  placeable: PlaceableState | undefined;
}

export interface PlaceableItemState extends ItemState {
  placeable: PlaceableState;
}
