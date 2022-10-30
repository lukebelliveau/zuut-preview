import { useState } from 'react';
import { Outlet } from 'react-router-dom';
// @mui
import { styled } from '@mui/material/styles';
import { Box } from '@mui/material';
// hooks
import useSettings from '../../hooks/useSettings';
import useResponsive from '../../hooks/useResponsive';
import useCollapseDrawer from '../../hooks/useCollapseDrawer';
// config
import { HEADER, NAVBAR } from '../../config';
//
import PlaygroundHeader from './header';
import NavbarVertical from './toolbar/NavbarVertical';
import ControlPanelDrawer from '../../components/playground/controlPanel';
import InventoryDrawer from 'src/components/playground/inventory';
import {
  handleDeleteOnKeyDown,
  handleEscOnKeyDown,
  handleSelectAllOnKeyDown,
  handleUndoRedoOnKeyDown,
} from 'src/utils/interactionHandlers';
import { AppStore, store } from 'src/redux/store';
import { useStore } from 'react-redux';
import useGetLiveblocksRoom from 'src/hooks/useGetLiveblocksRoom';

// ----------------------------------------------------------------------

type MainStyleProps = {
  collapseClick: boolean;
};

const MainStyle = styled('main', {
  shouldForwardProp: (prop) => prop !== 'collapseClick',
})<MainStyleProps>(({ collapseClick, theme }) => ({
  flexGrow: 1,
  paddingTop: HEADER.MOBILE_HEIGHT + 24,
  // paddingBottom: HEADER.MOBILE_HEIGHT + 24,
  height: '100%',
  width: '100%',
  [theme.breakpoints.up('lg')]: {
    paddingLeft: 16,
    paddingRight: 16,
    paddingTop: HEADER.DASHBOARD_DESKTOP_HEIGHT + 24,
    // paddingBottom: HEADER.DASHBOARD_DESKTOP_HEIGHT + 24,
    width: `calc(100% - ${NAVBAR.DASHBOARD_WIDTH}px)`,
    transition: theme.transitions.create('margin-left', {
      duration: theme.transitions.duration.shorter,
    }),
    ...(collapseClick && {
      marginLeft: NAVBAR.DASHBOARD_COLLAPSE_WIDTH,
    }),
  },
}));

// ----------------------------------------------------------------------

export default function PlaygroundLayout() {
  const { collapseClick, isCollapse } = useCollapseDrawer();
  const { themeLayout } = useSettings();
  const liveblocksRoom = useGetLiveblocksRoom();

  const isDesktop = useResponsive('up', 'lg');

  const [open, setOpen] = useState(false);
  const store = useStore() as AppStore;

  const verticalLayout = themeLayout === 'vertical';

  const handleKeyDown = (e: React.KeyboardEvent<HTMLSpanElement>) => {
    handleDeleteOnKeyDown(e, store);
    handleUndoRedoOnKeyDown(e, liveblocksRoom, store);
    handleSelectAllOnKeyDown(e, store);
    handleEscOnKeyDown(e, store);
  };

  if (verticalLayout) {
    return (
      <>
        <PlaygroundHeader onOpenSidebar={() => setOpen(true)} verticalLayout={verticalLayout} />

        {/* Skip all navbars, the <NavSectionHorizontal /> is in the header component */}
        {/* <NavbarHorizontal /> */}
        {/* {isDesktop ? (
          <NavbarHorizontal />
        ) : (
          <NavbarVertical isOpenSidebar={open} onCloseSidebar={() => setOpen(false)} />
        )} */}

        <Box
          component="main"
          // sx={{
          //   px: { lg: 2 },
          //   pt: {
          //     xs: `${HEADER.MOBILE_HEIGHT + 24}px`,
          //     lg: `${HEADER.DASHBOARD_DESKTOP_HEIGHT + 80}px`,
          //   },
          //   pb: {
          //     xs: `${HEADER.MOBILE_HEIGHT + 24}px`,
          //     lg: `${HEADER.DASHBOARD_DESKTOP_HEIGHT + 24}px`,
          //   },
          // }}
          sx={{
            height: '100%',
            width: '100%',
          }}
          onKeyDown={handleKeyDown}
        >
          <Outlet />
          <ControlPanelDrawer />
          <InventoryDrawer />
        </Box>
      </>
    );
  }

  return (
    <Box
      // sx={{
      //   display: { lg: 'flex' },
      //   minHeight: { lg: 1 },
      // }}
      sx={{
        height: '100%',
        width: '100%',
      }}
    >
      <PlaygroundHeader isCollapse={isCollapse} onOpenSidebar={() => setOpen(true)} />

      <NavbarVertical isOpenSidebar={open} onCloseSidebar={() => setOpen(false)} />

      <MainStyle collapseClick={collapseClick}>
        <Outlet />
      </MainStyle>
    </Box>
  );
}
