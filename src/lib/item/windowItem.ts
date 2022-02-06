import { v4 } from 'uuid';
import { feetToMm } from '../conversions';
import ItemList from '../itemList';
import Playground from '../playground';
import { Point } from '../point';
import Room from '../room';
import PlaceableItem, { IPlaceableItem } from './placeableItem';

export const WINDOW_ITEM_TYPE = 'WindowItem';

export default class WindowItem
  extends PlaceableItem
  implements IPlaceableItem
{
  type: string = WINDOW_ITEM_TYPE;

  copy(): WindowItem {
    return new WindowItem(
      this.name,
      v4(),
      this.x,
      this.y,
      feetToMm(0.1),
      feetToMm(2),
      this.height
    );
  }

  setPosition(position: Point, items: ItemList, playground: Playground) {
    this.x = position.x;
    this.y = position.y;

    if (!playground.plan) throw new Error('Playground missing plan!');
    const room = playground.plan.room;
    if (!room) throw new Error('Playground missing room!');

    if (needsRotation(this, room)) {
      rotate90Degrees(this);
    }

    const collidingWithItems = items.some((otherItem) =>
      this.isCollidingWith(otherItem)
    );

    const placedOnWall = isPlacedOnAWall(this, room);

    this.isColliding = !placedOnWall && !collidingWithItems;
  }
}

const rotate90Degrees = (item: PlaceableItem) => {
  const { width, length } = item;

  item.length = width;
  item.width = length;
};

const windowIsAlignedWithLeftWall = (window: WindowItem, room: Room) =>
  window.x < room.x && room.x < window.x + window.width;
const windowIsAlignedWithRightWall = (window: WindowItem, room: Room) =>
  window.x < room.x + room.width &&
  room.x + room.width < window.x + window.width;
const windowIsBetweenTopAndBottomWall = (window: WindowItem, room: Room) =>
  room.y < window.y && window.y + window.length < room.y + room.length;

const windowIsAlignedWithBottomWall = (window: WindowItem, room: Room) =>
  window.y < room.y + room.length &&
  room.y + room.length < window.y + window.length;
const windowIsAlignedWithTopWall = (window: WindowItem, room: Room) =>
  window.y < room.y && room.y < window.y + window.length;
const windowIsBetweenLeftAndRightWall = (window: WindowItem, room: Room) =>
  room.x < window.x && window.x + window.width < room.x + room.width;

const windowIsVertical = (window: WindowItem) => window.length > window.width;
const windowIsHorizontal = (window: WindowItem) => !windowIsVertical(window);

const isPlacedOnAWall = (window: WindowItem, room: Room) => {
  if (
    isPlacedOnBottomWall(window, room) ||
    isPlacedOnTopWall(window, room) ||
    isPlacedOnLeftWall(window, room) ||
    isPlacedOnRightWall(window, room)
  ) {
    return true;
  }

  return false;
};

const needsRotation = (window: WindowItem, room: Room) => {
  if (
    isImproperlyPlacedOnBottomWall(window, room) ||
    isImproperlyPlacedOnTopWall(window, room) ||
    isImproperlyPlacedOnLeftWall(window, room) ||
    isImproperlyPlacedOnRightWall(window, room)
  ) {
    return true;
  }

  return false;
};

const isImproperlyPlacedOnBottomWall = (window: WindowItem, room: Room) => {
  return (
    windowIsAlignedWithBottomWall(window, room) &&
    windowIsBetweenLeftAndRightWall(window, room) &&
    windowIsVertical(window)
  );
};
const isImproperlyPlacedOnTopWall = (window: WindowItem, room: Room) => {
  return (
    windowIsAlignedWithTopWall(window, room) &&
    windowIsBetweenLeftAndRightWall(window, room) &&
    windowIsVertical(window)
  );
};
const isImproperlyPlacedOnLeftWall = (window: WindowItem, room: Room) => {
  return (
    windowIsAlignedWithLeftWall(window, room) &&
    windowIsBetweenTopAndBottomWall(window, room) &&
    windowIsHorizontal(window)
  );
};
const isImproperlyPlacedOnRightWall = (window: WindowItem, room: Room) => {
  return (
    windowIsAlignedWithRightWall(window, room) &&
    windowIsBetweenTopAndBottomWall(window, room) &&
    windowIsHorizontal(window)
  );
};

const isPlacedOnTopWall = (window: WindowItem, room: Room) => {
  return (
    windowIsAlignedWithTopWall(window, room) &&
    windowIsBetweenLeftAndRightWall(window, room) &&
    windowIsHorizontal(window)
  );
};
const isPlacedOnBottomWall = (window: WindowItem, room: Room) => {
  return (
    windowIsAlignedWithBottomWall(window, room) &&
    windowIsBetweenLeftAndRightWall(window, room) &&
    windowIsHorizontal(window)
  );
};
const isPlacedOnLeftWall = (window: WindowItem, room: Room) => {
  return (
    windowIsAlignedWithLeftWall(window, room) &&
    windowIsBetweenTopAndBottomWall(window, room) &&
    windowIsVertical(window)
  );
};
const isPlacedOnRightWall = (window: WindowItem, room: Room) => {
  return (
    windowIsAlignedWithRightWall(window, room) &&
    windowIsBetweenTopAndBottomWall(window, room) &&
    windowIsVertical(window)
  );
};
