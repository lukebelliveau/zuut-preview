import { ReactNode, useState } from 'react';
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

// ----------------------------------------------------------------------

type MainStyleProps = {
  collapseClick: boolean;
};

const MainStyle = styled('main', {
  shouldForwardProp: (prop) => prop !== 'collapseClick',
})<MainStyleProps>(({ collapseClick, theme }) => ({
  flexGrow: 1,
  paddingTop: HEADER.H_MOBILE + 24,
  // paddingBottom: HEADER.MOBILE_HEIGHT + 24,
  height: '100%',
  width: '100%',
  [theme.breakpoints.up('lg')]: {
    paddingLeft: 16,
    paddingRight: 16,
    paddingTop: HEADER.H_DASHBOARD_DESKTOP + 24,
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

export default function PlaygroundLayout({
  children,
}: {
  children: ReactNode;
}) {
  const { collapseClick, isCollapse } = useCollapseDrawer();
  const { themeLayout } = useSettings();

  const isDesktop = useResponsive('up', 'lg');

  const [open, setOpen] = useState(false);
  const store = useStore() as AppStore;

  const verticalLayout = themeLayout === 'vertical';

  const handleKeyDown = (e: React.KeyboardEvent<HTMLSpanElement>) => {
    handleDeleteOnKeyDown(e, store);
    handleUndoRedoOnKeyDown(e, store);
    handleSelectAllOnKeyDown(e, store);
    handleEscOnKeyDown(e, store);
  };

  if (true) {
    console.log('VERT');
    return (
      <>
        <PlaygroundHeader
          onOpenSidebar={() => setOpen(true)}
          verticalLayout={verticalLayout}
        />

        <Box
          component="main"
          sx={{
            height: '100%',
            width: '100%',
          }}
          onKeyDown={handleKeyDown}
        >
          {children}
          <ControlPanelDrawer />
          <InventoryDrawer />
        </Box>
      </>
    );
  }

  console.log('HORZ');
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
      <PlaygroundHeader
        isCollapse={isCollapse}
        onOpenSidebar={() => setOpen(true)}
      />

      <NavbarVertical
        isOpenSidebar={open}
        onCloseSidebar={() => setOpen(false)}
      />

      <MainStyle collapseClick={collapseClick}>{children}</MainStyle>
    </Box>
  );
}
