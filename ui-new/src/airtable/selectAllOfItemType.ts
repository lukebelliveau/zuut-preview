import { airtableBase, defaultItemFields, itemFields } from './airtableBase';
import { PlaceableItemRecord } from './Record';

const selectAllOfItemType = async (itemTypeId: string): Promise<PlaceableItemRecord[]> => {
  const items: PlaceableItemRecord[] = [];
  try {
    const itemRecords = await airtableBase(itemTypeId)
      .select({
        fields: defaultItemFields,
      })
      .all();

    itemRecords.forEach((record) => {
      const name = record.get(itemFields.name);
      const width = record.get(itemFields.width);
      const length = record.get(itemFields.length);
      const height = record.get(itemFields.height);
      const description = record.get(itemFields.description);
      const amazonProducts = record.get(itemFields.amazonProducts);
      const recordId = record.get(itemFields.recordId);
      const linkedASINs = record.get(itemFields.linkedASINs);
      const itemType = record.get(itemFields.itemType);

      /**
       * if any of the above values are undefined, throw an error
       */
      if (
        name === undefined ||
        width === undefined ||
        length === undefined ||
        height === undefined ||
        description === undefined ||
        recordId === undefined
      ) {
        // console.error(
        //   'Attempted to fetch item records from Airtable, but one or more of the values was undefined. Item type ID: ' +
        //     itemTypeId
        // );
        // console.error(record);
      } else if (
        amazonProducts === undefined ||
        amazonProducts.toString()?.split(',').length === 0
      ) {
        // console.error('Fetched Item with no amazonProducts. Skipping. ID: ' + itemTypeId);
      } else {
        items.push({
          name: name.toString(),
          width: parseInt(width.toString()),
          length: parseInt(length.toString()),
          height: parseInt(height.toString()),
          description: description.toString(),
          amazonProducts: amazonProducts ? amazonProducts.toString()?.split(',') : [],
          recordId: recordId.toString(),
          linkedASINs: linkedASINs ? linkedASINs?.toString()?.split(',') : [],
          itemType: itemType ? itemType.toString() : undefined,
        });
      }
    });

    return items;
  } catch (e) {
    // console.error(`Error fetching Item data, table ID ${itemTypeId}:`);
    // console.error(e);

    return items;
  }
};

export default selectAllOfItemType;
