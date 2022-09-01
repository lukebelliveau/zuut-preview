export interface ItemRecord {
  name: string;
  amazonProducts: string[];
  linkedASINs: string[];
  recordId: string;
  itemType?: string;
}

export interface PlaceableItemRecord extends ItemRecord {
  width: number;
  length: number;
  height: number;
  description: string;
  itemType?: string;
}

export const isPlaceableItemRecord = (
  record: ItemRecord | PlaceableItemRecord
): record is PlaceableItemRecord => {
  return (record as PlaceableItemRecord).width !== undefined;
};

export type AirtableRecord = PlaceableItemRecord | ItemRecord;
