import { memo } from 'react';
// @mui
import { styled } from '@mui/material/styles';
import { Container, AppBar } from '@mui/material';
// config
import { HEADER } from '../../../config';
// components
import { NavSectionHorizontal } from '../../../components/nav-section';
import { useQueryItemsNavConfig } from './NavConfig';
//

// ----------------------------------------------------------------------

const RootStyle = styled(AppBar)(({ theme }) => ({
  transition: theme.transitions.create('top', {
    easing: theme.transitions.easing.easeInOut,
    duration: theme.transitions.duration.shorter,
  }),
  width: '100%',
  position: 'fixed',
  zIndex: theme.zIndex.appBar,
  padding: theme.spacing(1, 0),
  boxShadow: theme.customShadows.z8,
  top: HEADER.DASHBOARD_DESKTOP_OFFSET_HEIGHT,
  backgroundColor: theme.palette.background.default,
}));

// ----------------------------------------------------------------------

function NavbarHorizontal() {
  const { isLoading, isError, data: itemsNavConfig, error } = useQueryItemsNavConfig();

  if (isLoading) {
    return <span>Loading...</span>;
  }

  if (isError) {
    console.error(error);
    return <span>Error loading items!</span>;
  }

  return (
    <RootStyle>
      <Container maxWidth={false}>
        <NavSectionHorizontal navConfig={itemsNavConfig} />
      </Container>
    </RootStyle>
  );
}

export default memo(NavbarHorizontal);