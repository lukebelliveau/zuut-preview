import { AmazonProductDetailMap } from '../../../airtable/amazonProducts';
import SortableProductTable from '../SortableProductTable';
import { CartItem } from '../ShoppingCartTable';
import commonColumns from './commonColumns';

const PotProductTable = ({
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
        {
          id: 'productName',
          label: 'Product Name',
          disablePadding: false,
          numeric: false,
        },
        {
          id: 'shape',
          label: 'Shape',
          disablePadding: false,
          numeric: false,
        },
        {
          id: 'material',
          label: 'Material',
          disablePadding: false,
          numeric: false,
        },
        {
          id: 'handles',
          label: 'Handles',
          disablePadding: false,
          numeric: false,
        },
        {
          id: 'rating',
          label: 'Rating',
          disablePadding: false,
          numeric: false,
        },
        {
          id: 'totalToPurchase',
          label: 'Total to purchase',
          disablePadding: false,
          numeric: true,
        },
        {
          id: 'totalCost',
          label: 'Total Cost',
          disablePadding: false,
          numeric: true,
        },
        ...commonColumns,
      ]}
    />
  );
};

export default PotProductTable;
