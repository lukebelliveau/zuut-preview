import { airtableTables } from './airtableBase';
import { PlaceableItemRecord } from './Record';
import selectAllOfItemType from './selectAllOfItemType';

export const selectAllTents = async (): Promise<PlaceableItemRecord[]> => {
  return selectAllOfItemType(airtableTables.tents.id);
};
