import Growspace from './item/growspace';
import { Item } from './item';
import PotItem from './item/potItem';
import { feetToMm_REQUIRE_3_INCHES } from './conversions';
import LightItem from './item/lightItem';
import DuctItem from './item/ductItem';
import CeilingGrowspaceItem from './item/ceilingGrowspaceItem';
import GrowspaceItem from './item/growspaceItem';
import CarbonFilterItem from './item/carbonFilterItem';
import WaterItem from './item/waterItem';
import ExhaustFanItem from './item/exhaustFanItem';

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
        feetToMm_REQUIRE_3_INCHES(4),
        feetToMm_REQUIRE_3_INCHES(4),
        feetToMm_REQUIRE_3_INCHES(6.5)
      ),
      new Growspace(
        '5x5x6.5 tent',
        undefined,
        undefined,
        undefined,
        feetToMm_REQUIRE_3_INCHES(5),
        feetToMm_REQUIRE_3_INCHES(5),
        feetToMm_REQUIRE_3_INCHES(6.5)
      ),
      new Growspace(
        '4x2x5 tent',
        undefined,
        undefined,
        undefined,
        feetToMm_REQUIRE_3_INCHES(4),
        feetToMm_REQUIRE_3_INCHES(2),
        feetToMm_REQUIRE_3_INCHES(5)
      ),
      new Growspace(
        '3x3x6 tent',
        undefined,
        undefined,
        undefined,
        feetToMm_REQUIRE_3_INCHES(3),
        feetToMm_REQUIRE_3_INCHES(3),
        feetToMm_REQUIRE_3_INCHES(6)
      ),
      new Growspace(
        '5x2.5x6.5 tent',
        undefined,
        undefined,
        undefined,
        feetToMm_REQUIRE_3_INCHES(5),
        feetToMm_REQUIRE_3_INCHES(2.5),
        feetToMm_REQUIRE_3_INCHES(6.5)
      ),
      new Growspace(
        '2x2x3 tent',
        undefined,
        undefined,
        undefined,
        feetToMm_REQUIRE_3_INCHES(2),
        feetToMm_REQUIRE_3_INCHES(2),
        feetToMm_REQUIRE_3_INCHES(3)
      ),
      new Growspace(
        '2x2x4 tent',
        undefined,
        undefined,
        undefined,
        feetToMm_REQUIRE_3_INCHES(2),
        feetToMm_REQUIRE_3_INCHES(2),
        feetToMm_REQUIRE_3_INCHES(4)
      ),
      new Growspace(
        '2.5x2.5x5.25 tent',
        undefined,
        undefined,
        undefined,
        feetToMm_REQUIRE_3_INCHES(2.5),
        feetToMm_REQUIRE_3_INCHES(2.5),
        feetToMm_REQUIRE_3_INCHES(5.25)
      ),
      new Growspace(
        '3x1.5x5.25 tent',
        undefined,
        undefined,
        undefined,
        feetToMm_REQUIRE_3_INCHES(3),
        feetToMm_REQUIRE_3_INCHES(1.5),
        feetToMm_REQUIRE_3_INCHES(5.25)
      ),
      new Growspace(
        '8x4x6.5 tent',
        undefined,
        undefined,
        undefined,
        feetToMm_REQUIRE_3_INCHES(8),
        feetToMm_REQUIRE_3_INCHES(4),
        feetToMm_REQUIRE_3_INCHES(6.5)
      ),
      new Growspace(
        '8x4x6 tent',
        undefined,
        undefined,
        undefined,
        feetToMm_REQUIRE_3_INCHES(8),
        feetToMm_REQUIRE_3_INCHES(4),
        feetToMm_REQUIRE_3_INCHES(6)
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
        feetToMm_REQUIRE_3_INCHES(0.5),
        feetToMm_REQUIRE_3_INCHES(0.5),
        feetToMm_REQUIRE_3_INCHES(0.75),
        '1 Gallon Pot - Up to 6" plant height'
      ),
      new PotItem(
        '2 Gallon Pot',
        undefined,
        undefined,
        undefined,
        feetToMm_REQUIRE_3_INCHES(0.75),
        feetToMm_REQUIRE_3_INCHES(0.75),
        feetToMm_REQUIRE_3_INCHES(0.75),
        '2 Gallon Pot - Up to 12" plant height'
      ),
      new PotItem(
        '3 Gallon Pot',
        undefined,
        undefined,
        undefined,
        feetToMm_REQUIRE_3_INCHES(0.75),
        feetToMm_REQUIRE_3_INCHES(0.75),
        feetToMm_REQUIRE_3_INCHES(0.75),
        '3 Gallon Pot - Up to 18" plant height'
      ),
      new PotItem(
        '5 Gallon Pot',
        undefined,
        undefined,
        undefined,
        feetToMm_REQUIRE_3_INCHES(1),
        feetToMm_REQUIRE_3_INCHES(0.75),
        feetToMm_REQUIRE_3_INCHES(0.75),
        '5 Gallon Pot - Up to 30" plant height'
      ),
      new PotItem(
        '7 Gallon Pot',
        undefined,
        undefined,
        undefined,
        feetToMm_REQUIRE_3_INCHES(1.25),
        feetToMm_REQUIRE_3_INCHES(1.25),
        feetToMm_REQUIRE_3_INCHES(0.75),
        '7 Gallon Pot - Up to 42" plant height'
      ),
      new PotItem(
        '10 Gallon Pot',
        undefined,
        undefined,
        undefined,
        feetToMm_REQUIRE_3_INCHES(1.25),
        feetToMm_REQUIRE_3_INCHES(1.25),
        feetToMm_REQUIRE_3_INCHES(1),
        '10 Gallon Pot - Up to 60" plant height'
      ),
      new PotItem(
        '15 Gallon Pot',
        undefined,
        undefined,
        undefined,
        feetToMm_REQUIRE_3_INCHES(1.75),
        feetToMm_REQUIRE_3_INCHES(1.75),
        feetToMm_REQUIRE_3_INCHES(1),
        '15 Gallon Pot - Up to 90" plant height'
      ),
      new PotItem(
        '20 Gallon Pot',
        undefined,
        undefined,
        undefined,
        feetToMm_REQUIRE_3_INCHES(1.75),
        feetToMm_REQUIRE_3_INCHES(1.75),
        feetToMm_REQUIRE_3_INCHES(1.25),
        '20 Gallon Pot - Up to 120" plant height'
      ),
      new PotItem(
        '25 Gallon Pot',
        undefined,
        undefined,
        undefined,
        feetToMm_REQUIRE_3_INCHES(1.75),
        feetToMm_REQUIRE_3_INCHES(1.75),
        feetToMm_REQUIRE_3_INCHES(1.25),
        '25 Gallon Pot - Up to 150" plant height'
      ),
      new PotItem(
        '30 Gallon Pot',
        undefined,
        undefined,
        undefined,
        feetToMm_REQUIRE_3_INCHES(2),
        feetToMm_REQUIRE_3_INCHES(2),
        feetToMm_REQUIRE_3_INCHES(1.25),
        'For multiple plants'
      ),
      new PotItem(
        '50 Gallon Pot',
        undefined,
        undefined,
        undefined,
        feetToMm_REQUIRE_3_INCHES(2.5),
        feetToMm_REQUIRE_3_INCHES(2.5),
        feetToMm_REQUIRE_3_INCHES(1.5),
        'For multiple plants'
      ),
      new PotItem(
        '100 Gallon Pot',
        undefined,
        undefined,
        undefined,
        feetToMm_REQUIRE_3_INCHES(3.25),
        feetToMm_REQUIRE_3_INCHES(3.25),
        feetToMm_REQUIRE_3_INCHES(1.75),
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
        feetToMm_REQUIRE_3_INCHES(1),
        feetToMm_REQUIRE_3_INCHES(2),
        feetToMm_REQUIRE_3_INCHES(0.5),
        'A relatively new type of grow light that produces better quality buds and bigger yields while using less electricity and producing less heat than traditional grow lights.'
      ),
    ],
  },
  {
    itemGroup: 'climate',
    items: [
      new ExhaustFanItem(
        'Exhaust Fan',
        undefined,
        undefined,
        undefined,
        feetToMm_REQUIRE_3_INCHES(1),
        feetToMm_REQUIRE_3_INCHES(0.75),
        feetToMm_REQUIRE_3_INCHES(0.75),
        'A steady supply of fresh air helps cannabis grow faster, produce more buds, controls the humidity and temperature, and protects plants from certain pests and molds.'
      ),
      new DuctItem(
        'Ducting',
        undefined,
        undefined,
        undefined,
        feetToMm_REQUIRE_3_INCHES(1),
        feetToMm_REQUIRE_3_INCHES(0.75),
        feetToMm_REQUIRE_3_INCHES(0.75),
        'An exhaust system often uses ducting to move hot and humid air out of the grow space.'
      ),
      new CarbonFilterItem(
        'Carbon Filter',
        undefined,
        undefined,
        undefined,
        feetToMm_REQUIRE_3_INCHES(1.75),
        feetToMm_REQUIRE_3_INCHES(0.75),
        feetToMm_REQUIRE_3_INCHES(0.75),
        'Connecting a carbon filter to an exhaust fan filters the smells out of the air before it leaves the grow space.'
      ),
      new GrowspaceItem(
        'Floor AC Unit',
        undefined,
        undefined,
        undefined,
        feetToMm_REQUIRE_3_INCHES(1.75),
        feetToMm_REQUIRE_3_INCHES(1.25),
        feetToMm_REQUIRE_3_INCHES(2.75),
        'Cannabis does not like temperatures above 85 degrees. Lowers temperature, lowers humidity'
      ),
      new GrowspaceItem(
        'Heat',
        undefined,
        undefined,
        undefined,
        feetToMm_REQUIRE_3_INCHES(1.75),
        feetToMm_REQUIRE_3_INCHES(1.25),
        feetToMm_REQUIRE_3_INCHES(2.75),
        'Cannabis does not like temperatures below 50 degrees. Raises temperature, lowers humidity'
      ),
      new GrowspaceItem(
        'Purifier',
        undefined,
        undefined,
        undefined,
        feetToMm_REQUIRE_3_INCHES(1),
        feetToMm_REQUIRE_3_INCHES(0.75),
        feetToMm_REQUIRE_3_INCHES(1.5),
        'Air purifiers destroy and prevent organic air pollutants while leaving behind CO2 and water vapor.'
      ),
      new GrowspaceItem(
        'Humidifier',
        undefined,
        undefined,
        undefined,
        feetToMm_REQUIRE_3_INCHES(1),
        feetToMm_REQUIRE_3_INCHES(0.75),
        feetToMm_REQUIRE_3_INCHES(1.25),
        'Air purifiers destroy and prevent organic air pollutants while leaving behind CO2 and water vapor.'
      ),
      new GrowspaceItem(
        'Dehumidifier',
        undefined,
        undefined,
        undefined,
        feetToMm_REQUIRE_3_INCHES(1),
        feetToMm_REQUIRE_3_INCHES(0.75),
        feetToMm_REQUIRE_3_INCHES(1.25),
        'Cannabis does not like humidity higher than 60%. Lowers humidity, raises temperature (slightly)'
      ),
      new CeilingGrowspaceItem(
        'Oscillating fan',
        undefined,
        undefined,
        undefined,
        feetToMm_REQUIRE_3_INCHES(0.5),
        feetToMm_REQUIRE_3_INCHES(0.75),
        feetToMm_REQUIRE_3_INCHES(1),
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
        feetToMm_REQUIRE_3_INCHES(2),
        feetToMm_REQUIRE_3_INCHES(2),
        feetToMm_REQUIRE_3_INCHES(3)
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
