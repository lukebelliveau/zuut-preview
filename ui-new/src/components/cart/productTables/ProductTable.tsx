import { TableContainer, TableHead, TableRow, TableCell, TableBody, Table } from '@mui/material';
import { AmazonProductMap, AmazonProductRecord } from '../../../airtable/amazonProducts';
import { CartItem } from '../ShoppingCartTable';

export interface ProductColumn {
  name: string;
  property: keyof AmazonProductRecord;
}

const ProductTable = ({
  item,
  amazonProducts,
  changeSelectedProductASIN,
  columns,
}: {
  item: CartItem;
  amazonProducts: AmazonProductMap;
  changeSelectedProductASIN: (ASIN: string) => void;
  columns: ProductColumn[];
}) => {
  return (
    <TableContainer>
      <Table>
        <TableHead>
          <TableRow>
            {columns.map((column) => {
              return <TableCell key={column.name}>{column.name}</TableCell>;
            })}
            <TableCell />
          </TableRow>
        </TableHead>
        <TableBody>
          {Object.values(amazonProducts).map((product) => {
            return (
              <TableRow key={product.ASIN}>
                {columns.map((column) => {
                  return <TableCell key={column.name}>{product[column.property]}</TableCell>;
                })}
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

export default ProductTable;
