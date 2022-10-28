import { AmazonProductMap } from '../../../airtable/amazonProducts';
import SortableProductTable from '../SortableProductTable';
import { CartItem } from '../ShoppingCartTable';

const DehumidifierProductTable = ({
  item,
  amazonProducts,
  changeSelectedProductASIN,
}: {
  item: CartItem;
  amazonProducts: AmazonProductMap;
  changeSelectedProductASIN: (ASIN: string) => void;
}) => {
  return (
    <SortableProductTable
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

export default DehumidifierProductTable;
