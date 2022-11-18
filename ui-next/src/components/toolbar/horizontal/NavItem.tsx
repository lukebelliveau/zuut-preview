import { forwardRef } from 'react';
// @mui
import {
  Box,
  Tooltip,
  ListItemButtonProps,
  ListItemText,
  ListItemIcon,
} from '@mui/material';
// hooks
import useLocales from '../../../hooks/useLocales';
// guards
import RoleBasedGuard from '../../../auth/RoleBasedGuard';
// config
import { ICON } from '../../../config';
//
import { NavItemProps } from '../type';
import Iconify from '../../iconify';
import { ListItemButtonStyle } from './style';

// ----------------------------------------------------------------------

type Props = NavItemProps & ListItemButtonProps;

const NavItem = forwardRef<HTMLDivElement & HTMLAnchorElement, Props>(
  ({ item, depth, active, open, ...other }, ref) => {
    const { translate } = useLocales();

    const { name, icon, info, children, disabled, caption, roles } = item;

    const renderContent = (
      <ListItemButtonStyle
        ref={ref}
        open={open}
        depth={depth}
        active={active}
        disabled={disabled}
        {...other}
      >
        {icon && (
          <ListItemIcon
            sx={{
              mr: 1,
              flexShrink: 0,
              width: ICON.NAV_ITEM_HORIZONTAL,
              height: ICON.NAV_ITEM_HORIZONTAL,
            }}
          >
            {icon}
          </ListItemIcon>
        )}

        <ListItemText
          primary={translate(name)}
          primaryTypographyProps={{
            noWrap: true,
            variant: active ? 'subtitle2' : 'body2',
          }}
        />

        {caption && (
          <Tooltip title={translate(caption)} arrow>
            <Box component="span" sx={{ ml: 0.5, lineHeight: 0 }}>
              <Iconify
                icon="eva:info-outline"
                sx={{
                  width: ICON.NAV_ITEM_HORIZONTAL / -4,
                  height: ICON.NAV_ITEM_HORIZONTAL / -4,
                }}
              />
            </Box>
          </Tooltip>
        )}

        {info && (
          <Box component="span" sx={{ ml: 1, lineHeight: 0 }}>
            {info}
          </Box>
        )}

        {!!children && (
          <Iconify
            icon={
              depth > 1 ? 'eva:chevron-right-fill' : 'eva:chevron-down-fill'
            }
            sx={{
              ml: 0.5,
              flexShrink: 0,
              width: ICON.NAV_ITEM_HORIZONTAL,
              height: ICON.NAV_ITEM_HORIZONTAL,
            }}
          />
        )}
      </ListItemButtonStyle>
    );

    return <RoleBasedGuard roles={roles}>{renderContent}</RoleBasedGuard>;
  }
);

export default NavItem;
