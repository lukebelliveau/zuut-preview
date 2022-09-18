import { airtableTables } from './airtableBase';
import { PlaceableItemRecord } from './Record';
import selectAllOfItemType from './selectAllOfItemType';

export const selectAllLights = async (): Promise<PlaceableItemRecord[]> => {
  return selectAllOfItemType(airtableTables.lights.id);
};
