import { airtableBase, airtableTables } from './airtableBase';
import { MiscItemRecord } from './Record';

export const selectAllMiscItems = async (): Promise<MiscItemRecord[]> => {
  const items: MiscItemRecord[] = [];
  try {
    const itemRecords = await airtableBase(airtableTables.misc.id)
      .select({
        fields: ['name', 'amazonProducts', 'recordId'],
      })
      .all();

    itemRecords.forEach((record) => {
      const name = record.get('name');
      const amazonProducts = record.get('amazonProducts');
      const recordId = record.get('recordId');

      /**
       * if any of the above values are undefined, throw an error
       */
      if (
        name === undefined ||
        amazonProducts === undefined ||
        recordId === undefined
      ) {
        console.error(
          'Attempted to fetch item records from Airtable, but one or more of the values was undefined.'
        );
        console.error(record);
      } else {
        items.push({
          name: name.toString(),
          amazonProducts: amazonProducts.toString()?.split(','),
          recordId: recordId.toString(),
          linkedASINs: [],
        });
      }
    });

    return items;
  } catch (e) {
    console.error('Error fetching Item data:');
    console.error(e);

    return items;
  }
};
