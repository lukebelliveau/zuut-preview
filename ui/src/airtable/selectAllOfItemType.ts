import { airtableBase, defaultItemFields } from './airtableBase';
import { PlaceableItemRecord } from './Record';

const selectAllOfItemType = async (
  itemTypeId: string
): Promise<PlaceableItemRecord[]> => {
  const items: PlaceableItemRecord[] = [];
  try {
    const itemRecords = await airtableBase(itemTypeId)
      .select({
        fields: defaultItemFields,
      })
      .all();

    itemRecords.forEach((record) => {
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
        console.error(
          'Attempted to fetch item records from Airtable, but one or more of the values was undefined.'
        );
        console.error(record);
      } else {
        items.push({
          name: name.toString(),
          width: parseInt(width.toString()),
          length: parseInt(length.toString()),
          height: parseInt(height.toString()),
          description: description.toString(),
          amazonProducts: amazonProducts.toString()?.split(','),
          recordId: recordId.toString(),
          linkedASINs: [],
        });
      }
    });

    return items;
  } catch (e) {
    console.error(`Error fetching Item data, table ID ${itemTypeId}:`);
    console.error(e);

    return items;
  }
};

export default selectAllOfItemType;
