// @mui
import { alpha, styled } from '@mui/material/styles';
import { Tooltip } from '@mui/material';
// utils
import cssStyles from '../../../utils/cssStyles';
//
import Iconify from '../../Iconify';
import { IconButtonAnimate } from '../../animate';
import { AnimatePresence, m } from 'framer-motion';
import { ItemState } from 'src/redux/features/items/itemState';
import ItemReduxAdapter from 'src/lib/item/itemReduxAdapter';
import { IPlaceableItem, isPlaceableItem } from 'src/lib/item/placeableItem';
import Image from 'src/components/Image';

// ----------------------------------------------------------------------

const RootStyle = styled(m.span)(({ theme }) => ({
  ...cssStyles(theme).bgBlur({ opacity: 0.64 }),
  right: 0,
  top: '90%',
  position: 'fixed',
  marginTop: theme.spacing(-3),
  padding: theme.spacing(0.5),
  zIndex: theme.zIndex.drawer + 2,
  borderRadius: '24px 0 20px 24px',
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
  notDefault: boolean;
  onToggle: VoidFunction;
  item: ItemState | undefined;
};

const ToggleButton = ({
  notDefault,
  open,
  onToggle,
  item: itemState,
}: {
  open: boolean;
  notDefault: boolean;
  onToggle: VoidFunction;
  item: ItemState;
}) => {
  const item = ItemReduxAdapter.stateToItem(itemState) as IPlaceableItem;

  if (!isPlaceableItem(item)) {
    return null;
  }

  if (!item.image) throw new Error('Image not found in ImageItem component');

  // create manually instead of using Konva's `use-image` package.
  // useImage() asynchronously loads the image every time the component mounts, causing flickering on zoom (because children of the Stage re-mount).
  const imageObj = new window.Image();
  imageObj.src = item.image;

  return (
    <RootStyle
      initial={{ opacity: 0, scale: 0.5 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.3 }}
      exit={{ opacity: 0 }}
    >
      {notDefault && !open && <DotStyle />}

      <Tooltip title={`${item.name} Properties`} placement="left">
        <IconButtonAnimate
          color="inherit"
          onClick={onToggle}
          sx={{
            padding: 0,
            p: 1.25,
            transition: (theme) => theme.transitions.create('all'),
            '&:hover': {
              color: 'primary.main',
              bgcolor: (theme) =>
                alpha(theme.palette.primary.main, theme.palette.action.hoverOpacity),
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
              maxWidth: 20,
              maxHeight: 20,
              width: 20,
              height: 20,
              padding: 0,
            }}
          >
            <Image src={item.image} maxWidth={20} maxHeight={20} width={20} height={20} />
          </div>
        </IconButtonAnimate>
      </Tooltip>
    </RootStyle>
  );
};

export default function AnimatedToggleButton({ notDefault, open, onToggle, item }: Props) {
  return (
    <AnimatePresence>
      {item && <ToggleButton notDefault={notDefault} open={open} onToggle={onToggle} item={item} />}
    </AnimatePresence>
  );
}
