import { v4 } from 'uuid';

import RectangleImage from '../../images/items/rectangle.svg';

import {
  areColliding,
  areExactlySharingBorder,
  computeNorthEast,
  computeNorthWest,
  computeSouthEast,
  computeSouthWest,
  GeometryObject,
} from '../geometry/geometry';
import ItemList from '../itemList';
import Playground from '../playground';
import { Point } from '../point';
import { IItem, Item } from '../item';
import ModifierItem from './modifierItem';
import { Layer } from '../layer';
import { LayerState } from '../../features/interactions/interactionsState';

export interface PlacementShadow extends GeometryObject {
  x: number;
  y: number;
  height: number | undefined;
  collisionState: CollisionState;
  offset: Point;
}

export enum CollisionState {
  NEUTRAL,
  CONFLICTED,
  CONNECTED,
}

export type Modifiers = { [key: string]: string[] };

export interface IPlaceableItem extends IItem, GeometryObject {
  place(position: Point): void;
  drag(position: Point, items: ItemList, playground: Playground): void;
  drop(items: ItemList, playground: Playground): boolean;
  updateCollisions(items: ItemList, playground: Playground): void;
  x: number;
  y: number;
  width: number;
  length: number;
  height: number | undefined;
  image: string;
  placementShadow: PlacementShadow | undefined;
  collisionState: CollisionState;
  layer: Layer;
  rotation: number;
  offset: Point;
  opacity: (layerState: LayerState) => number;
  modifiers: Modifiers;
  modifierImages: string[];
  removeAllModifiers(): void;
}

export function isPlaceableItem(item: Item): item is PlaceableItem {
  return (item as PlaceableItem).x !== undefined;
}

export default class PlaceableItem
  extends Item
  implements IPlaceableItem, GeometryObject
{
  x: number;
  y: number;
  width: number;
  length: number;
  height: number | undefined;
  collisionState: CollisionState;
  placementShadow: PlacementShadow | undefined;
  layer = Layer.FLOOR;
  rotation: number = 0;
  modifiers: Modifiers = {};

  constructor(
    name: string,
    id: string = v4(),
    x: number = 0,
    y: number = 0,
    width: number = 610,
    length: number = 610,
    height: number = 915,
    rotation: number = 0,
    modifiers: Modifiers = {},
    collisionState: CollisionState = CollisionState.NEUTRAL,
    placementShadow: PlacementShadow | undefined = undefined
  ) {
    super(name, id);
    this.x = x;
    this.y = y;
    this.width = width;
    this.length = length;
    this.height = height;
    this.collisionState = collisionState;
    this.placementShadow = placementShadow;
    this.rotation = rotation;
    this.modifiers = modifiers;
  }

  place(position: Point) {
    this.x = position.x;
    this.y = position.y;
  }

  drag(position: Point, items: ItemList, playground: Playground) {
    if (!playground || !playground.plan || !playground.plan.grid)
      throw new Error('Missing grid!');
    this.x = position.x;
    this.y = position.y;

    this.placementShadow = this.createDefaultPlacementShadow(
      position,
      playground
    );

    this.updateCollisions(items, playground);
  }

  drop(items: ItemList, playground: Playground) {
    if (this.placementShadow) {
      this.x = this.placementShadow.x;
      this.y = this.placementShadow.y;
      this.length = this.placementShadow.length;
      this.height = this.placementShadow.height;
      this.width = this.placementShadow.width;
      this.updateCollisions(items, playground);
      this.placementShadow = undefined;
      return true;
    } else {
      return false;
    }
  }

  createDefaultPlacementShadow(
    position: Point,
    playground: Playground
  ): PlacementShadow {
    if (!playground.plan || !playground.plan.grid)
      throw new Error('Missing grid!');

    const snappedPosition = playground.plan.grid.snapPostition(position);
    const offsetObject = {
      x: snappedPosition.x,
      y: snappedPosition.y,
      offset: this.offset,
    };

    const placementShadow: PlacementShadow = {
      ...offsetObject,
      width: this.width,
      height: this.height,
      length: this.length,
      collisionState: CollisionState.NEUTRAL,
      northWest: computeNorthWest(offsetObject),
      northEast: computeNorthEast(offsetObject),
      southWest: computeSouthWest(offsetObject),
      southEast: computeSouthEast(offsetObject),
    };

    return placementShadow;
  }

  protected itemHasConflicts(collidingWithItem: IPlaceableItem[]): boolean {
    return collidingWithItem.some((collidingItem) => {
      if (
        this.collisionStateBetween(this, collidingItem) ===
        CollisionState.CONFLICTED
      ) {
        return true;
      }
      return false;
    });
  }

  updateCollisions(items: ItemList, playground: Playground) {
    const { collidingWithItem, collidingWithShadow } = this.detectOverlaps(
      items,
      playground
    );

    if (this.itemHasConflicts(collidingWithItem)) {
      this.collisionState = CollisionState.CONFLICTED;
    } else {
      const itemHasConnections = collidingWithItem.some((collidingItem) => {
        if (
          this.collisionStateBetween(this, collidingItem) ===
          CollisionState.CONNECTED
        ) {
          return true;
        }
        return false;
      });

      if (itemHasConnections) this.collisionState = CollisionState.CONNECTED;
      else this.collisionState = CollisionState.NEUTRAL;
    }

    if (this.placementShadow) {
      const shadowHasConflicts = collidingWithShadow.some((collidingShadow) => {
        if (
          this.placementShadow &&
          this.collisionStateBetween(this.placementShadow, collidingShadow) ===
            CollisionState.CONFLICTED
        ) {
          return true;
        }
        return false;
      });

      if (shadowHasConflicts) {
        this.placementShadow = {
          ...this.placementShadow,
          collisionState: CollisionState.CONFLICTED,
        };
      } else {
        const shadowHasConnections = collidingWithShadow.some(
          (collidingShadow) => {
            if (
              this.placementShadow &&
              this.collisionStateBetween(
                this.placementShadow,
                collidingShadow
              ) === CollisionState.CONNECTED
            ) {
              return true;
            }
            return false;
          }
        );

        if (shadowHasConnections)
          this.placementShadow = {
            ...this.placementShadow,
            collisionState: CollisionState.CONNECTED,
          };
        else
          this.placementShadow = {
            ...this.placementShadow,
            collisionState: CollisionState.NEUTRAL,
          };
      }
    }
  }

  /* eslint-disable @typescript-eslint/no-unused-vars */
  protected detectOverlaps(
    items: ItemList,
    playground: Playground
  ): {
    collidingWithItem: IPlaceableItem[];
    collidingWithShadow: IPlaceableItem[];
  } {
    let collidingWithItem: IPlaceableItem[] = [];
    let collidingWithShadow: IPlaceableItem[] = [];

    items.placeable().forEach((itemToCompare) => {
      if (itemToCompare.id === this.id) return;
      if (areColliding(this, itemToCompare))
        collidingWithItem.push(itemToCompare);
      if (
        this.placementShadow &&
        areColliding(this.placementShadow, itemToCompare)
      ) {
        collidingWithShadow.push(itemToCompare);
      }
    });

    return {
      collidingWithItem: collidingWithItem,
      collidingWithShadow: collidingWithShadow,
    };
  }

  protected detectSharingBorders(items: ItemList): {
    sharingBorderWithItem: IPlaceableItem[];
    sharingBorderWithShadow: IPlaceableItem[];
  } {
    let sharingBorderWithItem: IPlaceableItem[] = [];
    let sharingBorderWithShadow: IPlaceableItem[] = [];

    items.placeable().forEach((itemToCompare) => {
      if (itemToCompare.id === this.id) return;
      if (areExactlySharingBorder(this, itemToCompare)) {
        sharingBorderWithItem.push(itemToCompare);
      }
      if (
        this.placementShadow &&
        areExactlySharingBorder(this.placementShadow, itemToCompare)
      ) {
        sharingBorderWithShadow.push(itemToCompare);
      }
    });

    return {
      sharingBorderWithItem: sharingBorderWithItem,
      sharingBorderWithShadow: sharingBorderWithShadow,
    };
  }

  collisionStateBetween(
    item: IPlaceableItem | PlacementShadow,
    otherItem: IPlaceableItem
  ): CollisionState {
    // default to "bad" collision state if any items are colliding
    return areColliding(item, otherItem)
      ? CollisionState.CONFLICTED
      : CollisionState.NEUTRAL;
  }

  rotate() {
    this.rotation = (this.rotation + 90) % 360;
    const oldWidth = this.width;
    this.width = this.length;
    this.length = oldWidth;
  }

  copy(): IPlaceableItem {
    return new PlaceableItem(
      this.name,
      v4(),
      this.x,
      this.y,
      this.width,
      this.length,
      this.height,
      this.rotation,
      this.modifiers
    );
  }

  get offset(): Point {
    return {
      x: this.width / 2,
      y: this.length / 2,
    };
  }

  get northWest(): Point {
    return computeNorthWest(this);
  }

  get northEast(): Point {
    return computeNorthEast(this);
  }

  get southWest(): Point {
    return computeSouthWest(this);
  }

  get southEast(): Point {
    return computeSouthEast(this);
  }

  opacity(layerState: LayerState): number {
    if (this.placementShadow) return 0.2;

    if (layerState[this.layer]) return 1;

    return 0.2;
  }

  get image() {
    return RectangleImage;
  }

  get modifierImages(): string[] {
    return [];
  }

  addModifier(modifier: ModifierItem): void {
    const newIdsForModifier = [...this.modifiers[modifier.name], modifier.id];

    const newModifiers = {
      ...this.modifiers,
      [modifier.name]: newIdsForModifier,
    };

    this.modifiers = newModifiers;
  }

  removeModifier(modifierToDelete: ModifierItem): void {
    const newIdsForModifier = this.modifiers[modifierToDelete.name].filter(
      (modifierId) => modifierId !== modifierToDelete.id
    );

    const newModifiers = {
      ...this.modifiers,
      [modifierToDelete.name]: newIdsForModifier,
    };

    this.modifiers = newModifiers;
  }

  removeAllModifiers(): void {
    this.modifiers = {};
  }
}
