import { airtableBase, airtableTables } from './airtableBase';

export interface AmazonProductRecord {
  ASIN: string;
  recordId: string;
}

export const selectAllAmazonProducts = async (): Promise<
  AmazonProductRecord[]
> => {
  const amazonProducts: AmazonProductRecord[] = [];
  try {
    const potRecords = await airtableBase(airtableTables.amazonProducts.id)
      .select({
        fields: ['ASIN', 'recordId'],
      })
      .all();

    potRecords.forEach((record) => {
      const ASIN = record.get('ASIN');
      const recordId = record.get('recordId');

      /**
       * if any of the above values are undefined, throw an error
       */
      if (ASIN === undefined || recordId === undefined) {
        throw new Error(
          'Attempted to fetch amazonProducts records from Airtable, but one or more of the values was undefined'
        );
      }

      amazonProducts.push({
        ASIN: ASIN.toString(),
        recordId: recordId.toString(),
      });
    });

    return amazonProducts;
  } catch (e) {
    console.error('Error fetching Tent data:');
    console.error(e);

    return amazonProducts;
  }
};
