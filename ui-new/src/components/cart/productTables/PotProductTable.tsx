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
      columns={[
        { name: 'Product Name', property: 'productName' },
        { name: 'Shape', property: 'shape' },
        { name: 'Material', property: 'material' },
        { name: 'Handles', property: 'handles' },
        { name: 'Rating', property: 'rating' },
        { name: 'Price', property: 'price' },
      ]}
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
          numeric: false,
        },
        {
          id: 'price',
          label: 'Price',
          disablePadding: false,
          numeric: false,
        },
      ]}
    />
  );
};

export default PotProductTable;
