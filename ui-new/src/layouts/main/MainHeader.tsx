// @mui
import { styled } from '@mui/material/styles';
import { AppBar, Toolbar } from '@mui/material';
// hooks
import useOffSetTop from '../../hooks/useOffSetTop';

// config
import { HEADER } from '../../config';
// components
import Logo from '../../components/Logo';
import baseHeaderStyle from '../baseHeaderStyle';

const ToolbarShadowStyle = styled('div')(({ theme }) => ({
  left: 0,
  right: 0,
  bottom: 0,
  height: 24,
  zIndex: -1,
  margin: 'auto',
  borderRadius: '50%',
  position: 'absolute',
  width: `calc(100% - 48px)`,
  boxShadow: theme.customShadows.z8,
}));

const RootStyle = styled(AppBar)(({ theme }) => ({
  ...baseHeaderStyle(theme),
  backgroundColor: 'transparent',
}));

// ----------------------------------------------------------------------

export default function MainHeader() {
  const isOffset = useOffSetTop(HEADER.MAIN_DESKTOP_HEIGHT);

  return (
    <RootStyle>
      <Toolbar>
        <Logo />
      </Toolbar>

      {isOffset && <ToolbarShadowStyle />}
    </RootStyle>
  );
}
