import { HeadCell } from '../SortableProductTable';

const commonColumns: HeadCell[] = [
  { label: 'Quantity Needed', id: 'itemQuantity', disablePadding: false, numeric: true },
  { label: 'Quantity Per Product', id: 'unitCount', disablePadding: false, numeric: true },
  {
    label: 'Products Needed',
    id: 'totalToPurchase',
    disablePadding: false,
    numeric: true,
  },
  { label: 'Price Per Unit', id: 'pricePerUnit', disablePadding: false, numeric: true },
  { label: 'Product Price', id: 'price', disablePadding: false, numeric: true },
  { label: 'Total Price', id: 'totalCost', disablePadding: false, numeric: true },
];

export default commonColumns;
