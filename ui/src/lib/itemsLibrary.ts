import Growspace from './item/growspace';
import { Item } from './item';
import PotItem from './item/potItem';
import { feetToMm_REQUIRE_3_INCHES, inchesToFeet } from './conversions';
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
import airtableApi from '../airtable/airtableApi';
import { useQuery } from 'react-query';
import { IPlaceableItem } from './item/placeableItem';
import { potRecordComparator } from '../airtable/pots';
import { ItemRecord } from '../airtable/ItemRecord';

export type IItemGroup = {
  itemGroup: string;
  items: Item[];
};

const fetchPots = async (): Promise<Item[]> => {
  const potData = await airtableApi.selectAllPots();

  const pots: PotItem[] = [];
  potData.sort(potRecordComparator).forEach((pot: ItemRecord) => {
    try {
      pots.push(
        new PotItem({
          name: pot.name,
          recordId: pot.recordId,
          id: undefined,
          x: undefined,
          y: undefined,
          width: inchesToFeet(feetToMm_REQUIRE_3_INCHES(pot.width)),
          length: inchesToFeet(feetToMm_REQUIRE_3_INCHES(pot.length)),
          height: pot.height,
          description: pot.description,
          amazonProducts: [
            {
              name: 'Pot',
              ASIN: pot.amazonProducts[0],
            },
          ],
        })
      );
    } catch (e) {
      console.error(
        'Error creating Pot Item from airtable data. Skipping pot: ',
        pot
      );
      console.error(e);
    }
  });

  return pots;
};

const fetchLights = async (): Promise<Item[]> => {
  const lightData = await airtableApi.selectAllLights();

  const lights: LightItem[] = [];
  lightData.forEach((light: ItemRecord) => {
    try {
      lights.push(
        new LightItem({
          name: light.name,
          recordId: light.recordId,
          id: undefined,
          x: undefined,
          y: undefined,
          width: inchesToFeet(feetToMm_REQUIRE_3_INCHES(light.width)),
          length: inchesToFeet(feetToMm_REQUIRE_3_INCHES(light.length)),
          height: light.height,
          description: light.description,
          amazonProducts: [
            {
              name: 'Light',
              ASIN: light.amazonProducts[0],
            },
          ],
        })
      );
    } catch (e) {
      console.error(
        'Error creating Light Item from airtable data. Skipping light: ',
        light
      );
      console.error(e);
    }
  });

  return lights;
};

const StaticItemsLibrary: IItemGroup[] = [
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
        amazonProducts: [
          {
            name: 'Tent',
            ASIN: 'B01731MNJE',
          },
        ],
      }),
      new Growspace({
        name: '5x5x6.5 tent',
        id: undefined,
        x: undefined,
        y: undefined,
        width: feetToMm_REQUIRE_3_INCHES(5),
        length: feetToMm_REQUIRE_3_INCHES(5),
        height: feetToMm_REQUIRE_3_INCHES(6.5),
        amazonProducts: [
          {
            name: 'Tent',
            ASIN: 'B01DXYM98K',
          },
        ],
      }),
      new Growspace({
        name: '4x2x5 tent',
        id: undefined,
        x: undefined,
        y: undefined,
        width: feetToMm_REQUIRE_3_INCHES(4),
        length: feetToMm_REQUIRE_3_INCHES(2),
        height: feetToMm_REQUIRE_3_INCHES(5),
        amazonProducts: [
          {
            name: 'Tent',
            ASIN: 'B083WFYZ6K',
          },
        ],
      }),
      new Growspace({
        name: '3x3x6 tent',
        id: undefined,
        x: undefined,
        y: undefined,
        width: feetToMm_REQUIRE_3_INCHES(3),
        length: feetToMm_REQUIRE_3_INCHES(3),
        height: feetToMm_REQUIRE_3_INCHES(6),
        amazonProducts: [
          {
            name: 'Tent',
            ASIN: 'B01DXYMKIO',
          },
        ],
      }),
      new Growspace({
        name: '5x2.5x6.5 tent',
        id: undefined,
        x: undefined,
        y: undefined,
        width: feetToMm_REQUIRE_3_INCHES(5),
        length: feetToMm_REQUIRE_3_INCHES(2.5),
        height: feetToMm_REQUIRE_3_INCHES(6.5),
        amazonProducts: [
          {
            name: 'Tent',
            ASIN: 'B07WK3Q372',
          },
        ],
      }),
      new Growspace({
        name: '2x2x3 tent',
        id: undefined,
        x: undefined,
        y: undefined,
        width: feetToMm_REQUIRE_3_INCHES(2),
        length: feetToMm_REQUIRE_3_INCHES(2),
        height: feetToMm_REQUIRE_3_INCHES(3),
        amazonProducts: [
          {
            name: 'Tent',
            ASIN: 'B07VRSCVVC',
          },
        ],
      }),
      new Growspace({
        name: '2x2x4 tent',
        id: undefined,
        x: undefined,
        y: undefined,
        width: feetToMm_REQUIRE_3_INCHES(2),
        length: feetToMm_REQUIRE_3_INCHES(2),
        height: feetToMm_REQUIRE_3_INCHES(4),
        amazonProducts: [
          {
            name: 'Tent',
            ASIN: 'B07PK7J1XZ',
          },
        ],
      }),
      new Growspace({
        name: '2.5x2.5x5.25 tent',
        id: undefined,
        x: undefined,
        y: undefined,
        width: feetToMm_REQUIRE_3_INCHES(2.5),
        length: feetToMm_REQUIRE_3_INCHES(2.5),
        height: feetToMm_REQUIRE_3_INCHES(5.25),
        amazonProducts: [
          {
            name: 'Tent',
            ASIN: 'B01DXYM98K',
          },
        ],
      }),
      new Growspace({
        name: '3x1.5x5.25 tent',
        id: undefined,
        x: undefined,
        y: undefined,
        width: feetToMm_REQUIRE_3_INCHES(3),
        length: feetToMm_REQUIRE_3_INCHES(1.5),
        height: feetToMm_REQUIRE_3_INCHES(5.25),
        amazonProducts: [
          {
            name: 'Tent',
            ASIN: 'B01DXYM98K',
          },
        ],
      }),
      new Growspace({
        name: '8x4x6.5 tent',
        id: undefined,
        x: undefined,
        y: undefined,
        width: feetToMm_REQUIRE_3_INCHES(8),
        length: feetToMm_REQUIRE_3_INCHES(4),
        height: feetToMm_REQUIRE_3_INCHES(6.5),
        amazonProducts: [
          {
            name: 'Tent',
            ASIN: 'B083WFYZ6K',
          },
        ],
      }),
      new Growspace({
        name: '8x4x6 tent',
        id: undefined,
        x: undefined,
        y: undefined,
        width: feetToMm_REQUIRE_3_INCHES(8),
        length: feetToMm_REQUIRE_3_INCHES(4),
        height: feetToMm_REQUIRE_3_INCHES(6),
        amazonProducts: [
          {
            name: 'Tent',
            ASIN: 'B01DXYM98K',
          },
        ],
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
        amazonProducts: [{ name: 'Exhaust Fan', ASIN: 'B07J9PTYRN' }],
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
        amazonProducts: [{ name: 'Ducting', ASIN: 'B07WNK7N7F' }],
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
        amazonProducts: [{ name: 'Carbon Filter', ASIN: 'B01DXYMHWS' }],
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
        amazonProducts: [{ name: 'Floor AC Unit', ASIN: 'B06ZZZY74N' }],
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
        amazonProducts: [{ name: 'Heat', ASIN: 'B08PF3Q1S5' }],
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
        amazonProducts: [{ name: 'Purifier', ASIN: 'B081NWVMCH' }],
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
        amazonProducts: [{ name: 'Humidifer', ASIN: 'B08KXW1KRJ' }],
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
        amazonProducts: [{ name: 'Dehumidifer', ASIN: 'B01DC5PPWM' }],
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
        amazonProducts: [{ name: 'Oscillating Fan', ASIN: 'B07VNMT9TT' }],
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
        amazonProducts: [{ name: 'Water Container', ASIN: 'B00A1LUFEY' }],
      }),
    ],
  },
  {
    itemGroup: 'misc',
    items: [
      new MiscItem({
        name: 'Seedling Trays',
        id: undefined,
        amazonProducts: [
          {
            ASIN: 'B07XNQT52F',
            name: 'Starter Plug',
          },
        ],
      }),
      new MiscItem({
        name: 'Seedling Heating Map',
        id: undefined,
        amazonProducts: [
          {
            ASIN: 'B00P7U259C',
            name: 'Starter Plug',
          },
        ],
      }),
      new MiscItem({
        name: 'Magnifier',
        id: undefined,
        amazonProducts: [
          {
            ASIN: 'B07VK1LVKX',
            name: 'Starter Plug',
          },
        ],
      }),
      new MiscItem({
        name: 'Nutrients',
        id: undefined,
        amazonProducts: [
          {
            ASIN: 'B00572026S',
            name: 'Starter Plug',
          },
        ],
      }),
      new MiscItem({
        name: 'pH Tester',
        id: undefined,
        amazonProducts: [
          {
            ASIN: 'B01M5IASHD',
            name: 'Starter Plug',
          },
        ],
      }),
      new MiscItem({
        name: 'pH Up/Down',
        id: undefined,
        amazonProducts: [
          {
            ASIN: 'B000BNKWZY',
            name: 'Starter Plug',
          },
        ],
      }),
      new MiscItem({
        name: 'Extension Cord',
        id: undefined,
        amazonProducts: [
          {
            ASIN: 'B073R2D51S',
            name: 'Starter Plug',
          },
        ],
      }),
      new MiscItem({
        name: 'Measuring Spoons',
        id: undefined,
        amazonProducts: [
          {
            ASIN: 'B00EZQQEMS',
            name: 'Starter Plug',
          },
        ],
      }),
      new MiscItem({
        name: 'Pipettes',
        id: undefined,
        amazonProducts: [
          {
            ASIN: 'B07F3ZN56V',
            name: 'Starter Plug',
          },
        ],
      }),
      new MiscItem({
        name: 'Syringes',
        id: undefined,
        amazonProducts: [
          {
            ASIN: 'B07PHRWTSS',
            name: 'Starter Plug',
          },
        ],
      }),
      new MiscItem({
        name: 'Eye Protection',
        id: undefined,
        amazonProducts: [
          {
            ASIN: 'B08KGXC4TW',
            name: 'Starter Plug',
          },
        ],
      }),
      new MiscItem({
        name: 'Zip Ties',
        id: undefined,
        amazonProducts: [
          {
            ASIN: 'B08TVLYB3Q',
            name: 'Starter Plug',
          },
        ],
      }),
      new MiscItem({
        name: 'Pruning Snips',
        id: undefined,
        amazonProducts: [
          {
            ASIN: 'B087CR7H9S',
            name: 'Starter Plug',
          },
        ],
      }),
      new MiscItem({
        name: 'Vented Cloning Dome',
        id: undefined,
        amazonProducts: [
          {
            ASIN: 'B07XNQT52F',
            name: 'Starter Plug',
          },
        ],
      }),
      new MiscItem({
        name: 'Wet Vac',
        id: undefined,
        amazonProducts: [
          {
            ASIN: 'B07QXWG93C',
            name: 'Starter Plug',
          },
        ],
      }),
      new MiscItem({
        name: 'Humidity Packs',
        id: undefined,
        amazonProducts: [
          {
            ASIN: 'B07VWD9FP5',
            name: 'Starter Plug',
          },
        ],
      }),
      new MiscItem({
        name: 'Power Strip',
        id: undefined,
        amazonProducts: [
          {
            ASIN: 'B0080Z7974',
            name: 'Starter Plug',
          },
        ],
      }),
      new MiscItem({
        name: 'Hygrometer',
        id: undefined,
        amazonProducts: [
          {
            ASIN: 'B07QPP1GRC',
            name: 'Starter Plug',
          },
        ],
      }),
      new MiscItem({
        name: 'Thermometer',
        id: undefined,
        amazonProducts: [
          {
            ASIN: 'B07QPP1GRC',
            name: 'Starter Plug',
          },
        ],
      }),
      new MiscItem({
        name: 'Insect Buzzers',
        id: undefined,
        amazonProducts: [
          {
            ASIN: 'B09C8KNZ6R',
            name: 'Starter Plug',
          },
        ],
      }),
      new MiscItem({
        name: 'Fly Stickers',
        id: undefined,
        amazonProducts: [
          {
            ASIN: 'B09Y93X59S',
            name: 'Starter Plug',
          },
        ],
      }),
      new MiscItem({
        name: 'Power timer',
        id: undefined,
        amazonProducts: [
          {
            ASIN: 'B00MVFF59S',
            name: 'Starter Plug',
          },
        ],
      }),
      new MiscItem({
        name: 'Trimmer',
        id: undefined,
        amazonProducts: [
          {
            ASIN: 'B09KL22B3T',
            name: 'Starter Plug',
          },
        ],
      }),
      new MiscItem({
        name: 'Sprayer',
        id: undefined,
        amazonProducts: [
          {
            ASIN: 'B07QTHF3QK',
            name: 'Starter Plug',
          },
        ],
      }),
      new MiscItem({
        name: 'Irrigation System',
        id: undefined,
        amazonProducts: [
          {
            ASIN: 'B01H6ZN0NU',
            name: 'Starter Plug',
          },
        ],
      }),
      new MiscItem({
        name: 'Watering globes',
        id: undefined,
        amazonProducts: [
          {
            ASIN: 'B08CDWY8WP',
            name: 'Starter Plug',
          },
        ],
      }),
      new MiscItem({
        name: 'Bamboo Stick',
        id: undefined,
        amazonProducts: [
          {
            ASIN: 'B09JT32X7B',
            name: 'Starter Plug',
          },
        ],
      }),
      new MiscItem({
        name: 'Saucers',
        id: undefined,
        amazonProducts: [
          {
            ASIN: 'B07ZVG9RZB',
            name: 'Starter Plug',
          },
        ],
      }),
      new MiscItem({
        name: 'Trays',
        id: undefined,
        amazonProducts: [
          {
            ASIN: 'B09H6ZFYC4',
            name: 'Starter Plug',
          },
        ],
      }),
      new MiscItem({
        name: 'Pot holders',
        id: undefined,
        amazonProducts: [
          {
            ASIN: 'B09H6ZFYC4',
            name: 'Starter Plug',
          },
        ],
      }),
      new MiscItem({
        name: 'Soil',
        id: undefined,
        amazonProducts: [
          {
            ASIN: 'B01KVLYW9M',
            name: 'Starter Plug',
          },
        ],
      }),
      new MiscItem({
        name: 'Binder clips',
        id: undefined,
        amazonProducts: [
          {
            ASIN: 'B074XTRX7G',
            name: 'Starter Plug',
          },
        ],
      }),
      new MiscItem({
        name: 'Plant ties',
        id: undefined,
        amazonProducts: [
          {
            ASIN: 'B00W6EJ9IW',
            name: 'Starter Plug',
          },
        ],
      }),
      new MiscItem({
        name: 'Seeds',
        id: undefined,
        amazonProducts: [
          {
            ASIN: 'B08SBN1YJD',
            name: 'Starter Plug',
          },
        ],
      }),
      new MiscItem({
        name: 'Plant Yoyos',
        id: undefined,
        amazonProducts: [
          {
            ASIN: 'B08NT2DMZJ',
            name: 'Starter Plug',
          },
        ],
      }),
      new MiscItem({
        name: 'Coco Coir',
        id: undefined,
        amazonProducts: [
          {
            ASIN: 'B01N1YP8O6',
            name: 'Starter Plug',
          },
        ],
      }),
      new MiscItem({
        name: 'Rope Ratchets',
        id: undefined,
        amazonProducts: [
          {
            ASIN: 'B0098R0600',
            name: 'Starter Plug',
          },
        ],
      }),
      new MiscItem({
        name: 'Water Pump',
        id: undefined,
        amazonProducts: [
          {
            ASIN: 'B00318D7K8',
            name: 'Starter Plug',
          },
        ],
      }),
      new MiscItem({
        name: 'Hose',
        id: undefined,
        amazonProducts: [
          {
            ASIN: 'B09RZHVB6M',
            name: 'Starter Plug',
          },
        ],
      }),
      new MiscItem({
        name: 'Spray Handle',
        id: undefined,
        amazonProducts: [
          {
            ASIN: 'B09RZHVB6M',
            name: 'Starter Plug',
          },
        ],
      }),
      new MiscItem({
        name: 'Air pump',
        id: undefined,
        amazonProducts: [
          {
            ASIN: 'B078YDFYFD',
            name: 'Starter Plug',
          },
        ],
      }),
      new MiscItem({
        name: 'Air stone',
        id: undefined,
        amazonProducts: [
          {
            ASIN: 'B002JLA83C',
            name: 'Starter Plug',
          },
        ],
      }),
      new MiscItem({
        name: 'Starter Plugs',
        id: undefined,
        amazonProducts: [
          {
            ASIN: 'B08SBN1YJD',
            name: 'Starter Plug',
          },
        ],
      }),
    ],
  },
];

const fetchItemsLibrary = async (): Promise<IItemGroup[]> => {
  const pots = await fetchPots();
  const lights = await fetchLights();
  const itemsLibrary = [
    ...StaticItemsLibrary,
    {
      itemGroup: 'pots',
      items: pots,
    },
    {
      itemGroup: 'lights',
      items: lights,
    },
  ];

  return itemsLibrary;
};

export const useQueryItemsLibrary = () => {
  return useQuery('pots', fetchItemsLibrary);
};

export function itemGroup(name: string, itemGroups: any): Item[] {
  const group = itemGroups.find(
    (group: IItemGroup) => group.itemGroup === name
  );
  if (group === undefined) throw new Error(`Unknown item group: ${name}`);

  return group.items;
}

export default StaticItemsLibrary;
