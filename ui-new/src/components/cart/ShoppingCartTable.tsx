import {
  Card,
  CardHeader,
  Container,
  Stack,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from '@mui/material';
import { useEffect, useState } from 'react';
import { useQueryCartItems } from '../../airtable/airtableApi';
import { useQueryAmazonProductsByASIN } from '../../airtable/amazonProducts';
import { potRecordComparator } from '../../airtable/pots';
import { AirtableRecord, isPlaceableItemRecord } from '../../airtable/Record';
import { POT_ITEM_TYPE } from '../../lib/item/potItem';
import useQueryParams, { paramKeys } from '../../lib/url';
import Scrollbar from '../Scrollbar';
import { TableHeadCustom } from '../table';
import ProductModal from './ProductModal';
// import ProductModal from './ProductModal';

interface ShoppingCartUrlItem {
  quantity: number;
  ASIN: string | undefined;
}
const amazonZUUTTag = 'zuut04-20';

const createAmazonAddToShoppingCartUrl = (items: CartItem[]) => {
  let shoppingCartItems: { [itemName: string]: ShoppingCartUrlItem } = {};

  items.forEach((item) => {
    if (shoppingCartItems[item.name]) {
      shoppingCartItems[item.name].quantity += 1;
    } else {
      shoppingCartItems[item.name] = {
        quantity: 1,
        ASIN: item.selectedASIN,
      };
    }
  });

  let addToCartQuery = '';
  let uniqueItemCount = 0;

  Object.values(shoppingCartItems).forEach((item) => {
    if (item.ASIN !== undefined) {
      uniqueItemCount++;
      addToCartQuery += `ASIN.${uniqueItemCount}=${item.ASIN}&Quantity.${uniqueItemCount}=${item.quantity}&`;
    }
  });

  return `https://www.amazon.com/gp/aws/cart/add.html?${addToCartQuery}tag=${amazonZUUTTag}`;
};

const constructAmazonLinkWithASIN = (asin: string) => {
  return `https://www.amazon.com/dp/${asin}?tag=${amazonZUUTTag}`;
};

const renderDimensionsIfPlaceableItem = (item: AirtableRecord) => {
  if ('width' in item && 'height' in item && 'length' in item && 'description' in item) {
    return `${item.length} in * ${item.width} in`;
  }

  return '';
};

export interface CartItem {
  name: string;
  amazonProducts: string[];
  linkedASINs: string[];
  recordId: string;
  selectedASIN: string;
  itemType: string;
  width?: number;
  length?: number;
  description?: string;
}

const createCartItems = (cartItems: AirtableRecord[] | undefined) => {
  if (cartItems === undefined) return [];

  let cartItemsArray: CartItem[] = [];
  cartItems.forEach((item) => {
    const cartItem: CartItem = {
      name: item.name,
      amazonProducts: item.amazonProducts,
      linkedASINs: item.linkedASINs,
      recordId: item.recordId,
      selectedASIN: item.linkedASINs[0],
      itemType: item.itemType ? item.itemType : '',
    };
    if (isPlaceableItemRecord(item)) {
      cartItem.width = item.width;
      cartItem.length = item.length;
      cartItem.description = item.description;
    }
    cartItemsArray.push(cartItem);
  });

  return cartItemsArray;
};

const cartItemsComparator = (a: CartItem, b: CartItem) => {
  if (a.itemType === POT_ITEM_TYPE && b.itemType === POT_ITEM_TYPE) {
    return potRecordComparator(a, b);
  }
  return a.itemType.localeCompare(b.itemType);
};

const ShoppingCartTable = () => {
  const query = useQueryParams();
  const [indexOfProductModal, setIndexOfProductModal] = useState<null | number>(null);

  const recordIdString = query.get(paramKeys.recordIds);
  if (recordIdString == null) throw Error('Attempted to load a shopping cart with no items.');

  const recordIds = JSON.parse(recordIdString);

  const { isLoading, error, data: cartRecords } = useQueryCartItems({ recordIds });

  const [cartItems, setCartItems] = useState<CartItem[]>(createCartItems(cartRecords));

  useEffect(() => {
    setCartItems(createCartItems(cartRecords));
  }, [cartRecords]);

  if (isLoading || error || cartRecords === undefined) {
    if (isLoading) return <div>Loading cart...</div>;
    if (error) return <div>Error!</div>;
    if (cartRecords === undefined) return <div>Loading cart...</div>;
  }

  const shoppingCartUrl = createAmazonAddToShoppingCartUrl(cartItems);

  const changeSelectedASIN = (ASIN: string, index: number) => {
    let newCartItems = [...cartItems];
    newCartItems[index].selectedASIN = ASIN;
    setCartItems(newCartItems);
  };

  const sortedCartItems = cartItems.sort(cartItemsComparator);

  return (
    <>
      <Container>
        <TableContainer>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell />
                <TableCell component="th" scope="column">
                  Generic Item Name
                </TableCell>
                <TableCell>Selected Amazon Product</TableCell>
                <TableCell>Dimensions (length x width)</TableCell>
                <TableCell>Amazon Link</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {sortedCartItems.map((item, index) => (
                <ItemRow
                  item={item}
                  key={item.recordId}
                  index={index}
                  changeSelectedASIN={changeSelectedASIN}
                  setIndexOfProductModal={setIndexOfProductModal}
                />
              ))}
            </TableBody>
          </Table>
        </TableContainer>
        <a href={shoppingCartUrl} target="_blank" rel="noopener noreferrer">
          <button tabIndex={0} aria-label="Open Shopping Cart" className="shopping-cart-button">
            Open Shopping Cart
          </button>
        </a>
      </Container>
      {indexOfProductModal !== null ? (
        <ProductModal
          open={indexOfProductModal !== null}
          closeModal={() => {
            setIndexOfProductModal(null);
          }}
          item={cartItems[indexOfProductModal]}
          index={indexOfProductModal}
          changeSelectedASIN={changeSelectedASIN}
        />
      ) : null}
    </>
  );
};

const ItemRow = ({
  item,
  changeSelectedASIN,
  index,
  setIndexOfProductModal,
}: {
  item: CartItem;
  changeSelectedASIN: (ASIN: string, index: number) => void;
  index: number;
  setIndexOfProductModal: React.Dispatch<React.SetStateAction<number | null>>;
}) => {
  const ASINs = item.linkedASINs;

  const { isLoading, error, data: amazonProducts } = useQueryAmazonProductsByASIN(ASINs, item.name);

  if (isLoading || error || amazonProducts === undefined) {
    if (isLoading)
      return (
        <TableRow>
          <TableCell>Loading products...</TableCell>
        </TableRow>
      );
    if (error) return <div>Error!</div>;
    if (amazonProducts === undefined)
      return (
        <TableRow>
          <TableCell>Loading products...</TableCell>
        </TableRow>
      );
  }

  return (
    <TableRow key={item.recordId} style={{}}>
      <TableCell>
        <button
          style={{ width: 50, height: 50, padding: 0, fontSize: 10 }}
          onClick={() => setIndexOfProductModal(index)}
        >
          Select Product
        </button>
      </TableCell>
      <TableCell component="th" scope="row">
        {item.name}
      </TableCell>
      <TableCell>
        <select
          value={item.selectedASIN}
          onChange={(event) => changeSelectedASIN(event.target.value, index)}
        >
          {Object.values(amazonProducts).map((amazonProduct, index) => {
            return (
              <option key={`${amazonProduct.ASIN}-${index}`} value={amazonProduct.ASIN}>
                {amazonProduct.productName}
              </option>
            );
          })}
        </select>
      </TableCell>
      <TableCell>{renderDimensionsIfPlaceableItem(item)}</TableCell>
      <TableCell>
        <a
          href={constructAmazonLinkWithASIN(item.selectedASIN)}
          target="_blank"
          rel="noopener noreferrer"
        >
          View on Amazon
        </a>
      </TableCell>
    </TableRow>
  );
};

export default ShoppingCartTable;
