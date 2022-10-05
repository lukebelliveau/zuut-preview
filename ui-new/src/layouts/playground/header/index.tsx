// @mui
import { alpha, styled } from '@mui/material/styles';
import { Box, Stack, AppBar, Toolbar, Container, CssBaseline } from '@mui/material';
// hooks
import useOffSetTop from '../../../hooks/useOffSetTop';
import useResponsive from '../../../hooks/useResponsive';
// utils
import cssStyles from '../../../utils/cssStyles';
// config
import { HEADER, NAVBAR } from '../../../config';
// components
import Logo from '../../../components/Logo';
import Iconify from '../../../components/Iconify';
import { IconButtonAnimate } from '../../../components/animate';
//
import LanguagePopover from './LanguagePopover';
import ContactsPopover from './ContactsPopover';
import NotificationsPopover from './NotificationsPopover';
import NavbarHorizontal from '../toolbar';
import { NavSectionHorizontal } from 'src/components/toolbar';
import { useQueryItemsNavConfig } from '../toolbar/NavConfig';

// ----------------------------------------------------------------------

type RootStyleProps = {
  isCollapse: boolean;
  isOffset: boolean;
  verticalLayout: boolean;
};

const RootStyle = styled(AppBar, {
  shouldForwardProp: (prop) =>
    prop !== 'isCollapse' && prop !== 'isOffset' && prop !== 'verticalLayout',
})<RootStyleProps>(({ isCollapse, isOffset, verticalLayout, theme }) => ({
  ...cssStyles(theme).bgBlur(),
  color: theme.palette.background.neutral,
  // boxShadow: 'none',
  height: HEADER.MOBILE_HEIGHT,
  zIndex: theme.zIndex.appBar + 1,
  transition: theme.transitions.create(['width', 'height'], {
    duration: theme.transitions.duration.shorter,
  }),
  [theme.breakpoints.up('lg')]: {
    height: HEADER.DASHBOARD_DESKTOP_HEIGHT,
    width: `calc(100% - ${NAVBAR.DASHBOARD_WIDTH + 1}px)`,
    ...(isCollapse && {
      width: `calc(100% - ${NAVBAR.DASHBOARD_COLLAPSE_WIDTH}px)`,
    }),
    // ...(isOffset && {
    //   height: HEADER.DASHBOARD_DESKTOP_OFFSET_HEIGHT,
    // }),
    ...(verticalLayout && {
      width: '100%',
      height: HEADER.DASHBOARD_DESKTOP_OFFSET_HEIGHT,
      backgroundColor: theme.palette.background.default,
    }),
  },
  boxShadow: `-24px 12px 32px -4px ${alpha(
    theme.palette.mode === 'light' ? theme.palette.grey[500] : theme.palette.common.black,
    0.16
  )}`,
}));

// ----------------------------------------------------------------------

type Props = {
  onOpenSidebar: VoidFunction;
  isCollapse?: boolean;
  verticalLayout?: boolean;
};

const ItemsHeader = () => {
  return (
    <Container
      maxWidth={false}
      sx={{
        '&.MuiContainer-root': {
          pr: 0,
        },
      }}
    >
      <NavSectionHorizontal />
    </Container>
  );
};

export default function PlaygroundHeader({
  onOpenSidebar,
  isCollapse = false,
  verticalLayout = false,
}: Props) {
  const isOffset = useOffSetTop(HEADER.DASHBOARD_DESKTOP_HEIGHT) && !verticalLayout;

  const isDesktop = useResponsive('up', 'lg');

  return (
    <RootStyle isCollapse={isCollapse} isOffset={isOffset} verticalLayout={verticalLayout}>
      <Toolbar
        sx={{
          minHeight: '100% !important',
          // px: { lg: 5 },
          paddingLeft: 5,
          backgroundColor: 'background.neutral',
          // paddingRight: 0,
        }}
        disableGutters
      >
        <Logo sx={{ mr: 2.5 }} />
        <ItemsHeader />
      </Toolbar>
    </RootStyle>
  );
}
