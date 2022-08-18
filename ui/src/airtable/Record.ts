export interface PlaceableItemRecord {
  name: string;
  width: number;
  length: number;
  height: number;
  description: string;
  amazonProducts: string[];
  linkedASINs: string[];
  recordId: string;
}

export interface MiscItemRecord {
  name: string;
  amazonProducts: string[];
  linkedASINs: string[];
  recordId: string;
}

export type Record = PlaceableItemRecord | MiscItemRecord;
