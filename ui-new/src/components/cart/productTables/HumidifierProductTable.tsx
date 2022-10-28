import { AmazonProductMap } from '../../../airtable/amazonProducts';
import EnhancedTable from '../EnhancedTable';
import { CartItem } from '../ShoppingCartTable';

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
    <EnhancedTable
      item={item}
      amazonProducts={amazonProducts}
      changeSelectedProductASIN={changeSelectedProductASIN}
      headCells={[
        { label: 'Product Name', id: 'productName', disablePadding: true, numeric: false },
        { label: 'Capacity', id: 'capacity', disablePadding: true, numeric: false },
        { label: 'Humidity Sensor', id: 'humiditySensor', disablePadding: true, numeric: false },
        { label: 'Control', id: 'control', disablePadding: true, numeric: false },
        { label: 'Timer', id: 'timer', disablePadding: true, numeric: false },
        { label: 'Rating', id: 'rating', disablePadding: true, numeric: true },
        { label: 'Price', id: 'price', disablePadding: true, numeric: true },
      ]}
    />
  );
};

export default HumidifierProductTable;
