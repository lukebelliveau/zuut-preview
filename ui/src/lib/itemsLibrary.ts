import Growspace from './item/growspace';
import { Item } from './item';
import PotItem from './item/potItem';
import { feetToMm_REQUIRE_3_INCHES, inchesToFeet } from './conversions';
import LightItem from './item/lightItem';
import DuctItem, { DUCT_ITEM_TYPE } from './item/ductItem';
import CarbonFilterItem, {
  CARBON_FILTER_ITEM_TYPE,
} from './item/carbonFilterItem';
import WaterItem from './item/waterItem';
import ExhaustFanItem, { EXHAUST_FAN_ITEM_TYPE } from './item/exhaustFanItem';
import OscillatingFanItem, {
  OSCILLATING_FAN_ITEM_TYPE,
} from './item/oscillatingFanItem';
import FloorACItem, { FLOOR_AC_ITEM_TYPE } from './item/floorACItem';
import HeatItem, { HEAT_ITEM_TYPE } from './item/heatItem';
import PurifierItem, { PURIFIER_ITEM_TYPE } from './item/purifierItem';
import HumidifierItem, { HUMIDIFIER_ITEM_TYPE } from './item/humidifierItem';
import DehumidifierItem, {
  DEHUMIDIFIER_ITEM_TYPE,
} from './item/dehumidifierItem';
import airtableApi from '../airtable/airtableApi';
import { useQuery } from 'react-query';
import { potRecordComparator } from '../airtable/pots';
import { PlaceableItemRecord, ItemRecord } from '../airtable/Record';
import queryKeys from './queryKeys';
import PlaceableItem from './item/placeableItem';

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

const createClimateItem = (item: PlaceableItemRecord): PlaceableItem | null => {
  if (item.itemType === undefined) {
    console.error('Attempted to create climate item with undefined itemType');
    return null;
  }

  const constructorArgs = {
    name: item.name,
    recordId: item.recordId,
    id: undefined,
    x: undefined,
    y: undefined,
    width: inchesToFeet(feetToMm_REQUIRE_3_INCHES(item.width)),
    length: inchesToFeet(feetToMm_REQUIRE_3_INCHES(item.length)),
    height: item.height,
    description: item.description,
    amazonProducts: [
      {
        name: 'Climate',
        ASIN: item.amazonProducts[0],
      },
    ],
  };

  switch (item.itemType) {
    case EXHAUST_FAN_ITEM_TYPE:
      return new ExhaustFanItem(constructorArgs);
    case OSCILLATING_FAN_ITEM_TYPE:
      return new OscillatingFanItem(constructorArgs);
    case FLOOR_AC_ITEM_TYPE:
      return new FloorACItem(constructorArgs);
    case HEAT_ITEM_TYPE:
      return new HeatItem(constructorArgs);
    case PURIFIER_ITEM_TYPE:
      return new PurifierItem(constructorArgs);
    case HUMIDIFIER_ITEM_TYPE:
      return new HumidifierItem(constructorArgs);
    case DEHUMIDIFIER_ITEM_TYPE:
      return new DehumidifierItem(constructorArgs);
    case DUCT_ITEM_TYPE:
      return new DuctItem(constructorArgs);
    case CARBON_FILTER_ITEM_TYPE:
      return new CarbonFilterItem(constructorArgs);
    default:
      return null;
  }
};

const fetchClimateItems = async (): Promise<Item[]> => {
  const climateItemData = await airtableApi.selectAllClimateItems();

  const climateItems: PlaceableItem[] = [];
  climateItemData.forEach((item: PlaceableItemRecord) => {
    try {
      const climateItem = createClimateItem(item);
      if (climateItem !== null) climateItems.push(climateItem);
    } catch (e) {
      console.error(
        'Error creating Climate Item from airtable data. Skipping item: ',
        item
      );
      console.error(e);
    }
  });

  return climateItems;
};

const fetchMiscItems = async (): Promise<Item[]> => {
  const miscItemData = await airtableApi.selectAllMiscItems();

  const miscItems: WaterItem[] = [];
  miscItemData.forEach((miscItem: ItemRecord) => {
    try {
      miscItems.push(
        new WaterItem({
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

const fetchWaterItems = async (): Promise<Item[]> => {
  const waterItemData = await airtableApi.selectAllWaterItems();

  const waterItems: WaterItem[] = [];
  waterItemData.forEach((waterItem: PlaceableItemRecord) => {
    try {
      waterItems.push(
        new WaterItem({
          name: waterItem.name,
          recordId: waterItem.recordId,
          id: undefined,
          amazonProducts: [
            {
              name: 'Water',
              ASIN: waterItem.amazonProducts[0],
            },
          ],
        })
      );
    } catch (e) {
      console.error(
        'Error creating Water Item from airtable data. Skipping water item: ',
        waterItem
      );
      console.error(e);
    }
  });

  return waterItems;
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

const StaticItemsLibrary: IItemGroup[] = [];

const fetchItemsLibrary = async (): Promise<IItemGroup[]> => {
  const potsPromise = await fetchPots();
  const lightsPromise = await fetchLights();
  const tentsPromise = await fetchTents();
  const miscItemsPromise = await fetchMiscItems();
  const waterItemsPromise = await fetchWaterItems();
  const climateItemsPromise = await fetchClimateItems();

  const [pots, lights, tents, miscItems, waterItems, climateItems] =
    await Promise.all([
      potsPromise,
      lightsPromise,
      tentsPromise,
      miscItemsPromise,
      waterItemsPromise,
      climateItemsPromise,
    ]);

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
      itemGroup: 'water',
      items: waterItems,
    },
    {
      itemGroup: 'climate',
      items: climateItems,
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
