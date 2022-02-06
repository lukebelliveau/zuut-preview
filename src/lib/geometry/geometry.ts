import PlaceableItem from '../item/placeableItem';
import Room from '../room';

/**
 * Pure functions handy for checking the spatial relationship between two objects
 */
type GeometryObject = PlaceableItem | Room;

export const itemIsAlignedWithLeftWall = (
  item: GeometryObject,
  room: GeometryObject
) => item.x < room.x && room.x < item.x + item.width;
export const itemIsAlignedWithRightWall = (
  item: GeometryObject,
  room: GeometryObject
) => item.x < room.x + room.width && room.x + room.width < item.x + item.width;
export const itemIsBetweenTopAndBottomWall = (
  item: GeometryObject,
  room: GeometryObject
) => room.y < item.y && item.y + item.length < room.y + room.length;

export const itemIsAlignedWithBottomWall = (
  item: GeometryObject,
  room: GeometryObject
) =>
  item.y < room.y + room.length && room.y + room.length < item.y + item.length;
export const itemIsAlignedWithTopWall = (
  item: GeometryObject,
  room: GeometryObject
) => item.y < room.y && room.y < item.y + item.length;
export const itemIsBetweenLeftAndRightWall = (
  item: GeometryObject,
  room: GeometryObject
) => room.x < item.x && item.x + item.width < room.x + room.width;

export const itemHasVerticalOrientation = (item: GeometryObject) =>
  item.length > item.width;
export const itemHasHorizontalOrientation = (item: GeometryObject) =>
  !itemHasVerticalOrientation(item);
