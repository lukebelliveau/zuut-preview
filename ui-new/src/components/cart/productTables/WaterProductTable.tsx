import { AmazonProductMap } from '../../../airtable/amazonProducts';
import { CartItem } from '../ShoppingCartTable';
import ProductTable from './ProductTable';

const WaterProductTable = ({
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
        { name: 'Rating', property: 'rating' },
        { name: 'Price', property: 'price' },
      ]}
    />
  );
};

export default WaterProductTable;
