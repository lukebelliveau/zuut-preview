import { IItem } from './item';
import PlaceableItem from './item/placeableItem';
import { sortSelectedToLast } from './itemList';

describe('sortSelectedToLast', () => {
  const itemList: IItem[] = [];
  const item0 = new PlaceableItem({ name: 'item0', amazonProducts: undefined });
  const item1 = new PlaceableItem({ name: 'item1', amazonProducts: undefined });
  const item2 = new PlaceableItem({ name: 'item2', amazonProducts: undefined });
  itemList.push(item0);
  itemList.push(item1);
  itemList.push(item2);

  it('returns empty list if items is of length 0', () => {
    const emptyItemList: IItem[] = [];
    const sortedItems = sortSelectedToLast(emptyItemList, []);

    expect(sortedItems).toEqual([]);
  });

  it('returns a list without mutating original list if selectedItemIds is empty', () => {
    const sortedItems = sortSelectedToLast(itemList, []);
    expect(itemList[0]).toBe(item0);
    expect(itemList[1]).toBe(item1);
    expect(itemList[2]).toBe(item2);

    expect(sortedItems[0]).toBe(item0);
    expect(sortedItems[1]).toBe(item1);
    expect(sortedItems[2]).toBe(item2);
  });

  it('returns a list without mutating original list with selected item at end', () => {
    const sortedItems = sortSelectedToLast(itemList, [item0.id]);

    expect(itemList[0]).toBe(item0);
    expect(itemList[1]).toBe(item1);
    expect(itemList[2]).toBe(item2);

    expect(sortedItems[2]).toBe(item0);
  });

  it('sorts multiple selected items to the end of the list', () => {
    const sortedItems = sortSelectedToLast(itemList, [item0.id, item1.id]);

    expect(itemList[0]).toBe(item0);
    expect(itemList[1]).toBe(item1);
    expect(itemList[2]).toBe(item2);

    expect(sortedItems[0]).toBe(item2);
    expect(sortedItems[1]).toBe(item0);
    expect(sortedItems[2]).toBe(item1);
  });
});
