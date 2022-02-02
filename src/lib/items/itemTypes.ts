import { PlaceableState } from '../../features/items/itemState';

export type ItemType = 'Base' | 'Pot' | 'Growspace';

export interface BaseItem {
  name: string;
  type: ItemType;
  width: number;
  length: number;
  height: number | undefined;
  placeable: PlaceableState | undefined;
}

export interface CreateItemProps {
  name?: string;
  type?: ItemType;
  width?: number;
  length?: number;
  height?: number | undefined;
}

export interface PlaceableItem extends BaseItem {
  placeable: PlaceableState;
}

export const isPlaceable = (
  item: BaseItem | PlaceableItem
): item is PlaceableItem => {
  return (item as PlaceableItem).placeable !== undefined;
};
