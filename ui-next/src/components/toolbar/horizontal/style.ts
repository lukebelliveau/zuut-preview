// @mui
import { alpha, styled } from '@mui/material/styles';
import {
  ListItemIcon,
  ListSubheader,
  ListItemButton,
  Popover,
} from '@mui/material';
// config
import { ICON, NAV, NAVBAR } from '../../../config';
//
import { NavItemProps } from '../type';
import cssStyles from 'src/utils/cssStyles';
import { ListItemStyleProps } from '../vertical/style';

// ----------------------------------------------------------------------

type StyledItemProps = Omit<NavItemProps, 'item'> & {
  caption?: boolean;
  disabled?: boolean;
};

export const ListItemButtonStyle = styled(ListItemButton, {
  shouldForwardProp: (prop) => prop !== 'active' && prop !== 'open',
})<ListItemStyleProps>(({ active, depth, open, theme }) => {
  const isLight = theme.palette.mode === 'light';

  const activeStyle = {
    color: theme.palette.grey[800],
    backgroundColor: theme.palette.common.white,
    boxShadow: `-2px 4px 6px 0 ${alpha(
      isLight ? theme.palette.grey[500] : theme.palette.common.black,
      0.16
    )}`,
  };

  const activeSubStyle = {
    boxShadow: 'none',
    color: theme.palette.primary.main,
    backgroundColor: alpha(
      theme.palette.primary.main,
      theme.palette.action.selectedOpacity
    ),
  };

  const hoverStyle = {
    color: theme.palette.text.primary,
    backgroundColor: theme.palette.action.hover,
    boxShadow: `inset 0 0 1px 1px ${theme.palette.divider}`,
  };

  return {
    textTransform: 'capitalize',
    margin: theme.spacing(0, 0.5),
    padding: theme.spacing(0, 1),
    color: theme.palette.text.secondary,
    borderRadius: theme.shape.borderRadius,
    height: NAVBAR.DASHBOARD_ITEM_HORIZONTAL_HEIGHT,
    '&:hover': hoverStyle,
    // Active item
    ...(active && {
      ...activeStyle,
      '&:hover': { ...activeStyle },
    }),
    // Active item sub
    ...(active &&
      depth !== 1 && {
        ...activeSubStyle,
        '&:hover': { ...activeSubStyle },
      }),
    // Sub item
    ...(depth && {
      ...(depth > 1 && {
        width: '100%',
        margin: 0,
        paddingRight: 0,
        paddingLeft: theme.spacing(1),
      }),
    }),
    // Open
    ...(open && !active && hoverStyle),
  };
});

export const PaperStyle = styled(Popover)(({ theme }) => ({
  pointerEvents: 'none',
  '& .MuiPopover-paper': {
    width: 160,
    pointerEvents: 'auto',
    padding: theme.spacing(1),
    marginTop: theme.spacing(0.5),
    boxShadow: theme.customShadows.dropdown,
    borderRadius: Number(theme.shape.borderRadius) * 1.5,
    ...cssStyles(theme).bgBlur(),
  },
}));

export const StyledItem = styled(ListItemButton, {
  shouldForwardProp: (prop) => prop !== 'active' && prop !== 'caption',
})<StyledItemProps>(({ active, disabled, depth, caption, theme }) => {
  const isLight = theme.palette.mode === 'light';

  const subItem = depth !== 1;

  const activeStyle = {
    color: theme.palette.primary.main,
    backgroundColor: alpha(
      theme.palette.primary.main,
      theme.palette.action.selectedOpacity
    ),
    ...(!isLight && {
      color: theme.palette.primary.light,
    }),
  };

  const activeSubStyle = {
    color: theme.palette.text.primary,
    backgroundColor: 'transparent',
  };

  return {
    position: 'relative',
    textTransform: 'capitalize',
    paddingLeft: theme.spacing(2),
    paddingRight: theme.spacing(1.5),
    marginBottom: theme.spacing(0.5),
    color: theme.palette.text.secondary,
    borderRadius: theme.shape.borderRadius,
    height: NAV.H_DASHBOARD_ITEM,
    // Sub item
    ...(subItem && {
      height: NAV.H_DASHBOARD_ITEM_SUB,
      ...(depth > 2 && {
        paddingLeft: theme.spacing(depth),
      }),
      ...(caption && {
        height: NAV.H_DASHBOARD_ITEM,
      }),
    }),
    // Active item
    ...(active && {
      ...activeStyle,
      '&:hover': {
        ...activeStyle,
      },
    }),
    // Active sub item
    ...(subItem &&
      active && {
        ...activeSubStyle,
        '&:hover': {
          ...activeSubStyle,
        },
      }),
    // Disabled
    ...(disabled && {
      '&.Mui-disabled': {
        opacity: 0.64,
      },
    }),
  };
});

// ----------------------------------------------------------------------

export const StyledIcon = styled(ListItemIcon)({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  width: ICON.NAV_ITEM,
  height: ICON.NAV_ITEM,
});

// ----------------------------------------------------------------------

type StyledDotIconProps = {
  active?: boolean;
};

export const StyledDotIcon = styled('span', {
  shouldForwardProp: (prop) => prop !== 'active',
})<StyledDotIconProps>(({ active, theme }) => ({
  width: 4,
  height: 4,
  borderRadius: '50%',
  backgroundColor: theme.palette.text.disabled,
  transition: theme.transitions.create('transform', {
    duration: theme.transitions.duration.shorter,
  }),
  ...(active && {
    transform: 'scale(2)',
    backgroundColor: theme.palette.primary.main,
  }),
}));

// ----------------------------------------------------------------------

export const StyledSubheader = styled(ListSubheader)(({ theme }) => ({
  ...theme.typography.overline,
  fontSize: 11,
  paddingTop: theme.spacing(3),
  paddingBottom: theme.spacing(1),
  color: theme.palette.text.secondary,
}));
