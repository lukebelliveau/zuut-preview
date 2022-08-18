import { selectAllAmazonProducts } from './amazonProducts';
import { selectAllLights } from './lights';
import { selectAllPots, selectPotsByRecordId } from './pots';
import { ItemRecord } from './ItemRecord';
import { useQuery } from 'react-query';
import queryKeys from '../lib/queryKeys';

const selectAllItems = async (): Promise<ItemRecord[]> => {
  const allPotsPromise = selectAllPots();
  const allLightsPromise = selectAllLights();

  const [allPots, allLights] = await Promise.all([
    allPotsPromise,
    allLightsPromise,
  ]);

  return [...allPots, ...allLights];
};

export const selectItemsByRecordId = async (recordIds: string[]) => {
  const allItemsPromise = selectAllItems();
  const amazonProductsPromise = selectAllAmazonProducts();

  const [allItems, amazonProducts] = await Promise.all([
    allItemsPromise,
    amazonProductsPromise,
  ]);

  const selectedItems: ItemRecord[] = [];

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
  useQueryCartItems,
};

export default airtableApi;
