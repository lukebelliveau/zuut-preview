import { selectAllAmazonProducts } from './amazonProducts';
import { selectAllLights } from './lights';
import { selectAllPots, selectPotsByRecordId } from './pots';
import { useQuery } from 'react-query';
import queryKeys from '../lib/queryKeys';
import { selectAllTents } from './tents';
import { selectAllMiscItems } from './misc';
import { Record } from './Record';
import { selectAllWaterItems } from './water';
import selectAllClimateItems from './climate';

const selectAllItems = async (): Promise<Record[]> => {
  const allPotsPromise = selectAllPots();
  const allLightsPromise = selectAllLights();
  const allTentsPromise = selectAllTents();
  const allWaterItemsPromise = selectAllWaterItems();
  const allClimateItemsPromise = selectAllClimateItems();
  const allMiscItemsPromise = selectAllMiscItems();

  const [
    allPots,
    allLights,
    allTents,
    allWaterItems,
    allClimateItems,
    allMiscItems,
  ] = await Promise.all([
    allPotsPromise,
    allLightsPromise,
    allTentsPromise,
    allWaterItemsPromise,
    allClimateItemsPromise,
    allMiscItemsPromise,
  ]);

  console.log(allClimateItems);

  return [
    ...allPots,
    ...allLights,
    ...allTents,
    ...allWaterItems,
    ...allClimateItems,
    ...allMiscItems,
  ];
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
  selectAllWaterItems,
  selectAllClimateItems,
  useQueryCartItems,
};

export default airtableApi;
