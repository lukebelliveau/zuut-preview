import {
  airtableBase,
  airtableTables,
  defaultItemFields,
} from './airtableBase';
import { ItemRecord } from './ItemRecord';

export const selectAllLights = async (): Promise<ItemRecord[]> => {
  const lights: ItemRecord[] = [];

  try {
    const lightRecords = await airtableBase(airtableTables.lights.id)
      .select({
        fields: defaultItemFields,
      })
      .all();

    lightRecords.forEach((record) => {
      const name = record.get('name');
      const width = record.get('width');
      const length = record.get('length');
      const height = record.get('height');
      const description = record.get('description');
      const amazonProducts = record.get('amazonProducts');
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
        amazonProducts === undefined ||
        recordId === undefined
      ) {
        throw new Error(
          'Attempted to fetch light records from Airtable, but one or more of the values was undefined'
        );
      }

      lights.push({
        name: name.toString(),
        width: parseInt(width.toString()),
        length: parseInt(length.toString()),
        height: parseInt(height.toString()),
        description: description.toString(),
        amazonProducts: amazonProducts.toString()?.split(','),
        recordId: recordId.toString(),
        amazonProductASINs: [],
      });
    });

    return lights;
  } catch (e) {
    console.error('Error fetching Light data:');
    console.error(e);

    return lights;
  }
};
