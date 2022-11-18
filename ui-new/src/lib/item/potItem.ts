import { v4 } from 'uuid';

import {
  CollisionState,
  IPlaceableItem,
  Modifiers,
  PlaceableItemArgs,
  PlacementShadow,
} from './placeableItem';
import PotImage from '../../assets/items/pot.png';

import GrowspaceItem from './growspaceItem';
import { Item } from '../item';
import {
  BAMBOO_STICK,
  BINDER_CLIPS,
  COCO_COIR,
  initBambooStick,
  initBinderClips,
  initCocoCoir,
  initIrrigationSystem,
  initPlantTies,
  initPlantYoyos,
  initPotHolders,
  initSaucers,
  initSoil,
  initTrays,
  initWateringGlobes,
  IRRIGATION_SYSTEM,
  PLANT_TIES,
  PLANT_YOYOS,
  POT_HOLDERS,
  SAUCERS,
  SOIL,
  TRAYS,
  WATERING_GLOBES,
} from './initModifiers';

export const POT_ITEM_TYPE = 'PotItem';

export function isPotItem(item: Item): item is PotItem {
  return (item as PotItem).type === POT_ITEM_TYPE;
}

const defaultPotModifiers = {
  [IRRIGATION_SYSTEM]: initIrrigationSystem(),
  [WATERING_GLOBES]: initWateringGlobes(),
  [BAMBOO_STICK]: initBambooStick(),
  [SAUCERS]: initSaucers(),
  [TRAYS]: initTrays(),
  [POT_HOLDERS]: initPotHolders(),
  [SOIL]: initSoil(),
  [BINDER_CLIPS]: initBinderClips(),
  [PLANT_TIES]: initPlantTies(),
  // Seeds: [],
  [PLANT_YOYOS]: initPlantYoyos(),
  [COCO_COIR]: initCocoCoir(),
};

export default class PotItem extends GrowspaceItem implements IPlaceableItem {
  type: string = POT_ITEM_TYPE;

  constructor({
    name,
    id = v4(),
    recordId,
    amazonProducts,
    selectedAmazonASIN,
    linkedASINs,
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
    super({
      name,
      id,
      amazonProducts,
      width,
      length,
      height,
      recordId,
      selectedAmazonASIN,
      linkedASINs,
    });
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

  removeAllModifiers(): void {
    this.modifiers = defaultPotModifiers;
  }

  copy(): PotItem {
    const copiedPotItem = new PotItem(this.copyArgs());

    return copiedPotItem;
  }

  copyWithModifiers(): PotItem {
    return new PotItem(this.copyArgsWithModifiers());
  }
}
