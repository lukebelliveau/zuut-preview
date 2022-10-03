import {
  Button,
  Container,
  Link,
  styled,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from '@mui/material';
import { useEffect, useState } from 'react';
import { useQueryCartItems } from '../../airtable/airtableApi';
import { AmazonProductMap, useQueryAmazonProductsByASIN } from '../../airtable/amazonProducts';
import { potRecordComparator } from '../../airtable/pots';
import { AirtableRecord, isPlaceableItemRecord } from '../../airtable/Record';
import { POT_ITEM_TYPE } from '../../lib/item/potItem';
import useQueryParams, { paramKeys } from '../../lib/url';

import ProductModal from './ProductModal';
import OpenInNewIcon from '@mui/icons-material/OpenInNew';
import queryKeys from 'src/lib/queryKeys';
import { useQueryClient } from '@tanstack/react-query';
import { grey } from '@mui/material/colors';

interface ShoppingCartUrlItem {
  quantity: number;
  ASIN: string | undefined;
}
const amazonZUUTTag = 'zuut04-20';

const createAmazonAddToShoppingCartUrl = (items: CartItem[]) => {
  let shoppingCartItems: { [itemName: string]: ShoppingCartUrlItem } = {};

  items.forEach((item) => {
    if (shoppingCartItems[item.selectedASIN]) {
      shoppingCartItems[item.selectedASIN].quantity += 1;
    } else {
      shoppingCartItems[item.selectedASIN] = {
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
  if ('width' in item && 'length' in item && 'description' in item) {
    return `${item.length} in * ${item.width} in`;
  }

  return 'N/A';
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

const TotalPriceRow = ({ cartItems }: { cartItems: CartItem[] }) => {
  const selectedASINs = cartItems.map((item) => item.selectedASIN);

  const asinCount: { [key: string]: number } = {};
  selectedASINs.forEach((ASIN) => {
    if (asinCount[ASIN]) {
      asinCount[ASIN] += 1;
    } else {
      asinCount[ASIN] = 1;
    }
  });

  const {
    isLoading,
    error,
    data: amazonProducts,
  } = useQueryAmazonProductsByASIN(selectedASINs, queryKeys.totalCartPrice);

  let PriceElement = (
    <TableRow>
      <TableCell />
      <TableCell />
      <TableCell />
      {/* <TableCell /> */}
      <TableCell />
      <TableHead>
        <TableRow sx={{ backgroundColor: grey[100] }}>
          <TableCell>Loading price...</TableCell>
        </TableRow>
      </TableHead>
    </TableRow>
  );

  if (
    isLoading ||
    error ||
    amazonProducts === undefined ||
    Object.keys(amazonProducts).length === 0
  ) {
    if (amazonProducts !== undefined && Object.keys(amazonProducts).length === 0) {
      return PriceElement;
    }
    if (isLoading) return PriceElement;
    if (error) return <div>Error!</div>;
    if (amazonProducts === undefined) return PriceElement;
  }

  let totalPrice = 0;

  // multiple each amazonProduct.price by its asinCount
  Object.keys(amazonProducts).forEach((amazonProductASIN) => {
    const itemPrice = parseFloat(amazonProducts[amazonProductASIN].price);
    const itemCount = asinCount[amazonProductASIN];

    totalPrice += itemPrice * itemCount;
  });

  return (
    <TableRow>
      <TableCell />
      <TableCell />
      <TableCell />
      {/* <TableCell /> */}
      <TableCell />
      <TableHead>
        <TableRow sx={{ backgroundColor: grey[100] }}>
          <TableCell sx={{ fontWeight: 'bold' }}>Total Price</TableCell>
          <TableCell sx={{ fontWeight: 'bold' }}>${totalPrice}</TableCell>
        </TableRow>
      </TableHead>
    </TableRow>
  );
};

const StyledTableHeadCell = styled(TableCell)(({ theme }) => ({
  '&:first-of-type': {
    boxShadow: 'none',
    borderRadius: '0px',
  },
  '&:last-of-type': {
    boxShadow: 'none',
    borderRadius: '0px',
  },
}));

const ShoppingCartTable = () => {
  const query = useQueryParams();
  const queryClient = useQueryClient();
  const [indexOfProductModal, setIndexOfProductModal] = useState<null | number>(null);

  const recordIdString = query.get(paramKeys.recordIds);
  if (recordIdString == null) throw Error('Attempted to load a shopping cart with no items.');

  const recordIds = JSON.parse(recordIdString);

  const { isLoading, error, data: cartRecords } = useQueryCartItems({ recordIds });

  const [cartItems, setCartItems] = useState<CartItem[]>(createCartItems(cartRecords));
  const [shoppingCartUrl, setShoppingCartUrl] = useState<string>(
    createAmazonAddToShoppingCartUrl(cartItems)
  );

  useEffect(() => {
    setCartItems(createCartItems(cartRecords));
  }, [cartRecords]);

  useEffect(() => {
    setShoppingCartUrl(createAmazonAddToShoppingCartUrl(cartItems));
  }, [cartItems]);

  if (isLoading || error || cartRecords === undefined) {
    if (isLoading) return <div>Loading cart...</div>;
    if (error) return <div>Error!</div>;
    if (cartRecords === undefined) return <div>Loading cart...</div>;
  }

  // const shoppingCartUrl = createAmazonAddToShoppingCartUrl(cartItems);

  const changeSelectedASIN = (ASIN: string, index: number) => {
    // invalidate price query so price is re-computed
    queryClient.invalidateQueries([queryKeys.totalCartPrice]);

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
                <StyledTableHeadCell />
                <StyledTableHeadCell component="th" scope="column">
                  Generic Item Name
                </StyledTableHeadCell>
                <StyledTableHeadCell>Selected Amazon Product</StyledTableHeadCell>
                {/* <TableCell>Dimensions (length x width)</TableCell> */}
                <StyledTableHeadCell>Amazon Link</StyledTableHeadCell>
                <StyledTableHeadCell align="right" sx={{ boxShadow: 0 }}>
                  Price
                </StyledTableHeadCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {sortedCartItems.map((item, index) => (
                <ItemRow
                  item={item}
                  key={`${item.recordId}=${index}`}
                  index={index}
                  changeSelectedASIN={changeSelectedASIN}
                  setIndexOfProductModal={setIndexOfProductModal}
                />
              ))}
              {/* <TotalPriceRow cartItems={cartItems} /> */}
            </TableBody>
          </Table>
        </TableContainer>
        <div
          style={{ width: '100%', display: 'flex', justifyContent: 'flex-end', padding: '12px' }}
        >
          <Button
            variant="contained"
            component={Link}
            href={shoppingCartUrl}
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Open Shopping Cart"
          >
            Open Amazon Shopping Cart
          </Button>
        </div>
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

const getSelectedAmazonProductPrice = (selectedASIN: string, amazonProducts: AmazonProductMap) => {
  const selectedAmazonProduct = amazonProducts[selectedASIN];

  if (!selectedAmazonProduct) return 'Price not available';

  if (selectedAmazonProduct.price) return `$${selectedAmazonProduct.price}`;

  return 'Price not available';
};

const StyledTableRow = styled(TableRow)(({ theme }) => ({
  '&:nth-of-type(even)': {
    backgroundColor: theme.palette.action.hover,
  },
  // hide last border
  '&:last-child td, &:last-child th': {
    border: 0,
  },
}));

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
    <StyledTableRow key={`${item.recordId}=${index}`}>
      <TableCell>
        <Button
          // style={{ width: 50, height: 50, padding: 0, fontSize: 10 }}
          onClick={() => setIndexOfProductModal(index)}
        >
          Select Product
        </Button>
      </TableCell>
      <TableCell component="th" scope="row">
        {item.name}
      </TableCell>
      <TableCell>{amazonProducts[item.selectedASIN].productName}</TableCell>
      {/* <TableCell>
        <Select
          sx={{ maxWidth: '200px' }}
          value={item.selectedASIN}
          onChange={(event) => changeSelectedASIN(event.target.value, index)}
        >
          {Object.values(amazonProducts).map((amazonProduct, index) => {
            return (
              <MenuItem key={`${amazonProduct.ASIN}-${index}`} value={amazonProduct.ASIN}>
                {amazonProduct.productName}
              </MenuItem>
            );
          })}
        </Select>
      </TableCell> */}
      {/* <TableCell>{renderDimensionsIfPlaceableItem(item)}</TableCell> */}
      <TableCell>
        <div style={{ display: 'flex', alignItems: 'center' }}>
          <OpenInNewIcon />
          <Link
            href={constructAmazonLinkWithASIN(item.selectedASIN)}
            target="_blank"
            rel="noopener noreferrer"
          >
            View on Amazon
          </Link>
        </div>
      </TableCell>
      <TableCell align="right">
        {getSelectedAmazonProductPrice(item.selectedASIN, amazonProducts)}
      </TableCell>
    </StyledTableRow>
  );
};

export default ShoppingCartTable;
