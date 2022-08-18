import { airtableTables } from './airtableBase';
import { ItemRecord } from './ItemRecord';
import selectAllOfItemType from './selectAllOfItemType';

export const selectAllTents = async (): Promise<ItemRecord[]> => {
  return selectAllOfItemType(airtableTables.tents.id);
};
