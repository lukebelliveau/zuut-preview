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
  Rating,
  Typography,
} from '@mui/material';
import { visuallyHidden } from '@mui/utils';
import { useState } from 'react';
import { AmazonProductMap, AmazonProductRecord } from 'src/airtable/amazonProducts';
import { getComparator } from 'src/hooks/useTable';
import mixpanelTrack from 'src/utils/mixpanelTrack';
import { CartItem, constructAmazonLinkWithASIN } from './ShoppingCartTable';

type Order = 'asc' | 'desc';

interface HeadCell {
  disablePadding: boolean;
  id: keyof AmazonProductRecord;
  label: string;
  numeric: boolean;
}

interface SortableProductTableProps {
  onRequestSort: (event: React.MouseEvent<unknown>, property: keyof AmazonProductRecord) => void;
  order: Order;
  orderBy: string;
  headCells: HeadCell[];
}

function SortableProductTableHead({
  order,
  orderBy,
  onRequestSort,
  headCells,
}: SortableProductTableProps) {
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
        <TableCell />
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

const SortableProductTable = ({
  item,
  amazonProducts,
  changeSelectedProductASIN,
  headCells,
}: {
  item: CartItem;
  amazonProducts: AmazonProductMap;
  changeSelectedProductASIN: (ASIN: string) => void;
  headCells: HeadCell[];
}) => {
  const [order, setOrder] = useState<Order>('asc');
  const [orderBy, setOrderBy] = useState<keyof AmazonProductRecord>(headCells[0].id);
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
            <SortableProductTableHead
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
                      {headCells.map((headCell) => {
                        if (headCell.id === 'price') {
                          return (
                            <TableCell
                              key={headCell.label}
                              // align={headCell.numeric ? 'right' : 'left'}
                              align="right"
                            >
                              ${parseFloat(product.price).toFixed(2)}
                            </TableCell>
                          );
                        } else if (headCell.id === 'productName') {
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
                        } else if (headCell.id === 'rating') {
                          return (
                            <TableCell key={headCell.id}>
                              <div
                                style={{
                                  display: 'flex',
                                  justifyContent: 'center',
                                  alignItems: 'center',
                                }}
                              >
                                <Rating
                                  name="read-only"
                                  value={parseFloat(product.rating)}
                                  readOnly
                                  size="small"
                                  precision={0.1}
                                />
                                <Typography sx={{ paddingLeft: '2px', fontSize: '10px' }}>
                                  ({product.rating})
                                </Typography>
                              </div>
                            </TableCell>
                          );
                        }
                        return (
                          <TableCell key={headCell.id} align={headCell.numeric ? 'right' : 'left'}>
                            {product[headCell.id]}
                          </TableCell>
                        );
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
        control={<Switch checked={dense} onChange={e => setDense(e.target.checked)} />}
        label="Dense padding"
      /> */}
    </Box>
  );
};

export default SortableProductTable;
