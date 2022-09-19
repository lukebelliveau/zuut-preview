import { AnimatePresence, m } from 'framer-motion';
import { useState, useEffect, useRef } from 'react';
// @mui
import { alpha, styled } from '@mui/material/styles';
import { Stack, Divider, Typography, IconButton } from '@mui/material';
// hooks
import useSettings from '../../../hooks/useSettings';
// utils
import cssStyles from '../../../utils/cssStyles';
// config
import { NAVBAR, defaultSettings } from '../../../config';
//
import Iconify from '../../Iconify';
import Scrollbar from '../../Scrollbar';
import { varFade } from '../../animate';
//
import AnimatedToggleButton from './ToggleButton';
import ControlPanelDescription from './ControlPanelDescription';
import ControlPanelTransform from './ControlPanelTransform';
import { useSelector } from 'src/redux/store';
import { selectSelectedItemId } from 'src/redux/features/interactions/interactionsSelectors';
import { useSelectItemById } from 'src/redux/features/items/itemsSelectors';
import ItemReduxAdapter from 'src/lib/item/itemReduxAdapter';

// ----------------------------------------------------------------------

const RootStyle = styled(m.div)(({ theme }) => ({
  ...cssStyles(theme).bgBlur({ color: theme.palette.background.paper, opacity: 0.92 }),
  // top: HEADER.DASHBOARD_DESKTOP_OFFSET_HEIGHT,
  backgroundColor: theme.palette.background.neutral,
  top: '50%',
  right: 0,
  bottom: 0,
  display: 'flex',
  position: 'fixed',
  overflow: 'hidden',
  width: NAVBAR.BASE_WIDTH,
  flexDirection: 'column',
  margin: theme.spacing(2),
  paddingBottom: theme.spacing(3),
  zIndex: theme.zIndex.drawer + 3,
  borderRadius: Number(theme.shape.borderRadius) * 1.5,
  boxShadow: `-24px 12px 32px -4px ${alpha(
    theme.palette.mode === 'light' ? theme.palette.grey[500] : theme.palette.common.black,
    0.16
  )}`,
}));

// ----------------------------------------------------------------------

export default function ControlPanelDrawer() {
  const {
    themeMode,
    themeLayout,
    themeStretch,
    themeContrast,
    themeDirection,
    themeColorPresets,
    onResetSetting,
  } = useSettings();
  const selectedItemIds = useSelector(selectSelectedItemId);
  const itemState = useSelectItemById(
    selectedItemIds.length === 1 ? selectedItemIds[0] : undefined
  );
  const item = itemState ? ItemReduxAdapter.stateToItem(itemState) : undefined;
  const [open, setOpen] = useState(false);
  const previousItemRef = useRef<any>();

  useEffect(() => {
    if (item === undefined) {
      setOpen(false);
      return;
    }

    if (previousItemRef.current === undefined && item !== undefined) {
      previousItemRef.current = item;
      setOpen(true);
      return;
    }

    if (previousItemRef.current === undefined) return;

    if (item.id !== previousItemRef.current.id) {
      setOpen(true);
    }

    previousItemRef.current = item;
  }, [setOpen, item]);

  useEffect(() => {
    previousItemRef.current = item;
  }, [item]);

  const notDefault =
    themeMode !== defaultSettings.themeMode ||
    themeLayout !== defaultSettings.themeLayout ||
    themeStretch !== defaultSettings.themeStretch ||
    themeContrast !== defaultSettings.themeContrast ||
    themeDirection !== defaultSettings.themeDirection ||
    themeColorPresets !== defaultSettings.themeColorPresets;

  const varSidebar =
    themeDirection !== 'rtl'
      ? varFade({
          distance: NAVBAR.BASE_WIDTH,
          durationIn: 0.32,
          durationOut: 0.32,
        }).inRight
      : varFade({
          distance: NAVBAR.BASE_WIDTH,
          durationIn: 0.32,
          durationOut: 0.32,
        }).inLeft;

  const handleToggle = () => {
    setOpen((prev) => !prev);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <>
      {/* <Backdrop
        open={open}
        onClick={handleClose}
        sx={{ background: 'transparent', zIndex: (theme) => theme.zIndex.drawer + 1 }}
      /> */}

      {!open && (
        <AnimatedToggleButton
          open={open}
          item={item}
          notDefault={notDefault}
          onToggle={handleToggle}
        />
      )}

      <AnimatePresence>
        {open && (
          <>
            {item ? (
              <RootStyle {...varSidebar}>
                <Stack
                  direction="row"
                  alignItems="center"
                  justifyContent="space-between"
                  sx={{ py: 2, pr: 1, pl: 2.5 }}
                >
                  <Typography variant="subtitle1" sx={{ flexGrow: 1 }}>
                    {item.name}
                  </Typography>

                  <IconButton onClick={handleClose}>
                    <Iconify icon={'eva:close-fill'} width={20} height={20} />
                  </IconButton>
                </Stack>

                <Divider sx={{ borderStyle: 'dashed' }} />

                <Scrollbar sx={{ flexGrow: 1 }}>
                  <Stack spacing={3} sx={{ p: 3 }}>
                    <Stack spacing={1.5}>
                      <Typography variant="subtitle2">Description</Typography>
                      <ControlPanelDescription item={item} />
                    </Stack>

                    <Stack spacing={1.5}>
                      <Typography variant="subtitle2">Transform</Typography>
                      <ControlPanelTransform item={item} />
                    </Stack>

                    {/* <Stack spacing={1.5}>
                      <Typography variant="subtitle2">Direction</Typography>
                      <SettingDirection />
                    </Stack>

                    <Stack spacing={1.5}>
                      <Typography variant="subtitle2">Layout</Typography>
                      <SettingLayout />
                    </Stack>

                    <Stack spacing={1.5}>
                      <Typography variant="subtitle2">Presets</Typography>
                      <SettingColorPresets />
                    </Stack>

                    <Stack spacing={1.5}>
                      <Typography variant="subtitle2">Stretch</Typography>
                      <SettingStretch />
                    </Stack> */}

                    {/* <SettingFullscreen /> */}
                  </Stack>
                </Scrollbar>
              </RootStyle>
            ) : null}
          </>
        )}
      </AnimatePresence>
    </>
  );
}
