import { airtableTables } from './airtableBase';
import { PlaceableItemRecord } from './Record';
import selectAllOfItemType from './selectAllOfItemType';

export const selectAllWaterItems = async (): Promise<PlaceableItemRecord[]> => {
  return selectAllOfItemType(airtableTables.water.id);
};
