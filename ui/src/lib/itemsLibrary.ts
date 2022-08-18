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
import { potRecordComparator } from '../airtable/pots';
import { PlaceableItemRecord, MiscItemRecord } from '../airtable/Record';
import queryKeys from './queryKeys';

export type IItemGroup = {
  itemGroup: string;
  items: Item[];
};

const fetchTents = async (): Promise<Item[]> => {
  const tentData = await airtableApi.selectAllTents();

  const tents: Growspace[] = [];
  tentData.forEach((tent: PlaceableItemRecord) => {
    try {
      tents.push(
        new Growspace({
          name: tent.name,
          recordId: tent.recordId,
          id: undefined,
          x: undefined,
          y: undefined,
          width: inchesToFeet(feetToMm_REQUIRE_3_INCHES(tent.width)),
          length: inchesToFeet(feetToMm_REQUIRE_3_INCHES(tent.length)),
          height: tent.height,
          description: tent.description,
          amazonProducts: [
            {
              name: 'Tent',
              ASIN: tent.amazonProducts[0],
            },
          ],
        })
      );
    } catch (e) {
      console.error(
        'Error creating Tent Item from airtable data. Skipping tent: ',
        tent
      );
      console.error(e);
    }
  });

  return tents;
};

const fetchMiscItems = async (): Promise<Item[]> => {
  const miscItemData = await airtableApi.selectAllMiscItems();

  console.log(miscItemData);

  const miscItems: MiscItem[] = [];
  miscItemData.forEach((miscItem: MiscItemRecord) => {
    try {
      miscItems.push(
        new MiscItem({
          name: miscItem.name,
          recordId: miscItem.recordId,
          id: undefined,
          amazonProducts: [
            {
              name: 'Misc',
              ASIN: miscItem.amazonProducts[0],
            },
          ],
        })
      );
    } catch (e) {
      console.error(
        'Error creating Misc Item from airtable data. Skipping misc: ',
        miscItem
      );
      console.error(e);
    }
  });

  return miscItems;
};

const fetchPots = async (): Promise<Item[]> => {
  const potData = await airtableApi.selectAllPots();

  const pots: PotItem[] = [];
  potData.sort(potRecordComparator).forEach((pot: PlaceableItemRecord) => {
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
  lightData.forEach((light: PlaceableItemRecord) => {
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
];

const fetchItemsLibrary = async (): Promise<IItemGroup[]> => {
  const pots = await fetchPots();
  const lights = await fetchLights();
  const tents = await fetchTents();
  const miscItems = await fetchMiscItems();

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
    {
      itemGroup: 'tents',
      items: tents,
    },
    {
      itemGroup: 'misc',
      items: miscItems,
    },
  ];

  return itemsLibrary;
};

export const useQueryItemsLibrary = () => {
  return useQuery([queryKeys.itemsLibrary], fetchItemsLibrary);
};

export function itemGroup(name: string, itemGroups: any): Item[] {
  const group = itemGroups.find(
    (group: IItemGroup) => group.itemGroup === name
  );
  if (group === undefined) throw new Error(`Unknown item group: ${name}`);

  return group.items;
}

export default StaticItemsLibrary;
