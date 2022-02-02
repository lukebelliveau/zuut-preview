import { PlacementState } from '../../features/items/itemState';

export type ItemType = 'Base' | 'Pot' | 'Growspace';

export interface BaseItem {
  name: string;
  type: ItemType;
  width: number;
  length: number;
  height: number | undefined;
  placement: PlacementState | undefined;
  image: string | undefined;
}

export interface CreateItemProps {
  name?: string;
  type?: ItemType;
  width?: number;
  length?: number;
  height?: number | undefined;
}

export interface PlaceableItem extends BaseItem {
  placement: PlacementState;
}
