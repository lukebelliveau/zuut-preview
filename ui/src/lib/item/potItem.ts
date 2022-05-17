import { v4 } from 'uuid';

import {
  CollisionState,
  IPlaceableItem,
  Modifiers,
  PlacementShadow,
} from './placeableItem';
import PotImage from '../../images/items/pot/pot.svg';
import SoilModImage from '../../images/items/pot/soilMod.svg';

import GrowspaceItem from './growspaceItem';
import { Item } from '../item';

export const POT_ITEM_TYPE = 'PotItem';

export function isPotItem(item: Item): item is PotItem {
  return (item as PotItem).type === POT_ITEM_TYPE;
}

const defaultPotModifiers = {
  'Irrigation System': [],
  'Watering globes': [],
  'Bamboo Stick': [],
  Saucers: [],
  Trays: [],
  'Pot holders': [],
  Soil: [],
  'Binder clips': [],
  'Plant ties': [],
  Seeds: [],
  'Plant Yoyos': [],
  'Coco Coir': [],
};
export default class PotItem extends GrowspaceItem implements IPlaceableItem {
  type: string = POT_ITEM_TYPE;

  constructor(
    name: string,
    id: string = v4(),
    x: number = 0,
    y: number = 0,
    width: number = 610,
    length: number = 610,
    height: number = 915,
    description: string = '',
    rotation: number = 0,
    modifiers: Modifiers = defaultPotModifiers,
    collisionState: CollisionState = CollisionState.NEUTRAL,
    placementShadow: PlacementShadow | undefined = undefined
  ) {
    super(name, id);
    this.x = x;
    this.y = y;
    this.width = width;
    this.length = length;
    this.height = height;
    this.description = description;
    this.collisionState = collisionState;
    this.placementShadow = placementShadow;
    this.rotation = rotation;
    this.modifiers = modifiers;
  }

  get image() {
    return PotImage;
  }

  get modifierImages() {
    const modifierImages = [];
    if (this.modifiers.Soil.length > 0) {
      modifierImages.push(SoilModImage);
    }

    return modifierImages;
  }

  removeAllModifiers(): void {
    this.modifiers = defaultPotModifiers;
  }

  copy(): PotItem {
    return new PotItem(
      this.name,
      v4(),
      this.x,
      this.y,
      this.width,
      this.length,
      this.height,
      this.description,
      this.rotation,
      this.modifiers
    );
  }
}
