import { selectAllAmazonProducts } from './amazonProducts';
import { selectAllLights } from './lights';
import { selectAllPots, selectPotsByRecordId } from './pots';
import { useQuery } from 'react-query';
import queryKeys from '../lib/queryKeys';
import { selectAllTents } from './tents';
import { selectAllMiscItems } from './misc';
import { Record } from './Record';

const selectAllItems = async (): Promise<Record[]> => {
  const allPotsPromise = selectAllPots();
  const allLightsPromise = selectAllLights();
  const allTentsPromise = selectAllTents();
  const allMiscItemsPromise = selectAllMiscItems();

  const [allPots, allLights, allTents, allMiscItems] = await Promise.all([
    allPotsPromise,
    allLightsPromise,
    allTentsPromise,
    allMiscItemsPromise,
  ]);

  return [...allPots, ...allLights, ...allTents, ...allMiscItems];
};

export const selectItemsByRecordId = async (recordIds: string[]) => {
  const allItemsPromise = selectAllItems();
  const amazonProductsPromise = selectAllAmazonProducts();

  const [allItems, amazonProducts] = await Promise.all([
    allItemsPromise,
    amazonProductsPromise,
  ]);

  const selectedItems: Record[] = [];

  recordIds.forEach((recordId) => {
    const item = allItems.find((item) => item.recordId === recordId);
    if (item) {
      selectedItems.push(item);
    }
  });

  selectedItems.forEach((item) => {
    const associatedProducts = amazonProducts.filter((amazonProduct) => {
      return item.amazonProducts.includes(amazonProduct.recordId);
    });

    associatedProducts.forEach((product) => {
      item.linkedASINs.push(product.ASIN);
    });
  });

  /**
   * TODO: write a comparator to sort by item type, then sort by name within item types
   */
  selectedItems.sort();
  return selectedItems;
};

export const useQueryCartItems = ({ recordIds }: { recordIds: string[] }) => {
  return useQuery([queryKeys.cartItems, { recordIds }], () =>
    selectItemsByRecordId(recordIds)
  );
};

const airtableApi = {
  selectAllPots,
  selectPotsByRecordId,
  selectAllLights,
  selectAllTents,
  selectAllMiscItems,
  useQueryCartItems,
};

export default airtableApi;
