import { AmazonProductDetailMap } from '../../../airtable/amazonProducts';
import SortableProductTable from '../SortableProductTable';
import { CartItem } from '../ShoppingCartTable';

const CarbonFilterProductTable = ({
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
        { label: 'Rating', id: 'rating', disablePadding: false, numeric: false },
        { label: 'Unit Count', id: 'unitCount', disablePadding: false, numeric: false },
        { label: 'Price per Unit', id: 'pricePerUnit', disablePadding: false, numeric: true },
        {
          label: 'Total to purchase',
          id: 'totalToPurchase',
          disablePadding: false,
          numeric: true,
        },
        { label: 'Price', id: 'price', disablePadding: false, numeric: true },
      ]}
    />
  );
};

export default CarbonFilterProductTable;
