import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from '@material-ui/core';
import { useQueryCartItems } from '../../airtable/airtableApi';
import { AirtableRecord, PlaceableItemRecord } from '../../airtable/Record';
import useQueryParams, { paramKeys } from '../../lib/url';

interface ShoppingCartItem {
  quantity: number;
  ASIN: string | undefined;
}

const createShoppingCartUrl = (items: AirtableRecord[]) => {
  let shoppingCartItems: { [itemName: string]: ShoppingCartItem } = {};

  items.forEach((item) => {
    if (shoppingCartItems[item.name]) {
      shoppingCartItems[item.name].quantity += 1;
    } else {
      shoppingCartItems[item.name] = {
        quantity: 1,
        ASIN: item.linkedASINs[0],
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

  return `https://www.amazon.com/gp/aws/cart/add.html?${addToCartQuery}`;
};

const constructAmazonLinkWithASIN = (asin: string) => {
  return `https://www.amazon.com/dp/${asin}`;
};

const renderDimensionsIfPlaceableItem = (item: AirtableRecord) => {
  if (
    'width' in item &&
    'height' in item &&
    'width' in item &&
    'description' in item
  ) {
    return `${item.length} in * ${item.width} in`;
  }

  return '';
};

const ShoppingCartTable = () => {
  const query = useQueryParams();

  const recordIdString = query.get(paramKeys.recordIds);
  if (recordIdString == null)
    throw Error('Attempted to load a shopping cart with no items.');

  const recordIds = JSON.parse(recordIdString);

  const {
    isLoading,
    error,
    data: cartItems,
  } = useQueryCartItems({ recordIds });

  if (isLoading || error || cartItems === undefined) {
    if (isLoading) return <div>Loading cart...</div>;
    if (error) return <div>Error!</div>;
    if (cartItems === undefined) return <div>Loading cart...</div>;
  }

  const shoppingCartUrl = createShoppingCartUrl(cartItems);

  return (
    <>
      <TableContainer>
        <Table
          style={{ minWidth: 650, backgroundColor: 'white' }}
          aria-label="simple table"
        >
          <TableHead>
            <TableRow>
              <TableCell>Generic Item Name</TableCell>
              <TableCell>Dimensions (length x width)</TableCell>
              <TableCell>Amazon Link</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {cartItems.map((item) => (
              <TableRow key={item.recordId} style={{}}>
                <TableCell component="th" scope="row">
                  {item.name}
                </TableCell>
                <TableCell>{renderDimensionsIfPlaceableItem(item)}</TableCell>
                <TableCell>
                  <a
                    href={constructAmazonLinkWithASIN(item.linkedASINs[0])}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    View on Amazon
                  </a>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      <a href={shoppingCartUrl} target="_blank" rel="noopener noreferrer">
        <button
          tabIndex={0}
          aria-label="Open Shopping Cart"
          className="shopping-cart-button"
        >
          Open Shopping Cart
        </button>
      </a>
    </>
  );
};

export default ShoppingCartTable;