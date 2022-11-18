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
import { ItemState } from '../../redux/features/items/itemState';
import { useEffect, useRef, useState } from 'react';
import {
  AmazonProductMap,
  useQueryAmazonProductsByASIN,
} from '../../airtable/amazonProducts';
import { potRecordComparator } from '../../airtable/pots';
import { POT_ITEM_TYPE } from '../../lib/item/potItem';
import useQueryParams, { paramKeys } from '../../lib/url';

import { ProductModal } from './ProductModal';
import OpenInNewIcon from '@mui/icons-material/OpenInNew';
import queryKeys from 'src/lib/queryKeys';
import { useQueryClient } from '@tanstack/react-query';
import { store, useDispatch } from 'src/redux/store';
import TopLevelErrorBoundary from '../error/TopLevelErrorBoundary';
import LoadingScreen from '../loading-screen';
import mixpanelTrack from 'src/utils/mixpanelTrack';
import TotalPriceRow from './PriceRow';
import StyledTableRow from './StyledCartTableRow';
import { useGetGrow } from 'src/firebase/database/getGrow';
import { Item } from 'src/lib/item';
import { CartState } from 'src/redux/features/cart/cartState';
import { isPlaceableItem } from 'src/lib/item/placeableItem';
import {
  loadFirebaseCart,
  setProductASIN,
} from 'src/redux/features/cart/cartSlice';
import useBuildPlayground from 'src/hooks/useBuildPlayground';
import { useSelectAllItems } from 'src/redux/features/items/itemsSelectors';
import { useSelectCart } from 'src/redux/features/cart/cartSelectors';
import { Router, useRouter } from 'next/router';
import { PATH_APP } from 'src/routes/paths';

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

const createCartItems = (
  items: ItemState[],
  cart: CartState,
  selectedItemNames: string[] | null
): CartItem[] => {
  if (cart.selectedProductASINs === undefined) return [];
  if (selectedItemNames === null)
    throw Error('Navigated to cart with no items selected');

  let cartItemMap: { [itemName: string]: CartItem } = {};

  const selectedNames = [...selectedItemNames];
  items
    .filter((item) => {
      /**
       * array of item names repeat if the quantity is greater than one.
       * so here we remove a name each time we find one, so the quantities are correct
       */
      const foundIndex = selectedNames.findIndex((name) => name === item.name);
      if (foundIndex > -1) {
        selectedNames.splice(foundIndex, 1);
        return true;
      }
      return false;
    })
    .forEach((item) => {
      if (cartItemMap[item.name]) {
        cartItemMap[item.name].quantity += 1;
      } else {
        cartItemMap[item.name] = {
          name: item.name,
          amazonProducts: item.amazonProducts.map(
            (product) => product.recordId
          ),
          linkedASINs: item.linkedASINs,
          recordId: item.recordId ? item.recordId : '',
          selectedASIN:
            cart.selectedProductASINs[item.name] !== undefined
              ? cart.selectedProductASINs[item.name]
              : item.linkedASINs[0],
          itemType: item.type ? item.type : '',
          quantity: 1,
        };
        if (isPlaceableItem(item as Item)) {
          cartItemMap[item.name].width = item.width;
          cartItemMap[item.name].length = item.length;
          cartItemMap[item.name].description = item.description;
        }
      }
    });

  const cartItems = Object.values(cartItemMap);
  return cartItems;
};

const ShoppingCartTableLoader = () => {
  const queryParam = useQueryParams();
  const playground = useBuildPlayground();
  const growId = queryParam[paramKeys.growId];
  const router = useRouter();
  const { isLoading, error, data: grow } = useGetGrow(growId);

  if (error) throw Error('Error loading playground');
  if (playground && playground.plan) {
    if (growId !== null && growId !== undefined) {
      return <ShoppingCartTable />;
    } else {
      router.push(PATH_APP.playground);
      return null;
    }
  } else {
    if (growId) {
      if (growId && !playground.plan && grow) {
        loadFirebaseCart(grow);
        return <LoadingScreen />;
      } else if (growId && !playground.plan && isLoading) {
        return <LoadingScreen />;
      } else {
        throw Error(`Error loading playground with growId ${growId}`);
      }
    } else {
      router.push(PATH_APP.playground);
      return null;
    }
  }
};

const ShoppingCartTable = () => {
  const items = useSelectAllItems();
  const cart = useSelectCart();
  const queryParam = useQueryParams();
  const selectedItemsRaw = queryParam[paramKeys.selectedItems];
  const selectedItemNames = JSON.parse(
    decodeURIComponent(
      selectedItemsRaw !== null && selectedItemsRaw !== undefined
        ? selectedItemsRaw.toString()
        : ''
    )
  );
  const [cartItems, setCartItems] = useState<CartItem[]>(
    createCartItems(items, cart, selectedItemNames)
  );
  const [productModalItem, setProductModalItem] = useState<CartItem | null>(
    null
  );
  const [shoppingCartUrl, setShoppingCartUrl] = useState<string>(
    createAmazonAddToShoppingCartUrl(cartItems)
  );
  const queryClient = useQueryClient();
  const dispatch = useDispatch();
  const cartRef = useRef<CartState>(cart);

  const changeProduct = (itemName: string, selectedASIN: string) => {
    queryClient.invalidateQueries([queryKeys.totalCartPrice]);
    dispatch(setProductASIN({ itemName, selectedASIN }));
  };

  const openProductModal = (item: CartItem) => {
    setProductModalItem(item);
  };

  /**
   * recompute cart items when cart product selections change
   */
  useEffect(() => {
    if (cart === cartRef.current) {
      return;
    }
    cartRef.current = cart;
    setCartItems(createCartItems(items, cart, selectedItemNames));
  }, [items, cart, selectedItemNames]);

  useEffect(() => {
    setShoppingCartUrl(createAmazonAddToShoppingCartUrl(cartItems));
  }, [cartItems]);

  const sortedCartItems = cartItems.sort(cartItemsComparator);

  return (
    <TopLevelErrorBoundary
      toTrack={{ state: store.getState() }}
      errorName={'Cart Error'}
    >
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
                  <StyledTableHeadCell>
                    Selected Amazon Product
                  </StyledTableHeadCell>
                  <StyledTableHeadCell align="right">
                    Quantity of Items needed
                  </StyledTableHeadCell>
                  <StyledTableHeadCell align="right">
                    Product Price
                  </StyledTableHeadCell>
                  <StyledTableHeadCell align="right">
                    Units per Product
                  </StyledTableHeadCell>
                  <StyledTableHeadCell align="right">
                    Product Quantity
                  </StyledTableHeadCell>
                  <StyledTableHeadCell align="right">
                    Price * Product Quantity
                  </StyledTableHeadCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {sortedCartItems.map((item, index) => (
                  <ItemRow
                    item={item}
                    key={`${item.recordId}=${index}`}
                    index={index}
                    openProductModal={openProductModal}
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
            <div
              style={{
                display: 'flex',
                flexDirection: 'column',
                maxWidth: '25%',
              }}
            >
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
              <Typography
                sx={{ textAlign: 'right', fontSize: 12, marginTop: 4 }}
              >
                ZUUT may receive compensation for purchases made at
                participating retailers linked on this site. This compensation
                does not affect what products or prices are displayed, or the
                order of prices listed.
              </Typography>
            </div>
          </div>
        </Container>
        {productModalItem !== null ? (
          <ProductModal
            open={productModalItem !== null}
            closeModal={() => {
              setProductModalItem(null);
            }}
            item={productModalItem}
            changeProduct={changeProduct}
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
  const productUnitCount = getSelectedAmazonProductUnitCount(
    selectedASIN,
    amazonProducts
  );

  return Math.ceil(itemQuantity / parseInt(productUnitCount));
};

export const getTotalAmazonProductCost = (
  selectedASIN: string,
  amazonProducts: AmazonProductMap,
  itemQuantity = 1
) => {
  const selectedAmazonProduct = amazonProducts[selectedASIN];
  const productQuantity = getProductsToBuy(
    selectedASIN,
    amazonProducts,
    itemQuantity
  );

  if (!selectedAmazonProduct || !selectedAmazonProduct.price) return 0;

  return parseFloat(selectedAmazonProduct.price) * productQuantity;
};

export const getSelectedAmazonProductPrice = (
  selectedASIN: string,
  amazonProducts: AmazonProductMap,
  itemQuantity = 1
) => {
  const totalCost = getTotalAmazonProductCost(
    selectedASIN,
    amazonProducts,
    itemQuantity
  );

  if (totalCost === 0) return 'Price not available.';
  return `$${totalCost.toFixed(2)}`;
};

const ItemRow = ({
  item,
  index,
  openProductModal,
}: {
  item: CartItem;
  index: number;
  openProductModal: (itemName: CartItem) => void;
}) => {
  const ASINs = item.linkedASINs;

  const {
    isLoading,
    error,
    data: amazonProducts,
  } = useQueryAmazonProductsByASIN(ASINs, item.name);

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

  const amazonProductPrice = getSelectedAmazonProductPrice(
    item.selectedASIN,
    amazonProducts
  );
  const amazonProductUnitCount = getSelectedAmazonProductUnitCount(
    item.selectedASIN,
    amazonProducts
  );
  const productQuantityToBuy = getProductsToBuy(
    item.selectedASIN,
    amazonProducts,
    item.quantity
  );
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
        <Button onClick={() => openProductModal(item)}>Select Product</Button>
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

export default ShoppingCartTableLoader;
