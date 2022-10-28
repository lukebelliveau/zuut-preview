import { AmazonProductMap } from '../../../airtable/amazonProducts';
import SortableProductTable from '../SortableProductTable';
import { CartItem } from '../ShoppingCartTable';

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
    <SortableProductTable
      item={item}
      amazonProducts={amazonProducts}
      changeSelectedProductASIN={changeSelectedProductASIN}
      headCells={[
        { label: 'Product Name', id: 'productName', disablePadding: false, numeric: false },
        { label: 'Thermostat', id: 'thermostat', disablePadding: false, numeric: false },
        { label: 'Capacity', id: 'capacity', disablePadding: false, numeric: false },
        { label: 'Control', id: 'control', disablePadding: false, numeric: false },
        { label: 'Dehumidifier', id: 'dehumidifier', disablePadding: false, numeric: false },
        { label: 'Noise Level', id: 'noiseLevel', disablePadding: false, numeric: false },
        { label: 'Exhaust', id: 'exhaust', disablePadding: false, numeric: false },
        { label: 'Coverage', id: 'coverage', disablePadding: false, numeric: false },
        { label: 'Rating', id: 'rating', disablePadding: false, numeric: false },
        { label: 'Price', id: 'price', disablePadding: false, numeric: true },
      ]}
    />
  );
};

export default ACProductTable;
