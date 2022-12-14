import { airtableBase, airtableTables } from './airtableBase';
import { ItemRecord } from './Record';

export const selectAllMiscItems = async (): Promise<ItemRecord[]> => {
  const items: ItemRecord[] = [];
  try {
    const itemRecords = await airtableBase(airtableTables.misc.id)
      .select({
        fields: [
          'name',
          'amazonProducts',
          'recordId',
          'linkedASINs',
          'itemType',
        ],
      })
      .all();

    itemRecords.forEach((record) => {
      const name = record.get('name');
      const amazonProducts = record.get('amazonProducts');
      const recordId = record.get('recordId');
      const linkedASINs = record.get('linkedASINs');
      const itemType = record.get('itemType');

      /**
       * if any of the above values are undefined, throw an error
       */
      if (name === undefined || recordId === undefined) {
        console.error(
          'Attempted to fetch misc item records from Airtable, but one or more of the values was undefined.'
        );
        console.error(record);
      } else {
        items.push({
          name: name.toString(),
          amazonProducts: amazonProducts
            ? amazonProducts.toString()?.split(',')
            : [],
          recordId: recordId.toString(),
          linkedASINs: linkedASINs ? linkedASINs?.toString()?.split(',') : [],
          itemType: itemType ? itemType.toString() : undefined,
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
