import { AmazonProductMap } from '../../../airtable/amazonProducts';
import SortableProductTable from '../SortableProductTable';
import { CartItem } from '../ShoppingCartTable';

const TentProductTable = ({
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
        { label: 'Square Footage', id: 'squareFootage', disablePadding: true, numeric: false },
        { label: 'Cubic Footage', id: 'material', disablePadding: true, numeric: false },
        { label: 'Height', id: 'height', disablePadding: true, numeric: false },
        { label: 'Rating', id: 'rating', disablePadding: true, numeric: true },
        { label: 'Price', id: 'price', disablePadding: true, numeric: true },
      ]}
    />
  );
};

export default TentProductTable;
