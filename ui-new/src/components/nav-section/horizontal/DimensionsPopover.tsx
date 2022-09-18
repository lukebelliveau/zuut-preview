import {
  Typography,
  Divider,
  Stack,
  MenuItem,
  Box,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Tooltip,
} from '@mui/material';
import { alpha } from '@mui/material/styles';
import { useSnackbar } from 'notistack';
import { useState } from 'react';
import { useNavigate } from 'react-router';
import useAuth from 'src/hooks/useAuth';
import useIsMountedRef from 'src/hooks/useIsMountedRef';
import { IconButtonAnimate } from '../../animate';
import MenuPopover from '../../MenuPopover';
import { Link as RouterLink } from 'react-router-dom';
import { PATH_DASHBOARD } from 'src/routes/paths';
import { ListItemStyle } from './style';
import StraightenIcon from '@mui/icons-material/Straighten';
import { ICON } from 'src/config';
import Iconify from 'src/components/Iconify';
import Dimensions from '../dimensions';

const MENU_OPTIONS = [
  {
    label: 'Home',
    linkTo: '/',
  },
  {
    label: 'Profile',
    linkTo: PATH_DASHBOARD.user.profile,
  },
  {
    label: 'Settings',
    linkTo: PATH_DASHBOARD.user.account,
  },
];

export default function AccountPopover() {
  const navigate = useNavigate();
  const active = false;

  const { user, logout } = useAuth();

  const isMountedRef = useIsMountedRef();

  const { enqueueSnackbar } = useSnackbar();

  const [open, setOpen] = useState<HTMLElement | null>(null);

  const handleOpen = (event: React.MouseEvent<HTMLElement>) => {
    setOpen(event.currentTarget);
  };

  const handleClose = () => {
    setOpen(null);
  };

  return (
    <>
      <IconButtonAnimate
        onClick={handleOpen}
        sx={{
          p: 0,
          ...(open && {
            '&:before': {
              zIndex: 1,
              content: "''",
              width: '100%',
              height: '100%',
              borderRadius: '50%',
              position: 'absolute',
              bgcolor: (theme) => alpha(theme.palette.grey[900], 0.8),
            },
          }),
        }}
      >
        <ListItemButton
        // ref={ref}
        // open={false}
        // depth={1}
        // active={active}
        // disabled={disabled}
        // {...other}
        >
          <ListItemIcon
            sx={{
              mr: 1,
              flexShrink: 0,
              width: ICON.NAVBAR_ITEM_HORIZONTAL,
              height: ICON.NAVBAR_ITEM_HORIZONTAL,
            }}
          >
            <StraightenIcon />
          </ListItemIcon>

          <ListItemText
            primary={'Dimensions'}
            primaryTypographyProps={{
              noWrap: true,
              variant: active ? 'subtitle2' : 'body2',
            }}
          />

          {/* {caption && (
            <Tooltip title={translate(caption)} arrow>
              <Box component="span" sx={{ ml: 0.5, lineHeight: 0 }}>
                <Iconify
                  icon="eva:info-outline"
                  sx={{
                    width: ICON.NAVBAR_ITEM_HORIZONTAL / -4,
                    height: ICON.NAVBAR_ITEM_HORIZONTAL / -4,
                  }}
                />
              </Box>
            </Tooltip>
          )} */}
        </ListItemButton>
      </IconButtonAnimate>

      <MenuPopover
        open={Boolean(open)}
        anchorEl={open}
        onClose={handleClose}
        sx={{
          p: 0,
          mt: 1.5,
          ml: 0.75,
          '& .MuiMenuItem-root': {
            typography: 'body2',
            borderRadius: 0.75,
          },
        }}
      >
        <Divider sx={{ borderStyle: 'dashed' }} />

        <Stack sx={{ p: 1 }}>
          <Dimensions />
        </Stack>
      </MenuPopover>
    </>
  );
}
