import { v4 } from 'uuid';

import {
  CollisionState,
  IPlaceableItem,
  Modifiers,
  PlaceableItemArgs,
  PlacementShadow,
} from './placeableItem';
import PotImage from '../../images/items/pot.png';
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

  constructor({
    name,
    id = v4(),
    recordId,
    amazonProducts = undefined,
    x = 0,
    y = 0,
    width = 610,
    length = 610,
    height = 915,
    description = '',
    rotation = 0,
    modifiers = defaultPotModifiers,
    collisionState = CollisionState.NEUTRAL,
    placementShadow = undefined,
  }: PlaceableItemArgs) {
    super({ name, id, amazonProducts, width, length, height, recordId });
    this.x = x;
    this.y = y;
    this.description = description;
    this.collisionState = collisionState;
    this.placementShadow = placementShadow;
    this.rotation = rotation;
    this.modifiers = modifiers;
  }

  get image() {
    return PotImage;
  }

  // get modifierImages() {
  //   const modifierImages = [];
  //   if (this.modifiers.Soil.length > 0) {
  //     modifierImages.push(SoilModImage);
  //   }

  //   return modifierImages;
  // }

  removeAllModifiers(): void {
    this.modifiers = defaultPotModifiers;
  }

  copy(): PotItem {
    const copiedPotItem = new PotItem({
      name: this.name,
      recordId: this.recordId,
      id: v4(),
      x: this.x,
      y: this.y,
      width: this.width,
      length: this.length,
      height: this.height,
      description: this.description,
      rotation: this.rotation,
      modifiers: this.modifiers,
      amazonProducts: this.amazonProducts,
    });

    return copiedPotItem;
  }
}
