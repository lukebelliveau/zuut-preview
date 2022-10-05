// @mui
import { alpha, styled, useTheme } from '@mui/material/styles';
import { Tooltip } from '@mui/material';
// utils
import cssStyles from '../../../utils/cssStyles';

import { IconButtonAnimate } from '../../animate';
import { AnimatePresence, m } from 'framer-motion';
import InventoryIcon from '@mui/icons-material/Inventory';
import { useSelectAllItems } from 'src/redux/features/items/itemsSelectors';

// ----------------------------------------------------------------------

const RootStyle = styled(m.span)(({ theme }) => ({
  ...cssStyles(theme).bgBlur({ opacity: 0.64 }),
  left: 10,
  bottom: 10,
  position: 'fixed',
  marginTop: theme.spacing(-3),
  padding: theme.spacing(0.5),
  zIndex: theme.zIndex.drawer + 2,
  borderRadius: '50%',
  boxShadow: `-12px 12px 32px -4px ${alpha(
    theme.palette.mode === 'light' ? theme.palette.grey[600] : theme.palette.common.black,
    0.36
  )}`,
}));

const DotStyle = styled('span')(({ theme }) => ({
  top: 8,
  width: 8,
  height: 8,
  right: 10,
  borderRadius: '50%',
  position: 'absolute',
  backgroundColor: theme.palette.error.main,
}));

// ----------------------------------------------------------------------

type Props = {
  open: boolean;
  onToggle: VoidFunction;
};

const ToggleButton = ({
  open,
  onToggle,
}: {
  open: boolean;

  onToggle: VoidFunction;
}) => {
  const theme = useTheme();
  const itemStates = useSelectAllItems();

  const hoverColor = open ? theme.palette.secondary.main : theme.palette.primary.main;
  return (
    <RootStyle
      initial={{ opacity: 0, scale: 0.5 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.3 }}
      exit={{ opacity: 0 }}
    >
      <Tooltip open title={itemStates.length > 0 ? itemStates.length : ''} placement="left">
        <IconButtonAnimate
          color="inherit"
          // color={theme.palette.error}
          onClick={onToggle}
          sx={{
            padding: 0,
            p: 1.25,
            transition: (theme) => theme.transitions.create('all'),
            color: hoverColor,
            '&:hover': {
              color: hoverColor,
              bgcolor: (theme) => alpha(hoverColor, theme.palette.action.hoverOpacity),
            },
            '& .MuiButtonBase-root': {
              padding: 0,
              '&.MuiIconButton-root': {
                padding: 50,
              },
            },
          }}
        >
          <div
            style={{
              // maxWidth: 40,
              // maxHeight: 40,
              // width: 40,
              // height: 40,
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'center',
            }}
          >
            <InventoryIcon />
          </div>
        </IconButtonAnimate>
      </Tooltip>
    </RootStyle>
  );
};

export default function AnimatedToggleButton({ open, onToggle }: Props) {
  return (
    <AnimatePresence>
      <ToggleButton open={open} onToggle={onToggle} />
    </AnimatePresence>
  );
}
