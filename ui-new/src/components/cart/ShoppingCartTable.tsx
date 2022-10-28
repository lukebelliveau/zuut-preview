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
  Tooltip,
  Typography,
} from '@mui/material';
import { useEffect, useState } from 'react';
import { useQueryCartItems } from '../../airtable/airtableApi';
import { AmazonProductMap, useQueryAmazonProductsByASIN } from '../../airtable/amazonProducts';
import { potRecordComparator } from '../../airtable/pots';
import { AirtableItemRecord, isPlaceableItemRecord } from '../../airtable/Record';
import { POT_ITEM_TYPE } from '../../lib/item/potItem';
import useQueryParams, { paramKeys } from '../../lib/url';

import ProductModal from './ProductModal';
import OpenInNewIcon from '@mui/icons-material/OpenInNew';
import queryKeys from 'src/lib/queryKeys';
import { useQueryClient } from '@tanstack/react-query';
import { store } from 'src/redux/store';
import TopLevelErrorBoundary from '../TopLevelErrorBoundary';
import LoadingScreen from '../LoadingScreen';
import mixpanelTrack from 'src/utils/mixpanelTrack';
import TotalPriceRow from './totalPriceRow';
import StyledTableRow from './StyledCartTableRow';

interface ShoppingCartUrlItem {
  quantity: number;
  ASIN: string | undefined;
}
const amazonZUUTTag = 'zuut04-20';

const createAmazonAddToShoppingCartUrl = (items: CartItem[]) => {
  let shoppingCartItems: { [itemName: string]: ShoppingCartUrlItem } = {};

  items.forEach((item) => {
    if (shoppingCartItems[item.selectedASIN]) {
      shoppingCartItems[item.selectedASIN].quantity += item.quantity;
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

export const constructAmazonLinkWithASIN = (asin: string) => {
  return `https://www.amazon.com/dp/${asin}?tag=${amazonZUUTTag}`;
};

const renderDimensionsIfPlaceableItem = (item: AirtableItemRecord) => {
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
  quantity: number;
}

const createCartItems = (cartItems: AirtableItemRecord[] | undefined): CartItem[] => {
  if (cartItems === undefined) return [];

  let cartItemMap: { [itemName: string]: CartItem } = {};

  cartItems.forEach((item) => {
    if (cartItemMap[item.name]) {
      cartItemMap[item.name].quantity += 1;
    } else {
      cartItemMap[item.name] = {
        name: item.name,
        amazonProducts: item.amazonProducts,
        linkedASINs: item.linkedASINs,
        recordId: item.recordId,
        selectedASIN: item.linkedASINs[0],
        itemType: item.itemType ? item.itemType : '',
        quantity: 1,
      };
      if (isPlaceableItemRecord(item)) {
        cartItemMap[item.name].width = item.width;
        cartItemMap[item.name].length = item.length;
        cartItemMap[item.name].description = item.description;
      }
    }
  });

  return Object.values(cartItemMap);
};

const cartItemsComparator = (a: CartItem, b: CartItem) => {
  if (a.itemType === POT_ITEM_TYPE && b.itemType === POT_ITEM_TYPE) {
    return potRecordComparator(a, b);
  }
  return a.itemType.localeCompare(b.itemType);
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
    if (isLoading) return <LoadingScreen />;
    // if (isLoading) return <div>Loading cart...</div>;
    if (error) return <div>Error!</div>;
    if (cartRecords === undefined)
      return (
        <Typography>
          Sorry, there are no products for these items. Please leave us some feedback with the
          button on the right, and we'll be sure to get this fixed up. Thank you!
        </Typography>
      );
  }

  // const shoppingCartUrl = createAmazonAddToShoppingCartUrl(cartItems);

  const changeSelectedASIN = (ASIN: string, index: number) => {
    // invalidate price query so price is re-computed
    queryClient.invalidateQueries([queryKeys.totalCartPrice]);

    let newCartItems: CartItem[] = [...cartItems];
    newCartItems[index].selectedASIN = ASIN;
    setCartItems(newCartItems);
  };

  const sortedCartItems = cartItems.sort(cartItemsComparator);

  return (
    <TopLevelErrorBoundary toTrack={{ state: store.getState() }} errorName={'Cart Error'}>
      <>
        <Container>
          <TableContainer>
            <Table>
              <TableHead>
                <TableRow>
                  <StyledTableHeadCell />
                  <StyledTableHeadCell component="th" scope="column">
                    Item Type
                  </StyledTableHeadCell>
                  <StyledTableHeadCell>Selected Amazon Product</StyledTableHeadCell>
                  <StyledTableHeadCell align="right">Quantity of Items needed</StyledTableHeadCell>
                  <StyledTableHeadCell align="right">Product Price</StyledTableHeadCell>
                  <StyledTableHeadCell align="right">Units per Product</StyledTableHeadCell>
                  <StyledTableHeadCell align="right">Product Quantity</StyledTableHeadCell>
                  <StyledTableHeadCell align="right">Price * Product Quantity</StyledTableHeadCell>
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
                <TotalPriceRow cartItems={cartItems} />
              </TableBody>
            </Table>
          </TableContainer>
          <div
            style={{
              width: '100%',
              display: 'flex',
              justifyContent: 'flex-end',
              padding: '12px',
              paddingRight: 0,
            }}
          >
            <div style={{ display: 'flex', flexDirection: 'column', maxWidth: '25%' }}>
              <Button
                variant="contained"
                component={Link}
                href={shoppingCartUrl}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Open Shopping Cart"
                onClick={() => {
                  mixpanelTrack('Amazon Shopping Cart opened', {
                    shoppingCartUrl,
                    cartItems: cartItems.map((item) => ({
                      name: item.name,
                      ASIN: item.selectedASIN,
                    })),
                  });
                }}
              >
                Open Amazon Shopping Cart
              </Button>
              <Typography sx={{ textAlign: 'right', fontSize: 12, marginTop: 4 }}>
                ZUUT may receive compensation for purchases made at participating retailers linked
                on this site. This compensation does not affect what products or prices are
                displayed, or the order of prices listed.
              </Typography>
            </div>
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
    </TopLevelErrorBoundary>
  );
};

const getSelectedAmazonProductUnitCount = (
  selectedASIN: string,
  amazonProducts: AmazonProductMap
) => {
  const selectedAmazonProduct = amazonProducts[selectedASIN];

  return selectedAmazonProduct.unitCount;
};

export const getProductsToBuy = (
  selectedASIN: string,
  amazonProducts: AmazonProductMap,
  itemQuantity: number
) => {
  const productUnitCount = getSelectedAmazonProductUnitCount(selectedASIN, amazonProducts);

  return Math.ceil(itemQuantity / parseInt(productUnitCount));
};

export const getTotalAmazonProductCost = (
  selectedASIN: string,
  amazonProducts: AmazonProductMap,
  itemQuantity = 1
) => {
  const selectedAmazonProduct = amazonProducts[selectedASIN];
  const productQuantity = getProductsToBuy(selectedASIN, amazonProducts, itemQuantity);

  if (!selectedAmazonProduct || !selectedAmazonProduct.price) return 0;

  return parseFloat(selectedAmazonProduct.price) * productQuantity;
};

export const getSelectedAmazonProductPrice = (
  selectedASIN: string,
  amazonProducts: AmazonProductMap,
  itemQuantity = 1
) => {
  const totalCost = getTotalAmazonProductCost(selectedASIN, amazonProducts, itemQuantity);

  if (totalCost === 0) return 'Price not available.';
  return `$${totalCost.toFixed(2)}`;
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

  const amazonProductPrice = getSelectedAmazonProductPrice(item.selectedASIN, amazonProducts);
  const amazonProductUnitCount = getSelectedAmazonProductUnitCount(
    item.selectedASIN,
    amazonProducts
  );
  const productQuantityToBuy = getProductsToBuy(item.selectedASIN, amazonProducts, item.quantity);
  const totalAmazonProductPrice = getSelectedAmazonProductPrice(
    item.selectedASIN,
    amazonProducts,
    item.quantity
  );

  const quantityTooltipMessage = `You need ${item.quantity} of these items. 
  This product is sold in packs of ${amazonProductUnitCount}, 
  so you will need to purchase ${productQuantityToBuy} of this product to reach your quantity of ${item.quantity}.`;

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
        <div>{item.name}</div>
      </TableCell>
      <TableCell>
        <div style={{ display: 'flex', alignItems: 'center' }}>
          <Link
            href={constructAmazonLinkWithASIN(item.selectedASIN)}
            target="_blank"
            rel="noopener noreferrer"
            onClick={() => {
              const productName =
                amazonProducts &&
                amazonProducts[item.selectedASIN] &&
                amazonProducts[item.selectedASIN].productName
                  ? amazonProducts[item.selectedASIN].productName
                  : 'N/A';
              mixpanelTrack('Amazon Link opened', {
                productName,
                ASIN: item.selectedASIN,
              });
            }}
          >
            <div
              style={{
                maxWidth: '200px',
                overflow: 'hidden',
                textOverflow: 'ellipsis',
                whiteSpace: 'nowrap',
              }}
            >
              {amazonProducts[item.selectedASIN].productName}
            </div>
          </Link>
          <OpenInNewIcon />
        </div>
      </TableCell>
      <TableCell align="right">{item.quantity}</TableCell>
      <TableCell align="right">{amazonProductPrice}</TableCell>
      <TableCell align="right">{amazonProductUnitCount}</TableCell>
      <TableCell align="right">
        <Tooltip title={quantityTooltipMessage} placement="bottom" arrow>
          <span style={{ cursor: 'pointer' }}>{productQuantityToBuy}</span>
        </Tooltip>
      </TableCell>
      <TableCell align="right">{totalAmazonProductPrice}</TableCell>
    </StyledTableRow>
  );
};

export default ShoppingCartTable;
