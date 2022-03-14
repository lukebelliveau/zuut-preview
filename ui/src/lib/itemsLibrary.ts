import Growspace from './item/growspace';
import { Item } from './item';
import MiscItem from './item/miscItem';
import RoomItem from './item/roomItem';
import PotItem from './item/potItem';
import { feetToMm } from './conversions';
import LightItem from './item/lightItem';
import DuctItem from './item/ductItem';

export type IItemGroup = {
  itemGroup: string;
  items: Item[];
};

const ItemsLibrary: IItemGroup[] = [
  {
    itemGroup: 'pots',
    items: [
      new PotItem(
        'Pot 1x1',
        undefined,
        undefined,
        undefined,
        feetToMm(1),
        feetToMm(1),
        feetToMm(1)
      ),
      new PotItem(
        'Pot 2x2',
        undefined,
        undefined,
        undefined,
        feetToMm(2),
        feetToMm(2),
        feetToMm(2)
      ),
    ],
  },
  {
    itemGroup: 'lights',
    items: [
      new LightItem(
        'Light 1x1',
        undefined,
        undefined,
        undefined,
        feetToMm(1),
        feetToMm(1),
        feetToMm(1)
      ),
      new LightItem(
        'Light 2x2',
        undefined,
        undefined,
        undefined,
        feetToMm(2),
        feetToMm(2),
        feetToMm(2)
      ),
    ],
  },
  {
    itemGroup: 'climate',
    items: [
      new RoomItem(
        'climate obj',
        undefined,
        undefined,
        undefined,
        304.8,
        304.8,
        304.8
      ),
    ],
  },
  {
    itemGroup: 'structure',
    items: [
      new Growspace(
        '24x24x36 tent',
        undefined,
        undefined,
        undefined,
        609.6,
        609.6,
        914.4
      ),
      new DuctItem(
        'duct',
        undefined,
        undefined,
        undefined,
        feetToMm(1),
        feetToMm(1),
        feetToMm(1)
      ),
    ],
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
    ],
  },
];

export function itemGroup(name: string): Item[] {
  const group = ItemsLibrary.find((group) => group.itemGroup === name);
  if (group === undefined) throw new Error(`Unknown item group: ${name}`);

  return group.items;
}

export default ItemsLibrary;
