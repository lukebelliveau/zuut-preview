import { TableCell, TableHead, TableRow } from '@mui/material';
import { grey } from '@mui/material/colors';
import { useQueryAmazonProductsByCartItem } from 'src/airtable/amazonProducts';
import { CartItem } from './ShoppingCartTable';
import StyledTableRow from './StyledCartTableRow';

const TotalPriceRow = ({ cartItems }: { cartItems: CartItem[] }) => {
  const { isLoading, error, data: allAmazonProducts } = useQueryAmazonProductsByCartItem(cartItems);
  const selectedASINs = cartItems.map((item) => item.selectedASIN);

  const asinCount: { [key: string]: number } = {};
  selectedASINs.forEach((ASIN) => {
    if (asinCount[ASIN]) {
      asinCount[ASIN] += 1;
    } else {
      asinCount[ASIN] = 1;
    }
  });
  let PriceElement = (
    <StyledTableRow>
      <TableCell />
      <TableCell />
      <TableCell />
      <TableCell />
      <TableCell />
      <TableCell />
      <TableHead>
        <TableRow sx={{ backgroundColor: grey[100] }}>
          <TableCell>Loading price...</TableCell>
        </TableRow>
      </TableHead>
    </StyledTableRow>
  );

  if (
    isLoading ||
    error ||
    allAmazonProducts === undefined ||
    Object.keys(allAmazonProducts).length === 0
  ) {
    if (allAmazonProducts !== undefined && Object.keys(allAmazonProducts).length === 0) {
      return PriceElement;
    }
    if (isLoading) return PriceElement;
    if (error) return <div>Error!</div>;
    if (allAmazonProducts === undefined) return PriceElement;
  }

  let totalPrice = 0;

  cartItems.forEach((item) => {
    const { selectedASIN } = item;
    const productPrice = parseFloat(allAmazonProducts[selectedASIN].price);
    const productCount = asinCount[selectedASIN];

    totalPrice += productPrice * productCount * item.quantity;
  });

  return (
    <StyledTableRow>
      <TableCell />
      <TableCell />
      <TableCell />
      <TableCell />
      <TableCell />
      <TableCell />
      <TableCell
        sx={{
          fontWeight: 'bold',
        }}
        align="right"
      >
        Total Cost
      </TableCell>
      <TableCell sx={{ fontWeight: 'bold' }} align="right">
        ${totalPrice.toFixed(2)}
      </TableCell>
    </StyledTableRow>
  );
};

export default TotalPriceRow;
