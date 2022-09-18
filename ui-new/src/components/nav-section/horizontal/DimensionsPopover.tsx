import { Divider, Stack, ListItemButton, ListItemIcon, ListItemText } from '@mui/material';
import { styled } from '@mui/material/styles';
import { useSnackbar } from 'notistack';
import { useState } from 'react';
import { useNavigate } from 'react-router';
import useAuth from 'src/hooks/useAuth';
import useIsMountedRef from 'src/hooks/useIsMountedRef';
import { IconButtonAnimate } from '../../animate';
import MenuPopover from '../../MenuPopover';
import { PATH_DASHBOARD } from 'src/routes/paths';
import StraightenIcon from '@mui/icons-material/Straighten';
import { ICON, NAVBAR } from 'src/config';
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

const MyThemeComponent = styled(ListItemButton)(({ theme }) => ({
  color: theme.palette.primary.contrastText,
  backgroundColor: theme.palette.primary.main,
  padding: theme.spacing(1),
  borderRadius: theme.shape.borderRadius,
}));

const DimensionsButton = styled(ListItemButton)(({ theme }) => {
  const isLight = theme.palette.mode === 'light';

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
  };
});

export default function DimensionsPopover() {
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
        disableRipple
        sx={{
          p: 0,
          padding: '0px 2px',
          ...(open && {
            '&:before': {
              zIndex: 1,
              content: "''",
              width: '100%',
              height: '100%',
              borderRadius: '50%',
              position: 'absolute',
              // bgcolor: (theme) => alpha(theme.palette.grey[900], 0.8),
            },
          }),
        }}
      >
        <DimensionsButton>
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
              variant: 'body2',
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
        </DimensionsButton>
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
