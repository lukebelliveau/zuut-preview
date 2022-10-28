import { AmazonProductMap } from '../../../airtable/amazonProducts';
import SortableProductTable from '../SortableProductTable';
import { CartItem } from '../ShoppingCartTable';

const LightProductTable = ({
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
        { label: 'Spectrum', id: 'spectrum', disablePadding: false, numeric: false },
        { label: 'Dimming', id: 'dimming', disablePadding: false, numeric: false },
        { label: 'Wattage', id: 'wattage', disablePadding: false, numeric: false },
        { label: 'Daisy Chain', id: 'daisyChain', disablePadding: false, numeric: false },
        { label: 'Rating', id: 'rating', disablePadding: false, numeric: false },
        { label: 'Price', id: 'price', disablePadding: false, numeric: true },
      ]}
    />
  );
};

export default LightProductTable;
