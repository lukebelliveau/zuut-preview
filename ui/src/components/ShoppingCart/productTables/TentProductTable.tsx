import { AmazonProductMap } from '../../../airtable/amazonProducts';
import { CartItem } from '../ShoppingCartTable';
import ProductTable from './ProductTable';

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
    <ProductTable
      item={item}
      amazonProducts={amazonProducts}
      changeSelectedProductASIN={changeSelectedProductASIN}
      columns={[
        { name: 'Product Name', property: 'productName' },
        { name: 'Square Footage', property: 'squareFootage' },
        { name: 'Cubic Footage', property: 'material' },
        { name: 'Height', property: 'height' },
      ]}
    />
  );
};

export default TentProductTable;
