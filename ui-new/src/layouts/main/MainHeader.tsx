// @mui
import { styled, SxProps } from '@mui/material/styles';
import { AppBar, Toolbar } from '@mui/material';
// hooks
import useOffSetTop from '../../hooks/useOffSetTop';

// components
import Logo from '../../components/Logo';
import baseHeaderStyle from '../baseHeaderStyle';

const RootStyle = styled(AppBar)(({ theme }) => ({
  ...baseHeaderStyle(theme),
  backgroundColor: 'transparent',
}));

// ----------------------------------------------------------------------

export default function MainHeader({ rootStyles }: { rootStyles?: SxProps }) {
  return (
    <RootStyle sx={rootStyles}>
      <Toolbar>
        <Logo />
      </Toolbar>
    </RootStyle>
  );
}
