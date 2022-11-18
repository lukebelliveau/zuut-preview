import { FieldSet, Records } from 'airtable';
import { useQuery } from '@tanstack/react-query';
import queryKeys from '../lib/queryKeys';
import {
  airtableBase,
  airtableTables,
  amazonProductFields,
} from './airtableBase';
import { CartItem } from 'src/components/cart/ShoppingCartTable';

export interface AmazonProductDetailMap {
  [ASIN: string]: AmazonProductDetail;
}

export interface AmazonProductDetail extends AmazonProductRecord {
  totalToPurchase: number;
  pricePerUnit: number;
  totalCost: number;
  itemQuantity: number;
}

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

  dimensions: string;
  squareFootage: string;
  cubicFootage: string;
  height: string;

  spectrum: string;
  dimming: string;
  wattage: string;
  daisyChain: string;

  airFlowRating: string;
  width: string;
  speedAdjustable: string;
  btu: string;
  thermostat: string;
  control: string;
  dehumidifier: string;
  noiseLevel: string;
  exhaust: string;
  coverage: string;
  capacity: string;
  humiditySensor: string;
  timer: string;

  unitCount: string;

  rating: string;
  price: string;
}

export const useQueryAmazonProductsByCartItem = (cartItems: CartItem[]) => {
  let allASINs = cartItems.map((item) => item.linkedASINs).flat();

  return useQuery([allASINs], () => {
    return selectAmazonProductRecordsByASIN(allASINs);
  });
};

export const useQueryAmazonProductsByASIN = (
  ASINs: string[],
  itemName: string
) => {
  return useQuery([queryKeys.amazonProductsByASIN, [itemName]], () => {
    return selectAmazonProductRecordsByASIN(ASINs);
  });
};

const createAmazonProductMap = (amazonProductRecords: Records<FieldSet>) => {
  const amazonProducts: AmazonProductMap = {};

  amazonProductRecords.forEach((record) => {
    const ASIN = record.get(amazonProductFields.ASIN.name);
    const recordId = record.get(amazonProductFields.recordId.name);
    const productName = record.get(amazonProductFields.productName.name);

    const shape = record.get(amazonProductFields.shape.name);
    const material = record.get(amazonProductFields.material.name);
    const handles = record.get(amazonProductFields.handles.name);

    const dimensions = record.get(amazonProductFields.dimensions.name);
    const squareFootage = record.get(amazonProductFields.squareFootage.name);
    const cubicFootage = record.get(amazonProductFields.cubicFootage.name);
    const height = record.get(amazonProductFields.height.name);

    const spectrum = record.get(amazonProductFields.spectrum.name);
    const dimming = record.get(amazonProductFields.dimming.name);
    const wattage = record.get(amazonProductFields.wattage.name);
    const daisyChain = record.get(amazonProductFields.daisyChain.name);

    const airFlowRating = record.get(amazonProductFields.airFlowRating.name);
    const width = record.get(amazonProductFields.width.name);
    const speedAdjustable = record.get(
      amazonProductFields.speedAdjustable.name
    );
    const btu = record.get(amazonProductFields.btu.name);
    const thermostat = record.get(amazonProductFields.thermostat.name);
    const control = record.get(amazonProductFields.control.name);
    const dehumidifier = record.get(amazonProductFields.dehumidifier.name);
    const noiseLevel = record.get(amazonProductFields.noiseLevel.name);
    const exhaust = record.get(amazonProductFields.exhaust.name);
    const coverage = record.get(amazonProductFields.coverage.name);
    const capacity = record.get(amazonProductFields.capacity.name);
    const humiditySensor = record.get(amazonProductFields.humiditySensor.name);
    const timer = record.get(amazonProductFields.timer.name);
    const unitCount = record.get(amazonProductFields.unitCount.name);
    const rating = record.get(amazonProductFields.rating.name);
    const price = record.get(amazonProductFields.price.name);

    if (ASIN === undefined) {
      // console.log('Skipping record because ASIN is undefined', record);
      return;
    } else if (recordId === undefined || productName === undefined) {
      // console.error(
      //   'Attempted to fetch amazonProducts records from Airtable, but one or more of the values was undefined:',
      //   record
      // );
      return;
    }

    amazonProducts[ASIN.toString()] = {
      ASIN: ASIN.toString(),
      recordId: recordId.toString(),
      productName: productName.toString(),

      shape: shape ? shape.toString() : NOT_AVAILABLE,
      material: material ? material.toString() : NOT_AVAILABLE,
      handles: handles ? handles.toString() : NOT_AVAILABLE,

      dimensions: dimensions ? dimensions.toString() : NOT_AVAILABLE,
      squareFootage: squareFootage ? squareFootage.toString() : NOT_AVAILABLE,
      cubicFootage: cubicFootage ? cubicFootage.toString() : NOT_AVAILABLE,
      height: height ? height.toString() : NOT_AVAILABLE,

      spectrum: spectrum ? spectrum.toString() : NOT_AVAILABLE,
      dimming: dimming ? dimming.toString() : NOT_AVAILABLE,
      wattage: wattage ? wattage.toString() : NOT_AVAILABLE,
      daisyChain: daisyChain ? daisyChain.toString() : NOT_AVAILABLE,

      airFlowRating: airFlowRating ? airFlowRating.toString() : NOT_AVAILABLE,
      width: width ? width.toString() : NOT_AVAILABLE,
      speedAdjustable: speedAdjustable
        ? speedAdjustable.toString()
        : NOT_AVAILABLE,
      btu: btu ? btu.toString() : NOT_AVAILABLE,
      thermostat: thermostat ? thermostat.toString() : NOT_AVAILABLE,
      control: control ? control.toString() : NOT_AVAILABLE,
      dehumidifier: dehumidifier ? dehumidifier.toString() : NOT_AVAILABLE,
      noiseLevel: noiseLevel ? noiseLevel.toString() : NOT_AVAILABLE,
      exhaust: exhaust ? exhaust.toString() : NOT_AVAILABLE,
      coverage: coverage ? coverage.toString() : NOT_AVAILABLE,
      capacity: capacity ? capacity.toString() : NOT_AVAILABLE,
      humiditySensor: humiditySensor
        ? humiditySensor.toString()
        : NOT_AVAILABLE,
      timer: timer ? timer.toString() : NOT_AVAILABLE,
      unitCount: unitCount ? unitCount.toString() : '1',
      rating: rating ? rating.toString() : NOT_AVAILABLE,
      price: price ? price.toString() : NOT_AVAILABLE,
    };
  });

  return amazonProducts;
};

const NOT_AVAILABLE = 'Not Available';

export const selectAmazonProductRecordsByASIN = async (
  ASINs: string[]
): Promise<AmazonProductMap> => {
  if (ASINs.length === 0) return {};

  let filterByFormula = 'OR(';
  ASINs.forEach((ASIN) => {
    filterByFormula += `ASIN = '${ASIN}', `;
  });
  filterByFormula = filterByFormula.slice(0, -2);
  filterByFormula += ')';

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

          amazonProductFields.dimensions.fieldId,
          amazonProductFields.squareFootage.fieldId,
          amazonProductFields.cubicFootage.fieldId,
          amazonProductFields.height.fieldId,

          amazonProductFields.spectrum.fieldId,
          amazonProductFields.dimming.fieldId,
          amazonProductFields.wattage.fieldId,
          amazonProductFields.daisyChain.fieldId,

          amazonProductFields.airFlowRating.fieldId,
          amazonProductFields.width.fieldId,
          amazonProductFields.speedAdjustable.fieldId,
          amazonProductFields.btu.fieldId,
          amazonProductFields.thermostat.fieldId,
          amazonProductFields.control.fieldId,
          amazonProductFields.dehumidifier.fieldId,
          amazonProductFields.noiseLevel.fieldId,
          amazonProductFields.exhaust.fieldId,
          amazonProductFields.coverage.fieldId,
          amazonProductFields.capacity.fieldId,
          amazonProductFields.humiditySensor.fieldId,
          amazonProductFields.timer.fieldId,
          amazonProductFields.unitCount.fieldId,
          amazonProductFields.rating.fieldId,
          amazonProductFields.price.fieldId,
        ],
        filterByFormula,
      })
      .all();

    const amazonProducts = createAmazonProductMap(amazonProductRecords);

    return amazonProducts;
  } catch (e) {
    // console.error('Error fetching amazonProduct data:');
    // console.error(e);

    return {};
  }
};
