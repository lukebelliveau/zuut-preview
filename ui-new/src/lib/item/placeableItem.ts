import { v4 } from 'uuid';

import RectangleImage from '../../assets/items/rectangle.png';

import {
  areColliding,
  areExactlySharingBorder,
  computeNorthEast,
  computeNorthWest,
  computeSouthEast,
  computeSouthWest,
  isStraddlingBoundary,
} from '../geometry/geometry';
import Playground from '../playground';
import { Point } from '../point';
import { AmazonProduct, IItem, Item, ItemArgs } from '../item';
import ModifierItem from './modifierItem';
import { Layer } from '../layer';
import { LayerState } from '../../redux/features/interactions/interactionsState';
import { normalizeMmTo3Inches } from '../conversions';
import { GeometryObject } from '../geometry/GeometryObject';

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

export interface Modifier {
  ids: string[];
  recordId?: string;
  name: string;
}

export type Modifiers = { [key: string]: Modifier };

export interface IPlaceableItem extends IItem, GeometryObject {
  place(position: Point): void;
  drag(position: Point, items: IItem[], playground: Playground): void;
  drop(items: IItem[], playground: Playground): boolean;
  updateCollisions(items: IItem[], playground: Playground): void;
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
  description: string;
  amazonProducts?: AmazonProduct[] | undefined;
}

export function isPlaceableItem(item: Item): item is PlaceableItem {
  return (item as PlaceableItem).x !== undefined;
}

export interface PlaceableItemArgs extends ItemArgs {
  x?: number;
  y?: number;
  width?: number;
  length?: number;
  height?: number | undefined;
  description?: string;
  rotation?: number;
  modifiers?: Modifiers;
  collisionState?: CollisionState;
  placementShadow?: PlacementShadow | undefined;
}

export default class PlaceableItem extends Item implements IPlaceableItem, GeometryObject {
  x: number;
  y: number;
  width: number;
  length: number;
  height: number | undefined;
  collisionState: CollisionState;
  placementShadow: PlacementShadow | undefined;
  layer = Layer.FLOOR;
  rotation = 0;
  modifiers: Modifiers = {};
  description = '';

  constructor({
    name,
    id = v4(),
    amazonProducts = undefined,
    recordId,
    x = 0,
    y = 0,
    width = 610,
    length = 610,
    height = 915,
    description = '',
    rotation = 0,
    modifiers = {},
    collisionState = CollisionState.NEUTRAL,
    placementShadow = undefined,
  }: PlaceableItemArgs) {
    super({ name, id, amazonProducts, recordId });
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
    this.recordId = recordId;
  }

  place(position: Point) {
    this.x = position.x;
    this.y = position.y;
  }

  drag(position: Point, items: IItem[], playground: Playground) {
    if (!playground || !playground.plan || !playground.plan.grid) throw new Error('Missing grid!');
    this.x = position.x;
    this.y = position.y;

    this.placementShadow = this.createDefaultPlacementShadow(position, playground);

    this.updateCollisions(items, playground);
  }

  drop(items: IItem[], playground: Playground) {
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

  createDefaultPlacementShadow(position: Point, playground: Playground): PlacementShadow {
    if (!playground.plan || !playground.plan.grid) throw new Error('Missing grid!');

    // const snappedPosition = playground.plan.grid.snapPosition(position);
    const snappedPosition = playground.plan.grid.snapOffsetPosition(
      position,
      this.offset,
      this.rotation !== 0 && this.rotation !== 180
    );
    const offsetObject = {
      x: snappedPosition.x,
      y: snappedPosition.y,
      width: this.width,
      length: this.length,
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
      if (this.collisionStateBetween(this, collidingItem) === CollisionState.CONFLICTED) {
        return true;
      }
      return false;
    });
  }

  isCollidingWithPlanWall(playground: Playground) {
    /**
     * hacky way to detect collisions between items and plan wall
     */
    if (!playground.plan || playground.plan.length === undefined) {
      throw new Error('Tried to update collisions, but no plan found!');
    }
    const planGeometryObject: GeometryObject = {
      northEast: playground.plan.northEast,
      northWest: playground.plan.northWest,
      southEast: playground.plan.southEast,
      southWest: playground.plan.southWest,
      length: playground.plan.length || 0,
      width: playground.plan.width || 0,
    };

    return isStraddlingBoundary(this, planGeometryObject);
  }

  updateCollisions(items: IItem[], playground: Playground) {
    const { collidingWithItem, collidingWithShadow } = this.detectOverlaps(items, playground);

    if (this.isCollidingWithPlanWall(playground)) {
      this.collisionState = CollisionState.CONFLICTED;
    }
    // end of gross hack to detect plan wall
    else if (this.itemHasConflicts(collidingWithItem)) {
      this.collisionState = CollisionState.CONFLICTED;
    } else {
      const itemHasConnections = collidingWithItem.some((collidingItem) => {
        if (this.collisionStateBetween(this, collidingItem) === CollisionState.CONNECTED) {
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
        const shadowHasConnections = collidingWithShadow.some((collidingShadow) => {
          if (
            this.placementShadow &&
            this.collisionStateBetween(this.placementShadow, collidingShadow) ===
              CollisionState.CONNECTED
          ) {
            return true;
          }
          return false;
        });

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
    items: IItem[],
    playground: Playground
  ): {
    collidingWithItem: IPlaceableItem[];
    collidingWithShadow: IPlaceableItem[];
  } {
    let collidingWithItem: IPlaceableItem[] = [];
    let collidingWithShadow: IPlaceableItem[] = [];

    items.filter(isPlaceableItem).forEach((itemToCompare: IPlaceableItem) => {
      if (itemToCompare.id === this.id) return;
      if (areColliding(this, itemToCompare)) {
        collidingWithItem.push(itemToCompare);
      }
      if (this.placementShadow && areColliding(this.placementShadow, itemToCompare)) {
        collidingWithShadow.push(itemToCompare);
      }
    });

    return {
      collidingWithItem: collidingWithItem,
      collidingWithShadow: collidingWithShadow,
    };
  }

  protected detectSharingBorders(items: IItem[]): {
    sharingBorderWithItem: IPlaceableItem[];
    sharingBorderWithShadow: IPlaceableItem[];
  } {
    let sharingBorderWithItem: IPlaceableItem[] = [];
    let sharingBorderWithShadow: IPlaceableItem[] = [];

    items.filter(isPlaceableItem).forEach((itemToCompare: IPlaceableItem) => {
      if (itemToCompare.id === this.id) return;
      if (areExactlySharingBorder(this, itemToCompare)) {
        sharingBorderWithItem.push(itemToCompare);
      }
      if (this.placementShadow && areExactlySharingBorder(this.placementShadow, itemToCompare)) {
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
    return areColliding(item, otherItem) ? CollisionState.CONFLICTED : CollisionState.NEUTRAL;
  }

  rotate() {
    this.rotation = (this.rotation + 90) % 360;
  }

  rotateCcw() {
    this.rotation = (this.rotation + 270) % 360;
  }

  copy(): IPlaceableItem {
    return new PlaceableItem({
      name: this.name,
      id: v4(),
      x: this.x,
      y: this.y,
      width: this.width,
      length: this.length,
      height: this.height,
      description: this.description,
      amazonProducts: this.amazonProducts,
    });
  }

  xPlus50() {
    return this.x + 50;
  }

  yPlus50() {
    return this.y + 50;
  }

  copyWithModifiers(): IPlaceableItem {
    return new PlaceableItem({
      name: this.name,
      id: v4(),
      x: this.xPlus50(),
      y: this.yPlus50(),
      width: this.width,
      length: this.length,
      height: this.height,
      description: this.description,
      amazonProducts: this.amazonProducts,
      modifiers: this.modifiers,
    });
  }

  get offset(): Point {
    return {
      x: this.width / 2,
      y: this.length / 2,
    };
  }

  get northWest(): Point {
    const { x, y } = computeNorthWest(this);
    return {
      x: normalizeMmTo3Inches(x),
      y: normalizeMmTo3Inches(y),
    };
  }

  get northEast(): Point {
    const { x, y } = computeNorthEast(this);
    return {
      x: normalizeMmTo3Inches(x),
      y: normalizeMmTo3Inches(y),
    };
  }

  get southWest(): Point {
    const { x, y } = computeSouthWest(this);
    return {
      x: normalizeMmTo3Inches(x),
      y: normalizeMmTo3Inches(y),
    };
  }

  get southEast(): Point {
    const { x, y } = computeSouthEast(this);
    return {
      x: normalizeMmTo3Inches(x),
      y: normalizeMmTo3Inches(y),
    };
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
    const newModifier = {
      ...this.modifiers[modifier.name],
      ids: [...this.modifiers[modifier.name].ids, modifier.id],
    };

    const newModifiers = {
      ...this.modifiers,
      [modifier.name]: newModifier,
    };

    this.modifiers = newModifiers;
  }

  removeModifier(modifierToDelete: ModifierItem): void {
    const newIdsForModifier = this.modifiers[modifierToDelete.name].ids.filter(
      (modifierId) => modifierId !== modifierToDelete.id
    );

    const newModifiers = {
      ...this.modifiers,
      [modifierToDelete.name]: { ...modifierToDelete, ids: newIdsForModifier },
    };

    this.modifiers = newModifiers;
  }

  removeAllModifiers(): void {
    this.modifiers = {};
  }
}
