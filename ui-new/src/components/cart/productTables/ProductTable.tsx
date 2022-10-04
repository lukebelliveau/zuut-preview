import {
  TableContainer,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  Table,
  Button,
  Link,
} from '@mui/material';
import { AmazonProductMap, AmazonProductRecord } from '../../../airtable/amazonProducts';
import { CartItem, constructAmazonLinkWithASIN } from '../ShoppingCartTable';

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
                  if (column.property === 'price') {
                    return (
                      <TableCell key={column.name}>
                        ${parseFloat(product.price).toFixed(2)}
                      </TableCell>
                    );
                  } else if (column.property === 'productName') {
                    return (
                      <TableCell>
                        <div style={{ display: 'flex', alignItems: 'center' }}>
                          <Link
                            href={constructAmazonLinkWithASIN(item.selectedASIN)}
                            target="_blank"
                            rel="noopener noreferrer"
                          >
                            {product.productName}
                          </Link>
                        </div>
                      </TableCell>
                    );
                  }
                  return <TableCell key={column.name}>{product[column.property]}</TableCell>;
                })}
                <TableCell>
                  {product.ASIN === item.selectedASIN ? (
                    <Button
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
                    </Button>
                  ) : (
                    <Button
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
                    </Button>
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
