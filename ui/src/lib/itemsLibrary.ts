import Growspace from './item/growspace';
import { Item } from './item';
import PotItem from './item/potItem';
import { feetToMm_REQUIRE_3_INCHES } from './conversions';
import LightItem from './item/lightItem';
import DuctItem from './item/ductItem';
import CarbonFilterItem from './item/carbonFilterItem';
import WaterItem from './item/waterItem';
import ExhaustFanItem from './item/exhaustFanItem';
import MiscItem from './item/miscItem';
import OscillatingFanItem from './item/oscillatingFanItem';
import FloorACItem from './item/floorACItem';
import HeatItem from './item/heatItem';
import PurifierItem from './item/purifierItem';
import HumidifierItem from './item/humidifierItem';
import DehumidifierItem from './item/dehumidifierItem';
import CurvedDuctItem from './item/curvedDuctItem';

export type IItemGroup = {
  itemGroup: string;
  items: Item[];
};

const ItemsLibrary: IItemGroup[] = [
  {
    itemGroup: 'tents',
    items: [
      new Growspace({
        name: '4x4x6.5 tent',
        id: undefined,
        x: undefined,
        y: undefined,
        width: feetToMm_REQUIRE_3_INCHES(4),
        length: feetToMm_REQUIRE_3_INCHES(4),
        height: feetToMm_REQUIRE_3_INCHES(6.5),
      }),
      new Growspace({
        name: '5x5x6.5 tent',
        id: undefined,
        x: undefined,
        y: undefined,
        width: feetToMm_REQUIRE_3_INCHES(5),
        length: feetToMm_REQUIRE_3_INCHES(5),
        height: feetToMm_REQUIRE_3_INCHES(6.5),
      }),
      new Growspace({
        name: '4x2x5 tent',
        id: undefined,
        x: undefined,
        y: undefined,
        width: feetToMm_REQUIRE_3_INCHES(4),
        length: feetToMm_REQUIRE_3_INCHES(2),
        height: feetToMm_REQUIRE_3_INCHES(5),
      }),
      new Growspace({
        name: '3x3x6 tent',
        id: undefined,
        x: undefined,
        y: undefined,
        width: feetToMm_REQUIRE_3_INCHES(3),
        length: feetToMm_REQUIRE_3_INCHES(3),
        height: feetToMm_REQUIRE_3_INCHES(6),
      }),
      new Growspace({
        name: '5x2.5x6.5 tent',
        id: undefined,
        x: undefined,
        y: undefined,
        width: feetToMm_REQUIRE_3_INCHES(5),
        length: feetToMm_REQUIRE_3_INCHES(2.5),
        height: feetToMm_REQUIRE_3_INCHES(6.5),
      }),
      new Growspace({
        name: '2x2x3 tent',
        id: undefined,
        x: undefined,
        y: undefined,
        width: feetToMm_REQUIRE_3_INCHES(2),
        length: feetToMm_REQUIRE_3_INCHES(2),
        height: feetToMm_REQUIRE_3_INCHES(3),
      }),
      new Growspace({
        name: '2x2x4 tent',
        id: undefined,
        x: undefined,
        y: undefined,
        width: feetToMm_REQUIRE_3_INCHES(2),
        length: feetToMm_REQUIRE_3_INCHES(2),
        height: feetToMm_REQUIRE_3_INCHES(4),
      }),
      new Growspace({
        name: '2.5x2.5x5.25 tent',
        id: undefined,
        x: undefined,
        y: undefined,
        width: feetToMm_REQUIRE_3_INCHES(2.5),
        length: feetToMm_REQUIRE_3_INCHES(2.5),
        height: feetToMm_REQUIRE_3_INCHES(5.25),
      }),
      new Growspace({
        name: '3x1.5x5.25 tent',
        id: undefined,
        x: undefined,
        y: undefined,
        width: feetToMm_REQUIRE_3_INCHES(3),
        length: feetToMm_REQUIRE_3_INCHES(1.5),
        height: feetToMm_REQUIRE_3_INCHES(5.25),
      }),
      new Growspace({
        name: '8x4x6.5 tent',
        id: undefined,
        x: undefined,
        y: undefined,
        width: feetToMm_REQUIRE_3_INCHES(8),
        length: feetToMm_REQUIRE_3_INCHES(4),
        height: feetToMm_REQUIRE_3_INCHES(6.5),
      }),
      new Growspace({
        name: '8x4x6 tent',
        id: undefined,
        x: undefined,
        y: undefined,
        width: feetToMm_REQUIRE_3_INCHES(8),
        length: feetToMm_REQUIRE_3_INCHES(4),
        height: feetToMm_REQUIRE_3_INCHES(6),
      }),
    ],
  },
  {
    itemGroup: 'pots',
    items: [
      new PotItem({
        name: '1 Gallon Pot',
        id: undefined,
        x: undefined,
        y: undefined,
        width: feetToMm_REQUIRE_3_INCHES(0.5),
        length: feetToMm_REQUIRE_3_INCHES(0.5),
        height: feetToMm_REQUIRE_3_INCHES(0.75),
        description: '1 Gallon Pot - Up to 6" plant height',
      }),
      new PotItem({
        name: '2 Gallon Pot',
        id: undefined,
        x: undefined,
        y: undefined,
        width: feetToMm_REQUIRE_3_INCHES(0.75),
        length: feetToMm_REQUIRE_3_INCHES(0.75),
        height: feetToMm_REQUIRE_3_INCHES(0.75),
        description: '2 Gallon Pot - Up to 12" plant height',
      }),
      new PotItem({
        name: '3 Gallon Pot',
        id: undefined,
        x: undefined,
        y: undefined,
        width: feetToMm_REQUIRE_3_INCHES(0.75),
        length: feetToMm_REQUIRE_3_INCHES(0.75),
        height: feetToMm_REQUIRE_3_INCHES(0.75),
        description: '3 Gallon Pot - Up to 18" plant height',
      }),
      new PotItem({
        name: '5 Gallon Pot',
        id: undefined,
        x: undefined,
        y: undefined,
        width: feetToMm_REQUIRE_3_INCHES(1),
        length: feetToMm_REQUIRE_3_INCHES(1),
        height: feetToMm_REQUIRE_3_INCHES(0.75),
        description: '5 Gallon Pot - Up to 30" plant height',
      }),
      new PotItem({
        name: '7 Gallon Pot',
        id: undefined,
        x: undefined,
        y: undefined,
        width: feetToMm_REQUIRE_3_INCHES(1.25),
        length: feetToMm_REQUIRE_3_INCHES(1.25),
        height: feetToMm_REQUIRE_3_INCHES(0.75),
        description: '7 Gallon Pot - Up to 42" plant height',
      }),
      new PotItem({
        name: '10 Gallon Pot',
        id: undefined,
        x: undefined,
        y: undefined,
        width: feetToMm_REQUIRE_3_INCHES(1.25),
        length: feetToMm_REQUIRE_3_INCHES(1.25),
        height: feetToMm_REQUIRE_3_INCHES(1),
        description: '10 Gallon Pot - Up to 60" plant height',
      }),
      new PotItem({
        name: '15 Gallon Pot',
        id: undefined,
        x: undefined,
        y: undefined,
        width: feetToMm_REQUIRE_3_INCHES(1.75),
        length: feetToMm_REQUIRE_3_INCHES(1.75),
        height: feetToMm_REQUIRE_3_INCHES(1),
        description: '15 Gallon Pot - Up to 90" plant height',
      }),
      new PotItem({
        name: '20 Gallon Pot',
        id: undefined,
        x: undefined,
        y: undefined,
        width: feetToMm_REQUIRE_3_INCHES(1.75),
        length: feetToMm_REQUIRE_3_INCHES(1.75),
        height: feetToMm_REQUIRE_3_INCHES(1.25),
        description: '20 Gallon Pot - Up to 120" plant height',
      }),
      new PotItem({
        name: '25 Gallon Pot',
        id: undefined,
        x: undefined,
        y: undefined,
        width: feetToMm_REQUIRE_3_INCHES(1.75),
        length: feetToMm_REQUIRE_3_INCHES(1.75),
        height: feetToMm_REQUIRE_3_INCHES(1.25),
        description: '25 Gallon Pot - Up to 150" plant height',
      }),
      new PotItem({
        name: '30 Gallon Pot',
        id: undefined,
        x: undefined,
        y: undefined,
        width: feetToMm_REQUIRE_3_INCHES(2),
        length: feetToMm_REQUIRE_3_INCHES(2),
        height: feetToMm_REQUIRE_3_INCHES(1.25),
        description: 'For multiple plants',
      }),
      new PotItem({
        name: '50 Gallon Pot',
        id: undefined,
        x: undefined,
        y: undefined,
        width: feetToMm_REQUIRE_3_INCHES(2.5),
        length: feetToMm_REQUIRE_3_INCHES(2.5),
        height: feetToMm_REQUIRE_3_INCHES(1.5),
        description: 'For multiple plants',
      }),
      new PotItem({
        name: '100 Gallon Pot',
        id: undefined,
        x: undefined,
        y: undefined,
        width: feetToMm_REQUIRE_3_INCHES(3.25),
        length: feetToMm_REQUIRE_3_INCHES(3.25),
        height: feetToMm_REQUIRE_3_INCHES(1.75),
        description: 'For multiple plants',
      }),
    ],
  },
  {
    itemGroup: 'lights',
    items: [
      new LightItem({
        name: 'LED Light',
        id: undefined,
        x: undefined,
        y: undefined,
        width: feetToMm_REQUIRE_3_INCHES(1),
        length: feetToMm_REQUIRE_3_INCHES(2),
        height: feetToMm_REQUIRE_3_INCHES(0.5),
        description:
          'A relatively new type of grow light that produces better quality buds and bigger yields while using less electricity and producing less heat than traditional grow lights.',
      }),
    ],
  },
  {
    itemGroup: 'climate',
    items: [
      new ExhaustFanItem({
        name: 'Exhaust Fan',
        id: undefined,
        x: undefined,
        y: undefined,
        width: feetToMm_REQUIRE_3_INCHES(1),
        length: feetToMm_REQUIRE_3_INCHES(0.75),
        height: feetToMm_REQUIRE_3_INCHES(0.75),
        description:
          'A steady supply of fresh air helps cannabis grow faster, produce more buds, controls the humidity and temperature, and protects plants from certain pests and molds.',
      }),
      new DuctItem({
        name: 'Ducting',
        id: undefined,
        x: undefined,
        y: undefined,
        width: feetToMm_REQUIRE_3_INCHES(1),
        length: feetToMm_REQUIRE_3_INCHES(0.75),
        height: feetToMm_REQUIRE_3_INCHES(0.75),
        description:
          'An exhaust system often uses ducting to move hot and humid air out of the grow space.',
      }),
      // new CurvedDuctItem(
      //   'Curved Ducting',
      //   undefined,
      //   undefined,
      //   undefined,
      //   feetToMm_REQUIRE_3_INCHES(0.75),
      //   feetToMm_REQUIRE_3_INCHES(0.75),
      //   feetToMm_REQUIRE_3_INCHES(0.75),
      //   'An exhaust system often uses ducting to move hot and humid air out of the grow space.'
      // ),
      new CarbonFilterItem({
        name: 'Carbon Filter',
        id: undefined,
        x: undefined,
        y: undefined,
        width: feetToMm_REQUIRE_3_INCHES(1.75),
        length: feetToMm_REQUIRE_3_INCHES(0.75),
        height: feetToMm_REQUIRE_3_INCHES(0.75),
        description:
          'Connecting a carbon filter to an exhaust fan filters the smells out of the air before it leaves the grow space.',
      }),
      new FloorACItem({
        name: 'Floor AC Unit',
        id: undefined,
        x: undefined,
        y: undefined,
        width: feetToMm_REQUIRE_3_INCHES(1.75),
        length: feetToMm_REQUIRE_3_INCHES(1.25),
        height: feetToMm_REQUIRE_3_INCHES(2.75),
        description:
          'Cannabis does not like temperatures above 85 degrees. Lowers temperature, lowers humidity',
      }),
      new HeatItem({
        name: 'Heat',
        id: undefined,
        x: undefined,
        y: undefined,
        width: feetToMm_REQUIRE_3_INCHES(1.75),
        length: feetToMm_REQUIRE_3_INCHES(1.25),
        height: feetToMm_REQUIRE_3_INCHES(2.75),
        description:
          'Cannabis does not like temperatures below 50 degrees. Raises temperature, lowers humidity',
      }),
      new PurifierItem({
        name: 'Purifier',
        id: undefined,
        x: undefined,
        y: undefined,
        width: feetToMm_REQUIRE_3_INCHES(1),
        length: feetToMm_REQUIRE_3_INCHES(0.75),
        height: feetToMm_REQUIRE_3_INCHES(1.5),
        description:
          'Air purifiers destroy and prevent organic air pollutants while leaving behind CO2 and water vapor.',
      }),
      new HumidifierItem({
        name: 'Humidifier',
        id: undefined,
        x: undefined,
        y: undefined,
        width: feetToMm_REQUIRE_3_INCHES(0.75),
        length: feetToMm_REQUIRE_3_INCHES(1),
        height: feetToMm_REQUIRE_3_INCHES(1.25),
        description:
          'Air purifiers destroy and prevent organic air pollutants while leaving behind CO2 and water vapor.',
      }),
      new DehumidifierItem({
        name: 'Dehumidifier',
        id: undefined,
        x: undefined,
        y: undefined,
        width: feetToMm_REQUIRE_3_INCHES(0.75),
        length: feetToMm_REQUIRE_3_INCHES(1),
        height: feetToMm_REQUIRE_3_INCHES(1.25),
        description:
          'Cannabis does not like humidity higher than 60%. Lowers humidity, raises temperature (slightly)',
      }),
      new OscillatingFanItem({
        name: 'Oscillating fan',
        id: undefined,
        x: undefined,
        y: undefined,
        width: feetToMm_REQUIRE_3_INCHES(0.5),
        length: feetToMm_REQUIRE_3_INCHES(0.75),
        height: feetToMm_REQUIRE_3_INCHES(1),
        description:
          'In nature, cannabis plants thrive in a gentle breeze. Air movement protects plants from certain pests and molds.',
      }),
    ],
  },
  {
    itemGroup: 'water',
    items: [
      new WaterItem({
        name: 'Water Container',
        id: undefined,
        x: undefined,
        y: undefined,
        width: feetToMm_REQUIRE_3_INCHES(2),
        length: feetToMm_REQUIRE_3_INCHES(2),
        height: feetToMm_REQUIRE_3_INCHES(3),
      }),
    ],
  },
  {
    itemGroup: 'misc',
    items: [
      new MiscItem({
        name: 'Seedling Trays',
        id: undefined,
        ASIN: 'B08SBN1YJD',
      }),
      new MiscItem({
        name: 'Seedling Heating Map',
        id: undefined,
        ASIN: 'B08SBN1YJD',
      }),
      new MiscItem({ name: 'Magnifier', id: undefined, ASIN: 'B08SBN1YJD' }),
      new MiscItem({ name: 'Nutrients', id: undefined, ASIN: 'B08SBN1YJD' }),
      new MiscItem({ name: 'pH Tester', id: undefined, ASIN: 'B08SBN1YJD' }),
      new MiscItem({ name: 'pH Up/Down', id: undefined, ASIN: 'B08SBN1YJD' }),
      new MiscItem({
        name: 'Extension Cord',
        id: undefined,
        ASIN: 'B08SBN1YJD',
      }),
      new MiscItem({
        name: 'Measuring Spoons',
        id: undefined,
        ASIN: 'B08SBN1YJD',
      }),
      new MiscItem({ name: 'Pipettes', id: undefined, ASIN: 'B08SBN1YJD' }),
      new MiscItem({ name: 'Syringes', id: undefined, ASIN: 'B08SBN1YJD' }),
      new MiscItem({
        name: 'Eye Protection',
        id: undefined,
        ASIN: 'B08SBN1YJD',
      }),
      new MiscItem({ name: 'Zip Ties', id: undefined, ASIN: 'B08SBN1YJD' }),
      new MiscItem({
        name: 'Extension Cords',
        id: undefined,
        ASIN: 'B08SBN1YJD',
      }),
      new MiscItem({
        name: 'Pruning Snips',
        id: undefined,
        ASIN: 'B08SBN1YJD',
      }),
      new MiscItem({
        name: 'Vented Cloning Dome',
        id: undefined,
        ASIN: 'B08SBN1YJD',
      }),
      new MiscItem({ name: 'Wet Vac', id: undefined, ASIN: 'B08SBN1YJD' }),
      new MiscItem({
        name: 'Humidity Packs',
        id: undefined,
        ASIN: 'B08SBN1YJD',
      }),
      new MiscItem({ name: 'Power Strip', id: undefined, ASIN: 'B08SBN1YJD' }),
      new MiscItem({ name: 'Hygrometer', id: undefined, ASIN: 'B08SBN1YJD' }),
      new MiscItem({ name: 'Thermometer', id: undefined, ASIN: 'B08SBN1YJD' }),
      new MiscItem({
        name: 'Insect Buzzers',
        id: undefined,
        ASIN: 'B08SBN1YJD',
      }),
      new MiscItem({ name: 'Fly Stickers', id: undefined, ASIN: 'B08SBN1YJD' }),
      new MiscItem({ name: 'Power timer', id: undefined, ASIN: 'B08SBN1YJD' }),
      new MiscItem({ name: 'Trimmer', id: undefined, ASIN: 'B08SBN1YJD' }),
      new MiscItem({ name: 'Sprayer', id: undefined, ASIN: 'B08SBN1YJD' }),
      new MiscItem({
        name: 'Irrigation System',
        id: undefined,
        ASIN: 'B08SBN1YJD',
      }),
      new MiscItem({
        name: 'Watering globes',
        id: undefined,
        ASIN: 'B08SBN1YJD',
      }),
      new MiscItem({ name: 'Bamboo Stick', id: undefined, ASIN: 'B08SBN1YJD' }),
      new MiscItem({ name: 'Saucers', id: undefined, ASIN: 'B08SBN1YJD' }),
      new MiscItem({ name: 'Trays', id: undefined, ASIN: 'B08SBN1YJD' }),
      new MiscItem({ name: 'Pot holders', id: undefined, ASIN: 'B08SBN1YJD' }),
      new MiscItem({ name: 'Soil', id: undefined, ASIN: 'B08SBN1YJD' }),
      new MiscItem({ name: 'Binder clips', id: undefined, ASIN: 'B08SBN1YJD' }),
      new MiscItem({ name: 'Plant ties', id: undefined, ASIN: 'B08SBN1YJD' }),
      new MiscItem({ name: 'Seeds', id: undefined, ASIN: 'B08SBN1YJD' }),
      new MiscItem({ name: 'Plant Yoyos', id: undefined, ASIN: 'B08SBN1YJD' }),
      new MiscItem({ name: 'Coco Coir', id: undefined, ASIN: 'B08SBN1YJD' }),
      new MiscItem({
        name: 'Rope Ratchets',
        id: undefined,
        ASIN: 'B08SBN1YJD',
      }),
      new MiscItem({ name: 'Water Pump', id: undefined, ASIN: 'B08SBN1YJD' }),
      new MiscItem({ name: 'Hose', id: undefined, ASIN: 'B08SBN1YJD' }),
      new MiscItem({ name: 'Spray Handle', id: undefined, ASIN: 'B08SBN1YJD' }),
      new MiscItem({ name: 'Air pump', id: undefined, ASIN: 'B08SBN1YJD' }),
      new MiscItem({ name: 'Air stone', id: undefined, ASIN: 'B08SBN1YJD' }),
      new MiscItem({
        name: 'Starter Plugs',
        id: undefined,
        ASIN: 'B08SBN1YJD',
      }),
    ],
  },
];

export function itemGroup(name: string): Item[] {
  const group = ItemsLibrary.find((group) => group.itemGroup === name);
  if (group === undefined) throw new Error(`Unknown item group: ${name}`);

  return group.items;
}

export default ItemsLibrary;
