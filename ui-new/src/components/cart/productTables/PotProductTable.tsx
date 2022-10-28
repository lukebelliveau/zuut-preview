import { AmazonProductMap } from '../../../airtable/amazonProducts';
import SortableProductTable from '../SortableProductTable';
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
        // {
        //   id: 'unitCount',
        //   label: 'Unit Count',
        //   disablePadding: false,
        //   numeric: false,
        // },
        // {
        //   id: 'totalToPurchase',
        //   label: 'Total to purchase',
        //   disablePadding: false,
        //   numeric: false,
        // },
        // {
        //   id: 'pricePerUnit',
        //   label: 'Price per Unit',
        //   disablePadding: false,
        //   numeric: false,
        // },
        // {
        //   id: 'unitCount',
        //   label: 'Unit Count',
        //   disablePadding: false,
        //   numeric: false,
        // },
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
          numeric: true,
        },
      ]}
    />
  );
};

export default PotProductTable;
