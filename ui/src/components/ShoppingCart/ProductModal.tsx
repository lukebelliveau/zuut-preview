import { CartItem } from './ShoppingCartTable';
import Modal from 'react-modal';
import {
  AmazonProductMap,
  useQueryAmazonProductsByASIN,
} from '../../airtable/amazonProducts';
import PotProductTable from './productTables/PotProductTable';
import { POT_ITEM_TYPE } from '../../lib/item/potItem';
import { TENT_ITEM_TYPE } from '../../lib/item/tentItem';
import TentProductTable from './productTables/TentProductTable';

interface ProductTableProps {
  item: CartItem;
  amazonProducts: AmazonProductMap;
  changeSelectedProductASIN: (ASIN: string) => void;
}

const ProductModal = ({
  open,
  closeModal,
  item,
  index,
  changeSelectedASIN,
}: {
  open: boolean;
  item: CartItem;
  index: number;
  closeModal: () => void;
  changeSelectedASIN: (ASIN: string, index: number) => void;
}) => {
  const ASINs = item.linkedASINs;
  const {
    isLoading,
    error,
    data: amazonProducts,
  } = useQueryAmazonProductsByASIN(ASINs);

  if (isLoading || error || amazonProducts === undefined) {
    if (isLoading) return <div>Loading products...</div>;
    if (error) return <div>Error!</div>;
    if (amazonProducts === undefined) return <div>Loading products...</div>;
  }

  const changeSelectedProductASIN = (ASIN: string) => {
    changeSelectedASIN(ASIN, index);
    closeModal();
  };

  let ProductTable: (props: ProductTableProps) => JSX.Element = () => (
    <div>There is no product table for item type {item.itemType}.</div>
  );

  switch (item.itemType) {
    case POT_ITEM_TYPE:
      ProductTable = PotProductTable;
      break;
    case TENT_ITEM_TYPE:
      ProductTable = TentProductTable;
      break;
  }

  return (
    <Modal
      isOpen={open}
      onRequestClose={closeModal}
      contentLabel="Example Modal"
    >
      <div className="reset-playground-modal">
        <p>Item type: {item.itemType}</p>
        <p>index: {index}</p>
        <ProductTable
          item={item}
          amazonProducts={amazonProducts}
          changeSelectedProductASIN={changeSelectedProductASIN}
        />
        <div>
          <button onClick={closeModal}>Close</button>
        </div>
      </div>
    </Modal>
  );
};

export default ProductModal;
