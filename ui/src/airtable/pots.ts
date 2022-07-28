import { useQuery } from 'react-query';
import { airtableBase, airtableTables } from './airtableBase';
import { selectAllAmazonProducts } from './amazonProducts';

export interface PotRecord {
  name: string;
  width: number;
  length: number;
  height: number;
  description: string;
  amazonProducts: string[];
  amazonProductASINs: string[];
  recordId: string;
}

export const useQueryCartItems = ({ recordIds }: { recordIds: string[] }) => {
  return useQuery(['cartItems', { recordIds }], () =>
    selectPotsByRecordIdWithASINs(recordIds)
  );
};

export const selectPotsByRecordId = async (
  recordIds: string[]
): Promise<PotRecord[]> => {
  const allPots = await selectAllPots();

  const selectedPots: PotRecord[] = [];

  recordIds.forEach((recordId) => {
    const pot = allPots.find((pot) => pot.recordId === recordId);
    if (pot) {
      selectedPots.push(pot);
    }
  });

  return selectedPots;
};

export const potRecordComparator = (a: PotRecord, b: PotRecord) => {
  try {
    if (a.name === undefined || b.name === undefined) {
      throw Error('Tried to sort pots by name, but name is undefined');
    }
    // get number value of Pot (1, 3, 5 gallon etc)
    const aValue = a.name.split(' ')[0];
    const bValue = b.name.split(' ')[0];
    if (parseInt(aValue) > parseInt(bValue)) return 1;
    else return -1;
  } catch (e) {
    console.error(
      'Error creating Pot Item from airtable data. Skipping pot: ',
      a,
      b
    );
    console.error(e);
    return 0;
  }
};

export const selectPotsByRecordIdWithASINs = async (
  recordIds: string[]
): Promise<PotRecord[]> => {
  const allPotsPromise = selectAllPots();
  const amazonProductsPromise = selectAllAmazonProducts();

  const [allPots, amazonProducts] = await Promise.all([
    allPotsPromise,
    amazonProductsPromise,
  ]);

  const selectedPots: PotRecord[] = [];

  recordIds.forEach((recordId) => {
    const pot = allPots.find((pot) => pot.recordId === recordId);
    if (pot) {
      selectedPots.push(pot);
    }
  });

  selectedPots.forEach((pot) => {
    const amazonProductRecordIds = pot.amazonProducts;
    const associatedProducts = amazonProducts.filter((amazonProduct) => {
      return pot.amazonProducts.includes(amazonProduct.recordId);
    });
    associatedProducts.forEach((product) => {
      pot.amazonProductASINs.push(product.ASIN);
    });
  });

  console.log('SELECTED POTS WITH ASINs:');
  console.log(selectedPots);

  selectedPots.sort(potRecordComparator);

  return selectedPots;
};

export const selectAllPots = async (): Promise<PotRecord[]> => {
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
          'amazonProducts',
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
        amazonProductASINs: [],
      });
    });

    return pots;
  } catch (e) {
    console.error('Error fetching Tent data:');
    console.error(e);

    return pots;
  }
};
