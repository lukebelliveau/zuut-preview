export interface ItemRecord {
  name: string;
  amazonProducts: string[];
  linkedASINs: string[];
  recordId: string;
}

export interface PlaceableItemRecord extends ItemRecord {
  width: number;
  length: number;
  height: number;
  description: string;
  itemType?: string;
}

export type AirtableRecord = PlaceableItemRecord | ItemRecord;
