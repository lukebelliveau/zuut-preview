// @mui
import { styled } from '@mui/material/styles';
import {
  Grid,
  RadioGroup,
  CardActionArea,
  Stack,
  Typography,
  Box,
  IconButton,
} from '@mui/material';
// hooks
import useSettings from '../../../hooks/useSettings';
//
import Iconify from '../../Iconify';
import BoxMask from './BoxMask';
import Image from 'src/components/Image';
import { IItem } from 'src/lib/item';
import { isPlaceableItem } from 'src/lib/item/placeableItem';
import { useDispatch } from 'src/redux/store';
import { onReturnKey } from 'src/lib/interactions/keyboard';
import { isWallItem } from 'src/lib/item/wallItem';
import { unselect } from 'src/redux/features/interactions/interactionsSlice';
import { removeItem, rotate, rotateCcw } from 'src/redux/features/items/itemsSlice';
import DeleteIcon from '@mui/icons-material/Delete';
import Rotate90DegreesCcwIcon from '@mui/icons-material/Rotate90DegreesCcw';
import Rotate90DegreesCwIcon from '@mui/icons-material/Rotate90DegreesCw';

// ----------------------------------------------------------------------

const BoxStyle = styled(CardActionArea)(({ theme }) => ({
  height: 72,
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  color: theme.palette.text.disabled,
  border: `solid 1px ${theme.palette.grey[500_12]}`,
  borderRadius: Number(theme.shape.borderRadius) * 1.25,
}));

// ----------------------------------------------------------------------

export default function ControlPanelTransform({ item }: { item: IItem }) {
  const dispatch = useDispatch();

  function deleteItem() {
    dispatch(removeItem(item.id));
    dispatch(unselect(item.id));
  }

  function rotateItemCcw() {
    dispatch(rotateCcw(item.id));
  }

  function rotateItemCw() {
    dispatch(rotate(item.id));
  }

  return (
    <Stack direction="row" spacing={2} justifyContent="space-between">
      <IconButton
        onClick={deleteItem}
        onKeyDown={onReturnKey(deleteItem)}
        aria-label="delete item"
        tabIndex={-1}
      >
        <DeleteIcon />
      </IconButton>
      {isWallItem(item) || !isPlaceableItem(item) ? null : (
        <>
          <IconButton
            onClick={rotateItemCcw}
            onKeyDown={onReturnKey(rotateItemCcw)}
            aria-label="rotate item"
            tabIndex={-1}
          >
            <Rotate90DegreesCcwIcon />
          </IconButton>
          <IconButton
            onClick={rotateItemCw}
            onKeyDown={onReturnKey(rotateItemCw)}
            aria-label="rotate item"
            tabIndex={-1}
          >
            <Rotate90DegreesCwIcon />
          </IconButton>
        </>
      )}
    </Stack>
  );
}
