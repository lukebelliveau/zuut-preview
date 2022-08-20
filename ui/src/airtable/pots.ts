import {
  airtableBase,
  airtableTables,
  defaultItemFields,
} from './airtableBase';
import { selectAllAmazonProducts } from './amazonProducts';
import { PlaceableItemRecord } from './Record';
import selectAllOfItemType from './selectAllOfItemType';

export const selectPotsByRecordId = async (
  recordIds: string[]
): Promise<PlaceableItemRecord[]> => {
  const allPots = await selectAllPots();

  const selectedPots: PlaceableItemRecord[] = [];

  recordIds.forEach((recordId) => {
    const pot = allPots.find((pot) => pot.recordId === recordId);
    if (pot) {
      selectedPots.push(pot);
    }
  });

  return selectedPots;
};

export const potRecordComparator = (
  a: PlaceableItemRecord,
  b: PlaceableItemRecord
) => {
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
): Promise<PlaceableItemRecord[]> => {
  const allPotsPromise = selectAllPots();
  const amazonProductsPromise = selectAllAmazonProducts();

  const [allPots, amazonProducts] = await Promise.all([
    allPotsPromise,
    amazonProductsPromise,
  ]);

  const selectedPots: PlaceableItemRecord[] = [];

  recordIds.forEach((recordId) => {
    const pot = allPots.find((pot) => pot.recordId === recordId);
    if (pot) {
      selectedPots.push(pot);
    }
  });

  selectedPots.forEach((pot) => {
    const associatedProducts = amazonProducts.filter((amazonProduct) => {
      return pot.amazonProducts.includes(amazonProduct.recordId);
    });
    associatedProducts.forEach((product) => {
      pot.linkedASINs.push(product.ASIN);
    });
  });

  selectedPots.sort(potRecordComparator);

  return selectedPots;
};

export const selectAllPots = async (): Promise<PlaceableItemRecord[]> => {
  return selectAllOfItemType(airtableTables.pots.id);
};
