import Growspace from './item/growspace';
import { Item } from './item';
import MiscItem from './item/miscItem';
import RoomItem from './item/roomItem';
import PotItem from './item/potItem';
import { feetToMm, inchesToMm } from './conversions';
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
        '1 Gallon Pot',
        undefined,
        undefined,
        undefined,
        inchesToMm(6.4),
        inchesToMm(6.4),
        inchesToMm(7.9),
        '1 Gallon Pot - Up to 6" plant height'
      ),
      new PotItem(
        '2 Gallon Pot',
        undefined,
        undefined,
        undefined,
        inchesToMm(8.7),
        inchesToMm(8.7),
        inchesToMm(7.9),
        '2 Gallon Pot - Up to 12" plant height'
      ),
      new PotItem(
        '3 Gallon Pot',
        undefined,
        undefined,
        undefined,
        inchesToMm(9.5),
        inchesToMm(9.5),
        inchesToMm(9.9),
        '3 Gallon Pot - Up to 18" plant height'
      ),
      new PotItem(
        '5 Gallon Pot',
        undefined,
        undefined,
        undefined,
        inchesToMm(12.5),
        inchesToMm(12.5),
        inchesToMm(9.8),
        '5 Gallon Pot - Up to 30" plant height'
      ),
      new PotItem(
        '7 Gallon Pot',
        undefined,
        undefined,
        undefined,
        inchesToMm(14.3),
        inchesToMm(14.3),
        inchesToMm(9.9),
        '7 Gallon Pot - Up to 42" plant height'
      ),
      new PotItem(
        '10 Gallon Pot',
        undefined,
        undefined,
        undefined,
        inchesToMm(15.9),
        inchesToMm(15.9),
        inchesToMm(11.9),
        '10 Gallon Pot - Up to 60" plant height'
      ),
      new PotItem(
        '15 Gallon Pot',
        undefined,
        undefined,
        undefined,
        inchesToMm(19.9),
        inchesToMm(19.9),
        inchesToMm(11.9),
        '15 Gallon Pot - Up to 90" plant height'
      ),
      new PotItem(
        '20 Gallon Pot',
        undefined,
        undefined,
        undefined,
        inchesToMm(19.9),
        inchesToMm(19.9),
        inchesToMm(15.9),
        '20 Gallon Pot - Up to 120" plant height'
      ),
      new PotItem(
        '25 Gallon Pot',
        undefined,
        undefined,
        undefined,
        inchesToMm(21.8),
        inchesToMm(21.8),
        inchesToMm(15.9),
        '25 Gallon Pot - Up to 150" plant height'
      ),
      new PotItem(
        '30 Gallon Pot',
        undefined,
        undefined,
        undefined,
        inchesToMm(23.8),
        inchesToMm(23.8),
        inchesToMm(15.9),
        'For multiple plants'
      ),
      new PotItem(
        '50 Gallon Pot',
        undefined,
        undefined,
        undefined,
        inchesToMm(28.7),
        inchesToMm(28.7),
        inchesToMm(19.1),
        'For multiple plants'
      ),
      new PotItem(
        '100 Gallon Pot',
        undefined,
        undefined,
        undefined,
        inchesToMm(39.7),
        inchesToMm(39.7),
        inchesToMm(19.9),
        'For multiple plants'
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
        '4x4x6.5 tent',
        undefined,
        undefined,
        undefined,
        feetToMm(4),
        feetToMm(4),
        feetToMm(6.5)
      ),
      new Growspace(
        '5x5x6.5 tent',
        undefined,
        undefined,
        undefined,
        feetToMm(5),
        feetToMm(5),
        feetToMm(6.5)
      ),
      new Growspace(
        '4x2x5 tent',
        undefined,
        undefined,
        undefined,
        feetToMm(4),
        feetToMm(2),
        feetToMm(5)
      ),
      new Growspace(
        '3x3x6 tent',
        undefined,
        undefined,
        undefined,
        feetToMm(3),
        feetToMm(3),
        feetToMm(6)
      ),
      new Growspace(
        '5x2.5x6.5 tent',
        undefined,
        undefined,
        undefined,
        feetToMm(5),
        feetToMm(2.5),
        feetToMm(6.5)
      ),
      new Growspace(
        '2x2x3 tent',
        undefined,
        undefined,
        undefined,
        feetToMm(2),
        feetToMm(2),
        feetToMm(3)
      ),
      new Growspace(
        '2x2x4 tent',
        undefined,
        undefined,
        undefined,
        feetToMm(2),
        feetToMm(2),
        feetToMm(4)
      ),
      new Growspace(
        '2.5x2.5x5.25 tent',
        undefined,
        undefined,
        undefined,
        feetToMm(2.5),
        feetToMm(2.5),
        feetToMm(5.25)
      ),
      new Growspace(
        '3x1.5x5.25 tent',
        undefined,
        undefined,
        undefined,
        feetToMm(3),
        feetToMm(1.5),
        feetToMm(5.25)
      ),
      new Growspace(
        '8x4x6.5 tent',
        undefined,
        undefined,
        undefined,
        feetToMm(8),
        feetToMm(4),
        feetToMm(6.5)
      ),
      new Growspace(
        '8x4x6 tent',
        undefined,
        undefined,
        undefined,
        feetToMm(8),
        feetToMm(4),
        feetToMm(6)
      ),
    ],
  },
  {
    itemGroup: 'misc',
    items: [
      new DuctItem(
        'Duct 1x1',
        undefined,
        undefined,
        undefined,
        feetToMm(1),
        feetToMm(1),
        feetToMm(1)
      ),
    ],
  },
];

export function itemGroup(name: string): Item[] {
  const group = ItemsLibrary.find((group) => group.itemGroup === name);
  if (group === undefined) throw new Error(`Unknown item group: ${name}`);

  return group.items;
}

export default ItemsLibrary;
