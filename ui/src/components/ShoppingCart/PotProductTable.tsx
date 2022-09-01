import {
  TableContainer,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  Table,
} from '@material-ui/core';
import { AmazonProductMap } from '../../airtable/amazonProducts';
import { CartItem } from './ShoppingCartTable';

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
    <TableContainer>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>Product Name</TableCell>
            <TableCell>Shape</TableCell>
            <TableCell>Material</TableCell>
            <TableCell>Handles</TableCell>
            <TableCell></TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {Object.values(amazonProducts).map((product) => {
            return (
              <TableRow key={product.ASIN}>
                <TableCell>{product.productName}</TableCell>
                <TableCell>{product.shape}</TableCell>
                <TableCell>{product.material}</TableCell>
                <TableCell>{product.handles}</TableCell>
                <TableCell>
                  {product.ASIN === item.selectedASIN ? (
                    <button
                      style={{
                        width: 50,
                        height: 50,
                        padding: 0,
                        fontSize: 10,
                        cursor: 'default',
                      }}
                      disabled
                    >
                      Product Selected
                    </button>
                  ) : (
                    <button
                      style={{
                        width: 50,
                        height: 50,
                        padding: 0,
                        fontSize: 10,
                      }}
                      onClick={() => {
                        changeSelectedProductASIN(product.ASIN);
                      }}
                    >
                      Select Product
                    </button>
                  )}
                </TableCell>
              </TableRow>
            );
          })}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default PotProductTable;
