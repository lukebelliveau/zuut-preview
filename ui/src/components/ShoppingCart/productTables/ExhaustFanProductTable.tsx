import { AmazonProductMap } from '../../../airtable/amazonProducts';
import { CartItem } from '../ShoppingCartTable';
import ProductTable from './ProductTable';

export interface ProductColumn {
  name: string;
  property: ProductColumn;
}

const ExhaustFanProductTable = ({
  item,
  amazonProducts,
  changeSelectedProductASIN,
}: {
  item: CartItem;
  amazonProducts: AmazonProductMap;
  changeSelectedProductASIN: (ASIN: string) => void;
}) => {
  return (
    <ProductTable
      item={item}
      amazonProducts={amazonProducts}
      changeSelectedProductASIN={changeSelectedProductASIN}
      columns={[
        { name: 'Product Name', property: 'productName' },
        { name: 'Air Flow Rating', property: 'airFlowRating' },
        { name: 'Width', property: 'width' },
        { name: 'Speed Adjustable', property: 'speedAdjustable' },
      ]}
    />
  );
};

export default ExhaustFanProductTable;
