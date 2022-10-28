import { AmazonProductMap } from '../../../airtable/amazonProducts';
import EnhancedTable from '../EnhancedTable';
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
    <EnhancedTable
      item={item}
      amazonProducts={amazonProducts}
      changeSelectedProductASIN={changeSelectedProductASIN}
      headCells={[
        { label: 'Product Name', id: 'productName', disablePadding: true, numeric: false },
        { label: 'Spectrum', id: 'spectrum', disablePadding: true, numeric: false },
        { label: 'Dimming', id: 'dimming', disablePadding: true, numeric: false },
        { label: 'Wattage', id: 'wattage', disablePadding: true, numeric: false },
        { label: 'Daisy Chain', id: 'daisyChain', disablePadding: true, numeric: false },
        { label: 'Rating', id: 'rating', disablePadding: true, numeric: true },
        { label: 'Price', id: 'price', disablePadding: true, numeric: true },
      ]}
    />
  );
};

export default LightProductTable;
