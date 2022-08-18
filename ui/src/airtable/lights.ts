import { airtableTables } from './airtableBase';
import { ItemRecord } from './ItemRecord';
import selectAllOfItemType from './selectAllOfItemType';

export const selectAllLights = async (): Promise<ItemRecord[]> => {
  return selectAllOfItemType(airtableTables.lights.id);
};
