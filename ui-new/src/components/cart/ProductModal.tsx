import { CartItem } from './ShoppingCartTable';
import Modal from 'react-modal';
import { AmazonProductMap, useQueryAmazonProductsByASIN } from '../../airtable/amazonProducts';
import PotProductTable from './productTables/PotProductTable';
import { POT_ITEM_TYPE } from '../../lib/item/potItem';
import { TENT_ITEM_TYPE } from '../../lib/item/tentItem';
import TentProductTable from './productTables/TentProductTable';
import { LIGHT_ITEM_TYPE } from '../../lib/item/lightItem';
import LightProductTable from './productTables/LightProductTable';
import { EXHAUST_FAN_ITEM_TYPE } from '../../lib/item/exhaustFanItem';
import ExhaustFanProductTable from './productTables/ExhaustFanProductTable';
import { DUCT_ITEM_TYPE } from '../../lib/item/ductItem';
import DuctingProductTable from './productTables/DuctingProductTable';
import { FLOOR_AC_ITEM_TYPE } from '../../lib/item/floorACItem';
import ACProductTable from './productTables/ACProductTable';
import { HEAT_ITEM_TYPE } from '../../lib/item/heatItem';
import HeaterProductTable from './productTables/HeaterProductTable';
import { PURIFIER_ITEM_TYPE } from '../../lib/item/purifierItem';
import PurifierProductTable from './productTables/PurifierProductTable';
import { HUMIDIFIER_ITEM_TYPE } from '../../lib/item/humidifierItem';
import HumidifierProductTable from './productTables/HumidifierProductTable';
import { DEHUMIDIFIER_ITEM_TYPE } from '../../lib/item/dehumidifierItem';
import DehumidifierProductTable from './productTables/DehumidifierProductTable';
import { MISC_ITEM_TYPE } from '../../lib/item/miscItem';
import MiscProductTable from './productTables/MiscProductTable';
import { WATER_ITEM_TYPE } from '../../lib/item/waterItem';
import WaterProductTable from './productTables/WaterProductTable';
import { CARBON_FILTER_ITEM_TYPE } from 'src/lib/item/carbonFilterItem';
import CarbonFilterProductTable from './productTables/CarbonFilterProductTable';
import { Box, Button, IconButton, Typography } from '@mui/material';
import Iconify from '../Iconify';

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
  const { isLoading, error, data: amazonProducts } = useQueryAmazonProductsByASIN(ASINs, item.name);

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
    case LIGHT_ITEM_TYPE:
      ProductTable = LightProductTable;
      break;
    case EXHAUST_FAN_ITEM_TYPE:
      ProductTable = ExhaustFanProductTable;
      break;
    case DUCT_ITEM_TYPE:
      ProductTable = DuctingProductTable;
      break;
    case FLOOR_AC_ITEM_TYPE:
      ProductTable = ACProductTable;
      break;
    case HEAT_ITEM_TYPE:
      ProductTable = HeaterProductTable;
      break;
    case PURIFIER_ITEM_TYPE:
      ProductTable = PurifierProductTable;
      break;
    case HUMIDIFIER_ITEM_TYPE:
      ProductTable = HumidifierProductTable;
      break;
    case DEHUMIDIFIER_ITEM_TYPE:
      ProductTable = DehumidifierProductTable;
      break;
    case MISC_ITEM_TYPE:
      ProductTable = MiscProductTable;
      break;
    case WATER_ITEM_TYPE:
      ProductTable = WaterProductTable;
      break;
    case CARBON_FILTER_ITEM_TYPE:
      ProductTable = CarbonFilterProductTable;
      break;
  }

  return (
    <Modal isOpen={open} onRequestClose={closeModal} contentLabel="Example Modal">
      <Box>
        <div style={{ display: 'flex', justifyContent: 'space-between' }}>
          <IconButton sx={{ visibility: 'hidden', width: 0, height: 0 }}>
            <Iconify icon={'eva:close-fill'} width={0} height={0} />
          </IconButton>
          <Typography variant="h3">Select Product</Typography>
          <IconButton onClick={closeModal}>
            <Iconify icon={'eva:close-fill'} width={20} height={20} />
          </IconButton>
        </div>
        <ProductTable
          item={item}
          amazonProducts={amazonProducts}
          changeSelectedProductASIN={changeSelectedProductASIN}
        />
      </Box>
    </Modal>
  );
};

export default ProductModal;
