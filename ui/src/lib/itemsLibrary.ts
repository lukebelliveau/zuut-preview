import Growspace from './item/growspace';
import { Item } from './item';
import MiscItem from './item/miscItem';
import RoomItem from './item/roomItem';
import PotItem from './item/potItem';
import {
  feetToMm,
  inchesToMm,
  normalizeMmTo3InchesIfEnabled,
} from './conversions';
import LightItem from './item/lightItem';
import DuctItem from './item/ductItem';
import CeilingGrowspaceItem from './item/ceilingGrowspaceItem';
import GrowspaceItem from './item/growspaceItem';
import CarbonFilterItem from './item/carbonFilterItem';
import WaterItem from './item/waterItem';

export type IItemGroup = {
  itemGroup: string;
  items: Item[];
};

const ItemsLibrary: IItemGroup[] = [
  {
    itemGroup: 'tents',
    items: [
      new Growspace(
        '4x4x6.5 tent',
        undefined,
        undefined,
        undefined,
        normalizeMmTo3InchesIfEnabled(feetToMm(4)),
        normalizeMmTo3InchesIfEnabled(feetToMm(4)),
        normalizeMmTo3InchesIfEnabled(feetToMm(6.5))
      ),
      new Growspace(
        '5x5x6.5 tent',
        undefined,
        undefined,
        undefined,
        normalizeMmTo3InchesIfEnabled(feetToMm(5)),
        normalizeMmTo3InchesIfEnabled(feetToMm(5)),
        normalizeMmTo3InchesIfEnabled(feetToMm(6.5))
      ),
      new Growspace(
        '4x2x5 tent',
        undefined,
        undefined,
        undefined,
        normalizeMmTo3InchesIfEnabled(feetToMm(4)),
        normalizeMmTo3InchesIfEnabled(feetToMm(2)),
        normalizeMmTo3InchesIfEnabled(feetToMm(5))
      ),
      new Growspace(
        '3x3x6 tent',
        undefined,
        undefined,
        undefined,
        normalizeMmTo3InchesIfEnabled(feetToMm(3)),
        normalizeMmTo3InchesIfEnabled(feetToMm(3)),
        normalizeMmTo3InchesIfEnabled(feetToMm(6))
      ),
      new Growspace(
        '5x2.5x6.5 tent',
        undefined,
        undefined,
        undefined,
        normalizeMmTo3InchesIfEnabled(feetToMm(5)),
        normalizeMmTo3InchesIfEnabled(feetToMm(2.5)),
        normalizeMmTo3InchesIfEnabled(feetToMm(6.5))
      ),
      new Growspace(
        '2x2x3 tent',
        undefined,
        undefined,
        undefined,
        normalizeMmTo3InchesIfEnabled(feetToMm(2)),
        normalizeMmTo3InchesIfEnabled(feetToMm(2)),
        normalizeMmTo3InchesIfEnabled(feetToMm(3))
      ),
      new Growspace(
        '2x2x4 tent',
        undefined,
        undefined,
        undefined,
        normalizeMmTo3InchesIfEnabled(feetToMm(2)),
        normalizeMmTo3InchesIfEnabled(feetToMm(2)),
        normalizeMmTo3InchesIfEnabled(feetToMm(4))
      ),
      new Growspace(
        '2.5x2.5x5.25 tent',
        undefined,
        undefined,
        undefined,
        normalizeMmTo3InchesIfEnabled(feetToMm(2.5)),
        normalizeMmTo3InchesIfEnabled(feetToMm(2.5)),
        normalizeMmTo3InchesIfEnabled(feetToMm(5.25))
      ),
      new Growspace(
        '3x1.5x5.25 tent',
        undefined,
        undefined,
        undefined,
        normalizeMmTo3InchesIfEnabled(feetToMm(3)),
        normalizeMmTo3InchesIfEnabled(feetToMm(1.5)),
        normalizeMmTo3InchesIfEnabled(feetToMm(5.25))
      ),
      new Growspace(
        '8x4x6.5 tent',
        undefined,
        undefined,
        undefined,
        normalizeMmTo3InchesIfEnabled(feetToMm(8)),
        normalizeMmTo3InchesIfEnabled(feetToMm(4)),
        normalizeMmTo3InchesIfEnabled(feetToMm(6.5))
      ),
      new Growspace(
        '8x4x6 tent',
        undefined,
        undefined,
        undefined,
        normalizeMmTo3InchesIfEnabled(feetToMm(8)),
        normalizeMmTo3InchesIfEnabled(feetToMm(4)),
        normalizeMmTo3InchesIfEnabled(feetToMm(6))
      ),
    ],
  },
  {
    itemGroup: 'pots',
    items: [
      new PotItem(
        '1 Gallon Pot',
        undefined,
        undefined,
        undefined,
        normalizeMmTo3InchesIfEnabled(inchesToMm(6.4)),
        normalizeMmTo3InchesIfEnabled(inchesToMm(6.4)),
        normalizeMmTo3InchesIfEnabled(inchesToMm(7.9)),
        '1 Gallon Pot - Up to 6" plant height'
      ),
      new PotItem(
        '2 Gallon Pot',
        undefined,
        undefined,
        undefined,
        normalizeMmTo3InchesIfEnabled(inchesToMm(8.7)),
        normalizeMmTo3InchesIfEnabled(inchesToMm(8.7)),
        normalizeMmTo3InchesIfEnabled(inchesToMm(7.9)),
        '2 Gallon Pot - Up to 12" plant height'
      ),
      new PotItem(
        '3 Gallon Pot',
        undefined,
        undefined,
        undefined,
        normalizeMmTo3InchesIfEnabled(inchesToMm(9.5)),
        normalizeMmTo3InchesIfEnabled(inchesToMm(9.5)),
        normalizeMmTo3InchesIfEnabled(inchesToMm(9.9)),
        '3 Gallon Pot - Up to 18" plant height'
      ),
      new PotItem(
        '5 Gallon Pot',
        undefined,
        undefined,
        undefined,
        normalizeMmTo3InchesIfEnabled(inchesToMm(12.5)),
        normalizeMmTo3InchesIfEnabled(inchesToMm(12.5)),
        normalizeMmTo3InchesIfEnabled(inchesToMm(9.8)),
        '5 Gallon Pot - Up to 30" plant height'
      ),
      new PotItem(
        '7 Gallon Pot',
        undefined,
        undefined,
        undefined,
        normalizeMmTo3InchesIfEnabled(inchesToMm(14.3)),
        normalizeMmTo3InchesIfEnabled(inchesToMm(14.3)),
        normalizeMmTo3InchesIfEnabled(inchesToMm(9.9)),
        '7 Gallon Pot - Up to 42" plant height'
      ),
      new PotItem(
        '10 Gallon Pot',
        undefined,
        undefined,
        undefined,
        normalizeMmTo3InchesIfEnabled(inchesToMm(15.9)),
        normalizeMmTo3InchesIfEnabled(inchesToMm(15.9)),
        normalizeMmTo3InchesIfEnabled(inchesToMm(11.9)),
        '10 Gallon Pot - Up to 60" plant height'
      ),
      new PotItem(
        '15 Gallon Pot',
        undefined,
        undefined,
        undefined,
        normalizeMmTo3InchesIfEnabled(inchesToMm(19.9)),
        normalizeMmTo3InchesIfEnabled(inchesToMm(19.9)),
        normalizeMmTo3InchesIfEnabled(inchesToMm(11.9)),
        '15 Gallon Pot - Up to 90" plant height'
      ),
      new PotItem(
        '20 Gallon Pot',
        undefined,
        undefined,
        undefined,
        normalizeMmTo3InchesIfEnabled(inchesToMm(19.9)),
        normalizeMmTo3InchesIfEnabled(inchesToMm(19.9)),
        normalizeMmTo3InchesIfEnabled(inchesToMm(15.9)),
        '20 Gallon Pot - Up to 120" plant height'
      ),
      new PotItem(
        '25 Gallon Pot',
        undefined,
        undefined,
        undefined,
        normalizeMmTo3InchesIfEnabled(inchesToMm(21.8)),
        normalizeMmTo3InchesIfEnabled(inchesToMm(21.8)),
        normalizeMmTo3InchesIfEnabled(inchesToMm(15.9)),
        '25 Gallon Pot - Up to 150" plant height'
      ),
      new PotItem(
        '30 Gallon Pot',
        undefined,
        undefined,
        undefined,
        normalizeMmTo3InchesIfEnabled(inchesToMm(23.8)),
        normalizeMmTo3InchesIfEnabled(inchesToMm(23.8)),
        normalizeMmTo3InchesIfEnabled(inchesToMm(15.9)),
        'For multiple plants'
      ),
      new PotItem(
        '50 Gallon Pot',
        undefined,
        undefined,
        undefined,
        normalizeMmTo3InchesIfEnabled(inchesToMm(28.7)),
        normalizeMmTo3InchesIfEnabled(inchesToMm(28.7)),
        normalizeMmTo3InchesIfEnabled(inchesToMm(19.1)),
        'For multiple plants'
      ),
      new PotItem(
        '100 Gallon Pot',
        undefined,
        undefined,
        undefined,
        normalizeMmTo3InchesIfEnabled(inchesToMm(39.7)),
        normalizeMmTo3InchesIfEnabled(inchesToMm(39.7)),
        normalizeMmTo3InchesIfEnabled(inchesToMm(19.9)),
        'For multiple plants'
      ),
    ],
  },
  {
    itemGroup: 'lights',
    items: [
      new LightItem(
        'LED Light',
        undefined,
        undefined,
        undefined,
        normalizeMmTo3InchesIfEnabled(inchesToMm(12)),
        normalizeMmTo3InchesIfEnabled(inchesToMm(24)),
        normalizeMmTo3InchesIfEnabled(inchesToMm(5)),
        'A relatively new type of grow light that produces better quality buds and bigger yields while using less electricity and producing less heat than traditional grow lights.'
      ),
    ],
  },
  {
    itemGroup: 'climate',
    items: [
      new CeilingGrowspaceItem(
        'Exhaust Fan',
        undefined,
        undefined,
        undefined,
        normalizeMmTo3InchesIfEnabled(inchesToMm(12)),
        normalizeMmTo3InchesIfEnabled(inchesToMm(8)),
        normalizeMmTo3InchesIfEnabled(inchesToMm(8)),
        'A steady supply of fresh air helps cannabis grow faster, produce more buds, controls the humidity and temperature, and protects plants from certain pests and molds.'
      ),
      new DuctItem(
        'Ducting',
        undefined,
        undefined,
        undefined,
        normalizeMmTo3InchesIfEnabled(inchesToMm(12)),
        normalizeMmTo3InchesIfEnabled(inchesToMm(8)),
        normalizeMmTo3InchesIfEnabled(inchesToMm(8)),
        'An exhaust system often uses ducting to move hot and humid air out of the grow space.'
      ),
      new CarbonFilterItem(
        'Carbon Filter',
        undefined,
        undefined,
        undefined,
        normalizeMmTo3InchesIfEnabled(inchesToMm(20)),
        normalizeMmTo3InchesIfEnabled(inchesToMm(8)),
        normalizeMmTo3InchesIfEnabled(inchesToMm(8)),
        'Connecting a carbon filter to an exhaust fan filters the smells out of the air before it leaves the grow space.'
      ),
      new GrowspaceItem(
        'Floor AC Unit',
        undefined,
        undefined,
        undefined,
        normalizeMmTo3InchesIfEnabled(inchesToMm(20)),
        normalizeMmTo3InchesIfEnabled(inchesToMm(16)),
        normalizeMmTo3InchesIfEnabled(inchesToMm(33)),
        'Cannabis does not like temperatures above 85 degrees. Lowers temperature, lowers humidity'
      ),
      new GrowspaceItem(
        'Heat',
        undefined,
        undefined,
        undefined,
        normalizeMmTo3InchesIfEnabled(inchesToMm(20)),
        normalizeMmTo3InchesIfEnabled(inchesToMm(16)),
        normalizeMmTo3InchesIfEnabled(inchesToMm(33)),
        'Cannabis does not like temperatures below 50 degrees. Raises temperature, lowers humidity'
      ),
      new GrowspaceItem(
        'Purifier',
        undefined,
        undefined,
        undefined,
        normalizeMmTo3InchesIfEnabled(inchesToMm(12)),
        normalizeMmTo3InchesIfEnabled(inchesToMm(10)),
        normalizeMmTo3InchesIfEnabled(inchesToMm(19)),
        'Air purifiers destroy and prevent organic air pollutants while leaving behind CO2 and water vapor.'
      ),
      new GrowspaceItem(
        'Humidifier',
        undefined,
        undefined,
        undefined,
        normalizeMmTo3InchesIfEnabled(inchesToMm(12)),
        normalizeMmTo3InchesIfEnabled(inchesToMm(10)),
        normalizeMmTo3InchesIfEnabled(inchesToMm(14)),
        'Air purifiers destroy and prevent organic air pollutants while leaving behind CO2 and water vapor.'
      ),
      new GrowspaceItem(
        'Dehumidifer',
        undefined,
        undefined,
        undefined,
        normalizeMmTo3InchesIfEnabled(inchesToMm(12)),
        normalizeMmTo3InchesIfEnabled(inchesToMm(10)),
        normalizeMmTo3InchesIfEnabled(inchesToMm(14)),
        'Cannabis does not like humidity higher than 60%. Lowers humidity, raises temperature (slightly)'
      ),
      new CeilingGrowspaceItem(
        'Oscillating fan',
        undefined,
        undefined,
        undefined,
        normalizeMmTo3InchesIfEnabled(inchesToMm(6)),
        normalizeMmTo3InchesIfEnabled(inchesToMm(8)),
        normalizeMmTo3InchesIfEnabled(inchesToMm(12)),
        'In nature, cannabis plants thrive in a gentle breeze. Air movement protects plants from certain pests and molds.'
      ),
    ],
  },
  {
    itemGroup: 'misc',
    items: [
      new WaterItem(
        'Water Container',
        undefined,
        undefined,
        undefined,
        inchesToMm(24),
        inchesToMm(24),
        inchesToMm(36)
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
