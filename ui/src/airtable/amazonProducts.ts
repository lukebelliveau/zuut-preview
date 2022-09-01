import { useQuery } from 'react-query';
import queryKeys from '../lib/queryKeys';
import {
  airtableBase,
  airtableTables,
  amazonProductFields,
} from './airtableBase';

export interface AmazonProductMap {
  [ASIN: string]: AmazonProductRecord;
}

export interface AmazonProductRecord {
  ASIN: string;
  recordId: string;
  productName: string;
  shape: string;
  material: string;
  handles: string;
}

export const useQueryAmazonProductsByASIN = (ASINs: string[]) => {
  const { data: allAmazonProducts } = useQuery(
    [queryKeys.allAmazonProducts],
    selectAllAmazonProducts
  );

  return useQuery(
    [queryKeys.amazonProducts, { ASINs }],
    () => selectAmazonProductsByASIN(ASINs),
    {
      enabled: !!allAmazonProducts,
    }
  );
};

const selectAmazonProductsByASIN = async (
  ASINs: string[]
): Promise<AmazonProductMap> => {
  const allAmazonProducts = await selectAllAmazonProducts();
  const amazonProducts: AmazonProductMap = {};

  allAmazonProducts.forEach((amazonProduct) => {
    if (ASINs.includes(amazonProduct.ASIN)) {
      amazonProducts[amazonProduct.ASIN] = amazonProduct;
    }
  });

  return amazonProducts;
};

const NOT_AVAILABLE = 'Not Available';

export const selectAllAmazonProducts = async (): Promise<
  AmazonProductRecord[]
> => {
  const amazonProducts: AmazonProductRecord[] = [];
  try {
    const amazonProductRecords = await airtableBase(
      airtableTables.amazonProducts.id
    )
      .select({
        fields: [
          amazonProductFields.ASIN.fieldId,
          amazonProductFields.recordId.fieldId,
          amazonProductFields.productName.fieldId,

          amazonProductFields.shape.fieldId,
          amazonProductFields.material.fieldId,
          amazonProductFields.handles.fieldId,
        ],
      })
      .all();

    amazonProductRecords.forEach((record) => {
      const ASIN = record.get(amazonProductFields.ASIN.name);
      const recordId = record.get(amazonProductFields.recordId.name);
      const productName = record.get(amazonProductFields.productName.name);
      const shape = record.get(amazonProductFields.shape.name);
      const material = record.get(amazonProductFields.material.name);
      const handles = record.get(amazonProductFields.handles.name);

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
        shape: shape ? shape.toString() : NOT_AVAILABLE,
        material: material ? material.toString() : NOT_AVAILABLE,
        handles: handles ? handles.toString() : NOT_AVAILABLE,
      });
    });

    return amazonProducts;
  } catch (e) {
    console.error('Error fetching amazonProduct data:');
    console.error(e);

    return amazonProducts;
  }
};
