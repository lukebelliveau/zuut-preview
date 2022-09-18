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
import EditIcon from '@mui/icons-material/Edit';
import { ICON, NAVBAR } from 'src/config';
import Modal from 'react-modal';
import Dimensions from '../dimensions';
import Toolbar from 'src/components/nav-section/horizontal/HorizontalToolbar';
import Iconify from 'src/components/Iconify';
import ResetPlaygroundModal from 'src/components/playground/Toolbar/ResetPlaygroundModal';

const ToolbarButton = styled(ListItemButton)(({ theme }) => {
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

export default function ToolbarPopover() {
  const [open, setOpen] = useState<HTMLElement | null>(null);
  const [modalIsOpen, setModalIsOpen] = useState(false);

  const openPopover = (event: React.MouseEvent<HTMLElement>) => {
    setOpen(event.currentTarget);
  };

  const closePopover = () => {
    setOpen(null);
  };

  function openModal() {
    closePopover();
    setModalIsOpen(true);
  }

  function closeModal() {
    Modal.setAppElement('#root');
    setModalIsOpen(false);
  }

  return (
    <>
      <IconButtonAnimate
        onClick={openPopover}
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
        <ToolbarButton>
          <ListItemIcon
            sx={{
              mr: 1,
              flexShrink: 0,
              width: ICON.NAVBAR_ITEM_HORIZONTAL,
              height: ICON.NAVBAR_ITEM_HORIZONTAL,
            }}
          >
            <EditIcon />
          </ListItemIcon>

          <ListItemText
            primary={'Edit'}
            primaryTypographyProps={{
              noWrap: true,
              variant: 'body2',
            }}
          />

          <Iconify
            icon={'eva:chevron-down-fill'}
            sx={{
              ml: 0.5,
              flexShrink: 0,
              width: ICON.NAVBAR_ITEM_HORIZONTAL,
              height: ICON.NAVBAR_ITEM_HORIZONTAL,
            }}
          />
        </ToolbarButton>
      </IconButtonAnimate>

      <MenuPopover
        open={Boolean(open)}
        anchorEl={open}
        onClose={closePopover}
        onMouseLeave={closePopover}
        sx={{
          p: 0,
          mt: 1.5,
          ml: 0.75,
          width: 'auto',
          '& .MuiMenuItem-root': {
            typography: 'body2',
            borderRadius: 0.75,
          },
        }}
      >
        <Divider sx={{ borderStyle: 'dashed' }} />

        <Stack sx={{ p: 1 }}>
          <Toolbar openResetModal={openModal} />
        </Stack>
      </MenuPopover>
      <ResetPlaygroundModal open={modalIsOpen} onClose={closeModal} />
    </>
  );
}
