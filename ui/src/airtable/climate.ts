import { airtableTables } from './airtableBase';
import { PlaceableItemRecord } from './Record';
import selectAllOfItemType from './selectAllOfItemType';

export const selectAllClimateItems = async (): Promise<
  PlaceableItemRecord[]
> => {
  return selectAllOfItemType(airtableTables.climate.id);
};

export default selectAllClimateItems;
