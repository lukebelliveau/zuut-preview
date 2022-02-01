import Growspace from './items/growspace';
import GrowspaceItem from './items/growspaceItem';
import { Item } from './items/item';
import MiscItem from './items/miscItem';
import RoomItem from './items/roomItem';

export interface IItemGroup {
  itemGroup: string,
  items: Item[]
}

const ItemsLibrary: IItemGroup[] = [
  {
    itemGroup: 'pots',
    items: [
      new GrowspaceItem('Pot 1', undefined, undefined, undefined, 304.8, 304.8, 304.8),
      new GrowspaceItem('Pot 2', undefined, undefined, undefined, 304.8, 304.8, 304.8)
    ]
  },
  {
    itemGroup: 'climate',
    items: [new RoomItem('climate obj', undefined, undefined, undefined, 304.8, 304.8, 304.8)]
  },
  {
    itemGroup: 'structure',
    items: [new Growspace('24x24x36 tent', undefined, undefined, undefined, 7315.2, 7315.2, 10972.8)]
  },
  {
    itemGroup: 'misc',
    items: [
      new MiscItem('Chip Bag Clips'),
      new MiscItem('CO2 System'),
      new MiscItem('Extension Cords'),
      new MiscItem('Eye Protection'),
      new MiscItem('Measuring Spoons'),
      new MiscItem('Nutrients'),
      new MiscItem('PH adjuster'),
      new MiscItem('PH test'),
      new MiscItem('Plant Twist Tie'),
      new MiscItem('Plant yoyos'),
      new MiscItem('Rope Ratchets'),
      new MiscItem('Surge Protectors'),
      new MiscItem('Syringes'),
      new MiscItem('Timer'),
      new MiscItem('Zip Ties'),
    ]
  },
];

export function itemGroup(name: string): Item[] {
  const group = ItemsLibrary.find(group => group.itemGroup === name);
  if (group === undefined) throw new Error(`Unknown item group: ${name}`);

  return group.items;
}

export default ItemsLibrary;