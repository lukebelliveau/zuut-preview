import { AmazonProductMap } from '../../../airtable/amazonProducts';
import SortableProductTable from '../SortableProductTable';
import { CartItem } from '../ShoppingCartTable';

const CarbonFilterProductTable = ({
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
        { label: 'Air Flow Rating', id: 'airFlowRating', disablePadding: true, numeric: false },
        { label: 'Width', id: 'width', disablePadding: true, numeric: false },
        { label: 'Rating', id: 'rating', disablePadding: true, numeric: true },
        { label: 'Price', id: 'price', disablePadding: true, numeric: true },
      ]}
    />
  );
};

export default CarbonFilterProductTable;
