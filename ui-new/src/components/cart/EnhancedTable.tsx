import {
  Paper,
  Table,
  TableContainer,
  TableBody,
  TableRow,
  TableCell,
  TablePagination,
  Box,
  TableHead,
  TableSortLabel,
  Button,
  Link,
} from '@mui/material';
import { visuallyHidden } from '@mui/utils';
import { useState } from 'react';
import { AmazonProductMap, AmazonProductRecord } from 'src/airtable/amazonProducts';
import { getComparator } from 'src/hooks/useTable';
import mixpanelTrack from 'src/utils/mixpanelTrack';
import { ProductColumn } from './productTables/ProductTable';
import { CartItem, constructAmazonLinkWithASIN } from './ShoppingCartTable';

type Order = 'asc' | 'desc';

interface HeadCell {
  disablePadding: boolean;
  id: keyof AmazonProductRecord;
  label: string;
  numeric: boolean;
}

interface EnhancedTableProps {
  onRequestSort: (event: React.MouseEvent<unknown>, property: keyof AmazonProductRecord) => void;
  order: Order;
  orderBy: string;
  headCells: HeadCell[];
}

function EnhancedTableHead({ order, orderBy, onRequestSort, headCells }: EnhancedTableProps) {
  const createSortHandler =
    (property: keyof AmazonProductRecord) => (event: React.MouseEvent<unknown>) => {
      onRequestSort(event, property);
    };

  return (
    <TableHead>
      <TableRow>
        {headCells.map((headCell) => (
          <TableCell
            key={headCell.id}
            align={headCell.numeric ? 'right' : 'left'}
            padding={headCell.disablePadding ? 'none' : 'normal'}
            sortDirection={orderBy === headCell.id ? order : false}
          >
            <TableSortLabel
              active={orderBy === headCell.id}
              direction={orderBy === headCell.id ? order : 'asc'}
              onClick={createSortHandler(headCell.id)}
            >
              {headCell.label}
              {orderBy === headCell.id ? (
                <Box component="span" sx={visuallyHidden}>
                  {order === 'desc' ? 'sorted descending' : 'sorted ascending'}
                </Box>
              ) : null}
            </TableSortLabel>
          </TableCell>
        ))}
      </TableRow>
    </TableHead>
  );
}

// This method is created for cross-browser compatibility, if you don't
// need to support IE11, you can use Array.prototype.sort() directly
function stableSort<T>(array: readonly T[], comparator: (a: T, b: T) => number) {
  const stabilizedThis = array.map((el, index) => [el, index] as [T, number]);
  stabilizedThis.sort((a, b) => {
    const order = comparator(a[0], b[0]);
    if (order !== 0) {
      return order;
    }
    return a[1] - b[1];
  });
  return stabilizedThis.map((el) => el[0]);
}

const EnhancedTable = ({
  item,
  amazonProducts,
  changeSelectedProductASIN,
  columns,
  headCells,
}: {
  item: CartItem;
  amazonProducts: AmazonProductMap;
  changeSelectedProductASIN: (ASIN: string) => void;
  columns: ProductColumn[];
  headCells: HeadCell[];
}) => {
  const [order, setOrder] = useState<Order>('asc');
  const [orderBy, setOrderBy] = useState<keyof AmazonProductRecord>(columns[0].property);
  const [selected, setSelected] = useState<readonly string[]>([]);
  const [page, setPage] = useState(0);
  const [dense, setDense] = useState(true);
  const [rowsPerPage, setRowsPerPage] = useState(20);

  const handleRequestSort = (
    event: React.MouseEvent<unknown>,
    property: keyof AmazonProductRecord
  ) => {
    const isAsc = orderBy === property && order === 'asc';
    setOrder(isAsc ? 'desc' : 'asc');
    setOrderBy(property);
  };

  const handleChangePage = (event: unknown, newPage: number) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event: React.ChangeEvent<HTMLInputElement>) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const handleChangeDense = (event: React.ChangeEvent<HTMLInputElement>) => {
    setDense(event.target.checked);
  };

  const isSelected = (name: string) => selected.indexOf(name) !== -1;

  // Avoid a layout jump when reaching the last page with empty rows.
  const emptyRows =
    page > 0 ? Math.max(0, (1 + page) * rowsPerPage - Object.keys(amazonProducts).length) : 0;

  return (
    <Box sx={{ width: '100%' }}>
      <Paper sx={{ width: '100%', mb: 2 }}>
        <TableContainer>
          <Table
            sx={{ minWidth: 750 }}
            aria-labelledby="tableTitle"
            size={dense ? 'small' : 'medium'}
          >
            <EnhancedTableHead
              order={order}
              orderBy={orderBy}
              onRequestSort={handleRequestSort}
              headCells={headCells}
            />
            <TableBody>
              {/* if you don't need to support IE11, you can replace the `stableSort` call with:
              rows.sort(getComparator(order, orderBy)).slice() */}
              {stableSort(Object.values(amazonProducts), getComparator(order, orderBy))
                .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                .map((product, index) => {
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
              {emptyRows > 0 && (
                <TableRow
                  style={{
                    height: (dense ? 33 : 53) * emptyRows,
                  }}
                >
                  <TableCell colSpan={6} />
                </TableRow>
              )}
            </TableBody>
          </Table>
        </TableContainer>
        <TablePagination
          rowsPerPageOptions={[5, 10, 25]}
          component="div"
          count={Object.values(amazonProducts).length}
          rowsPerPage={rowsPerPage}
          page={page}
          onPageChange={handleChangePage}
          onRowsPerPageChange={handleChangeRowsPerPage}
        />
      </Paper>
      {/* <FormControlLabel
        control={<Switch checked={dense} onChange={handleChangeDense} />}
        label="Dense padding"
      /> */}
    </Box>
  );
};

export default EnhancedTable;
