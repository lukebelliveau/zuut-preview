import Tent from './item/tentItem';
import { AmazonProduct, Item } from './item';
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
import {
  PlaceableItemRecord,
  ItemRecord,
  isPlaceableItemRecord,
} from '../airtable/Record';
import queryKeys from './queryKeys';
import PlaceableItem from './item/placeableItem';
import MiscItem from './item/miscItem';

export type IItemGroup = {
  itemGroup: string;
  items: Item[];
};

interface ItemConstructorArgs {
  name: string;
  recordId?: string;
  id?: string;
  x?: number;
  y?: number;
  width?: number;
  length?: number;
  height?: number | undefined;
  description?: string;
  amazonProducts: AmazonProduct[];
}

const constructorArgs = (item: ItemRecord): ItemConstructorArgs => {
  const amazonProducts: AmazonProduct[] = item.amazonProducts.map(
    (product) => ({
      recordId: product,
    })
  );
  const constructorArgs: ItemConstructorArgs = {
    name: item.name,
    amazonProducts: amazonProducts,
    recordId: item.recordId,
  };

  if (isPlaceableItemRecord(item)) {
    constructorArgs.width = inchesToFeet(feetToMm_REQUIRE_3_INCHES(item.width));
    constructorArgs.length = inchesToFeet(
      feetToMm_REQUIRE_3_INCHES(item.length)
    );
    constructorArgs.height = item.height;
    constructorArgs.description = item.description;
  }

  return constructorArgs;
};

const fetchTents = async (): Promise<Item[]> => {
  const tentData = await airtableApi.selectAllTents();

  const tents: Tent[] = [];
  tentData.forEach((tent: PlaceableItemRecord) => {
    try {
      tents.push(new Tent(constructorArgs(tent)));
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

  switch (item.itemType) {
    case EXHAUST_FAN_ITEM_TYPE:
      return new ExhaustFanItem(constructorArgs(item));
    case OSCILLATING_FAN_ITEM_TYPE:
      return new OscillatingFanItem(constructorArgs(item));
    case FLOOR_AC_ITEM_TYPE:
      return new FloorACItem(constructorArgs(item));
    case HEAT_ITEM_TYPE:
      return new HeatItem(constructorArgs(item));
    case PURIFIER_ITEM_TYPE:
      return new PurifierItem(constructorArgs(item));
    case HUMIDIFIER_ITEM_TYPE:
      return new HumidifierItem(constructorArgs(item));
    case DEHUMIDIFIER_ITEM_TYPE:
      return new DehumidifierItem(constructorArgs(item));
    case DUCT_ITEM_TYPE:
      return new DuctItem(constructorArgs(item));
    case CARBON_FILTER_ITEM_TYPE:
      return new CarbonFilterItem(constructorArgs(item));
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

  const miscItems: MiscItem[] = [];
  miscItemData.forEach((miscItem: ItemRecord) => {
    try {
      miscItems.push(
        new MiscItem({
          name: miscItem.name,
          recordId: miscItem.recordId,
          id: undefined,
          amazonProducts: [
            {
              recordId: miscItem.amazonProducts[0],
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
      waterItems.push(new WaterItem(constructorArgs(waterItem)));
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
      pots.push(new PotItem(constructorArgs(pot)));
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
      lights.push(new LightItem(constructorArgs(light)));
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
