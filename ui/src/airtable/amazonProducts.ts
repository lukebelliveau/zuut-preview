import { useQuery } from 'react-query';
import queryKeys from '../lib/queryKeys';
import { airtableBase, airtableTables } from './airtableBase';

export interface AmazonProductRecord {
  ASIN: string;
  recordId: string;
  productName: string;
}

export const useQueryAmazonProductsByASIN = (ASINs: string[]) => {
  const { data: allAmazonProducts } = useQuery(
    [queryKeys.allAmazonProducts],
    selectAllAmazonProducts
  );

  return useQuery(
    [queryKeys.amazonProducts, { ASINs }],
    () => selectAmazonProdutsByASIN(ASINs),
    {
      enabled: !!allAmazonProducts,
    }
  );
};

const selectAmazonProdutsByASIN = async (
  ASINs: string[]
): Promise<{ [ASIN: string]: AmazonProductRecord }> => {
  const allAmazonProducts = await selectAllAmazonProducts();
  const amazonProducts: { [ASIN: string]: AmazonProductRecord } = {};

  allAmazonProducts.forEach((amazonProduct) => {
    if (ASINs.includes(amazonProduct.ASIN)) {
      amazonProducts[amazonProduct.ASIN] = amazonProduct;
    }
  });

  return amazonProducts;
};

export const selectAllAmazonProducts = async (): Promise<
  AmazonProductRecord[]
> => {
  const amazonProducts: AmazonProductRecord[] = [];
  try {
    const amazonProductRecords = await airtableBase(
      airtableTables.amazonProducts.id
    )
      .select({
        fields: ['ASIN', 'recordId', 'productName'],
      })
      .all();

    amazonProductRecords.forEach((record) => {
      const ASIN = record.get('ASIN');
      const recordId = record.get('recordId');
      const productName = record.get('productName');

      /**
       * if any of the above values are undefined, throw an error
       */
      if (
        ASIN === undefined ||
        recordId === undefined ||
        productName === undefined
      ) {
        console.error(
          'Attempted to fetch amazonProducts records from Airtable, but one or more of the values was undefined:',
          record
        );
        return;
      }

      amazonProducts.push({
        ASIN: ASIN.toString(),
        recordId: recordId.toString(),
        productName: productName.toString(),
      });
    });

    return amazonProducts;
  } catch (e) {
    console.error('Error fetching amazonProduct data:');
    console.error(e);

    return amazonProducts;
  }
};
