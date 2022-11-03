// @mui
import { styled } from '@mui/material/styles';
// components
import Page from '../../components/Page';
import ShoppingCartTable from 'src/components/cart/ShoppingCartTable';
import MainHeader from 'src/layouts/main/MainHeader';
import { grey } from '@mui/material/colors';
// sections

// ----------------------------------------------------------------------

const RootStyle = styled('div')(({ theme }) => ({
  paddingTop: theme.spacing(8),
  [theme.breakpoints.up('md')]: {
    paddingTop: theme.spacing(11),
  },
}));

// ----------------------------------------------------------------------

export default function Cart() {
  return (
    <Page title="ZUUT Cart">
      <RootStyle>
        <MainHeader rootStyles={{ backgroundColor: grey[100] }} />
        <ShoppingCartTable />
      </RootStyle>
    </Page>
  );
}
