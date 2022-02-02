import { feetToMm } from './conversions';
import { createBaseItem } from './items/item/base';
import { createGrowspaceItem } from './items/item/growspace';
import { createPotItem } from './items/item/pot';
import { BaseItem } from './items/itemTypes';

export interface IItemGroup {
  itemGroup: string;
  items: BaseItem[];
}

const ItemsLibrary: IItemGroup[] = [
  {
    itemGroup: 'pots',
    items: [
      createPotItem({
        name: 'Pot 1x1',
        width: feetToMm(1),
        length: feetToMm(1),
        height: feetToMm(1),
      }),
      createPotItem({
        name: 'Pot 2x2',
        width: feetToMm(2),
        length: feetToMm(2),
        height: feetToMm(2),
      }),
    ],
  },
  {
    itemGroup: 'climate',
    items: [
      createBaseItem({
        name: 'Climate',
        width: feetToMm(2),
        length: feetToMm(2),
        height: feetToMm(2),
      }),
    ],
  },
  {
    itemGroup: 'structure',
    items: [
      createGrowspaceItem({
        name: '36x36 tent',
        width: feetToMm(3),
        height: feetToMm(3),
        length: feetToMm(3),
      }),
    ],
  },
  {
    itemGroup: 'misc',
    items: [
      createBaseItem({ name: 'Chip Bag Clips' }),
      createBaseItem({ name: 'CO2 System' }),
      createBaseItem({ name: 'Extension Cords' }),
      createBaseItem({ name: 'Eye Protection' }),
      createBaseItem({ name: 'Measuring Spoons' }),
      createBaseItem({ name: 'Nutrients' }),
      createBaseItem({ name: 'PH adjuster' }),
      createBaseItem({ name: 'PH test' }),
      createBaseItem({ name: 'Plant Twist Tie' }),
      createBaseItem({ name: 'Plant yoyos' }),
      createBaseItem({ name: 'Rope Ratchets' }),
      createBaseItem({ name: 'Surge Protectors' }),
      createBaseItem({ name: 'Syringes' }),
      createBaseItem({ name: 'Timer' }),
      createBaseItem({ name: 'Zip Ties' }),
    ],
  },
];

export function itemGroup(name: string): BaseItem[] {
  const group = ItemsLibrary.find((group) => group.itemGroup === name);
  if (group === undefined) throw new Error(`Unknown item group: ${name}`);

  return group.items;
}

export default ItemsLibrary;
