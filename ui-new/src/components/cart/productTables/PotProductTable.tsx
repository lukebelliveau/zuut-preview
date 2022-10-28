import { AmazonProductMap } from '../../../airtable/amazonProducts';
import EnhancedTable from '../EnhancedTable';
import { CartItem } from '../ShoppingCartTable';

const PotProductTable = ({
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
        {
          id: 'productName',
          label: 'Product Name',
          disablePadding: true,
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
          numeric: true,
        },
        {
          id: 'price',
          label: 'Price',
          disablePadding: false,
          numeric: true,
        },
      ]}
    />
  );
};

export default PotProductTable;
