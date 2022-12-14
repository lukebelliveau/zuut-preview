import { AmazonProductDetailMap } from '../../../airtable/amazonProducts';
import SortableProductTable from '../SortableProductTable';
import { CartItem } from '../ShoppingCartTable';
import commonColumns from './commonColumns';

const ExhaustFanProductTable = ({
  item,
  amazonProducts,
  changeSelectedProductASIN,
}: {
  item: CartItem;
  amazonProducts: AmazonProductDetailMap;
  changeSelectedProductASIN: (ASIN: string) => void;
}) => {
  return (
    <SortableProductTable
      item={item}
      amazonProducts={amazonProducts}
      changeSelectedProductASIN={changeSelectedProductASIN}
      headCells={[
        { label: 'Product Name', id: 'productName', disablePadding: false, numeric: false },
        { label: 'Air Flow Rating', id: 'airFlowRating', disablePadding: false, numeric: false },
        { label: 'Width', id: 'width', disablePadding: false, numeric: false },
        { label: 'Speed Adjustable', id: 'speedAdjustable', disablePadding: false, numeric: false },
        { label: 'Rating', id: 'rating', disablePadding: false, numeric: false },
        ...commonColumns,
      ]}
    />
  );
};

export default ExhaustFanProductTable;
