import { AmazonProductMap } from '../../../airtable/amazonProducts';
import { CartItem } from '../ShoppingCartTable';
import ProductTable from './ProductTable';

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
    <ProductTable
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
    />
  );
};

export default PotProductTable;
