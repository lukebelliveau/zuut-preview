import { AmazonProductMap } from '../../../airtable/amazonProducts';
import { CartItem } from '../ShoppingCartTable';
import ProductTable from './ProductTable';

const HumidifierProductTable = ({
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
        { name: 'Capacity', property: 'capacity' },
        { name: 'Humidity Sensor', property: 'humiditySensor' },
        { name: 'Control', property: 'control' },
        { name: 'Timer', property: 'timer' },
      ]}
    />
  );
};

export default HumidifierProductTable;
