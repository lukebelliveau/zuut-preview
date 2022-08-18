import { airtableBase, defaultItemFields } from './airtableBase';
import { ItemRecord } from './ItemRecord';

const selectAllOfItemType = async (
  itemTypeId: string
): Promise<ItemRecord[]> => {
  const pots: ItemRecord[] = [];
  try {
    const potRecords = await airtableBase(itemTypeId)
      .select({
        fields: defaultItemFields,
      })
      .all();

    potRecords.forEach((record) => {
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
          'Attempted to fetch pot records from Airtable, but one or more of the values was undefined'
        );
      }

      pots.push({
        name: name.toString(),
        width: parseInt(width.toString()),
        length: parseInt(length.toString()),
        height: parseInt(height.toString()),
        description: description.toString(),
        amazonProducts: amazonProducts.toString()?.split(','),
        recordId: recordId.toString(),
        linkedASINs: [],
      });
    });

    return pots;
  } catch (e) {
    console.error('Error fetching Pot data:');
    console.error(e);

    return pots;
  }
};

export default selectAllOfItemType;
