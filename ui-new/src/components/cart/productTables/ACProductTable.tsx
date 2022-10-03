import { AmazonProductMap } from '../../../airtable/amazonProducts';
import { CartItem } from '../ShoppingCartTable';
import ProductTable from './ProductTable';

const ACProductTable = ({
  item,
  amazonProducts,
  changeSelectedProductASIN,
}: {
  item: CartItem;
  amazonProducts: AmazonProductMap;
  changeSelectedProductASIN: (ASIN: string) => void;
}) => {
  return (
    <ProductTable
      item={item}
      amazonProducts={amazonProducts}
      changeSelectedProductASIN={changeSelectedProductASIN}
      columns={[
        { name: 'Product Name', property: 'productName' },
        { name: 'Thermostat', property: 'thermostat' },
        { name: 'Capacity', property: 'capacity' },
        { name: 'Control', property: 'control' },
        { name: 'Dehumidifier', property: 'dehumidifier' },
        { name: 'Noise Level', property: 'noiseLevel' },
        { name: 'Exhaust', property: 'exhaust' },
        { name: 'Coverage', property: 'coverage' },
        { name: 'Rating', property: 'rating' },
        { name: 'Price', property: 'price' },
      ]}
    />
  );
};

export default ACProductTable;
