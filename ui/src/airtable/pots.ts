import { airtableBase, airtableTables } from './airtableBase';

export interface PotRecord {
  name: string;
  width: number;
  length: number;
  height: number;
  description: string;
  amazonProductASINs: string[];
  recordId: string;
}

export const selectPots = async (): Promise<PotRecord[]> => {
  const pots: PotRecord[] = [];
  try {
    const potRecords = await airtableBase(airtableTables.pots)
      .select({
        fields: [
          'name',
          'width',
          'length',
          'height',
          'description',
          'amazonProductASINs',
          'recordId',
        ],
      })
      .all();

    potRecords.forEach((record) => {
      const name = record.get('name');
      const width = record.get('width');
      const length = record.get('length');
      const height = record.get('height');
      const description = record.get('description');
      const amazonProductASINs = record.get('amazonProductASINs');
      const recordId = record.get('recordId');

      /**
       * if any of the above values are undefined, throw an error
       */
      if (
        name === undefined ||
        width === undefined ||
        length === undefined ||
        height === undefined ||
        description === undefined ||
        amazonProductASINs === undefined ||
        recordId === undefined
      ) {
        throw new Error(
          'Attempted to fetch pot records from Airtable, but one or more of the values was undefined'
        );
      }

      pots.push({
        name: name.toString(),
        width: parseInt(width.toString()),
        length: parseInt(length.toString()),
        height: parseInt(height.toString()),
        description: description.toString(),
        amazonProductASINs: amazonProductASINs.toString()?.split(','),
        recordId: recordId.toString(),
      });
    });

    return pots;
  } catch (e) {
    console.error('Error fetching Tent data:');
    console.error(e);

    return pots;
  }
};
