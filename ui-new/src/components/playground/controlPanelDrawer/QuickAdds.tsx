// @mui
import { styled } from '@mui/material/styles';
import {
  Grid,
  RadioGroup,
  CardActionArea,
  Stack,
  Typography,
  IconButton,
  List,
  ListItem,
} from '@mui/material';

import PlaceableItem, { isPlaceableItem } from 'src/lib/item/placeableItem';
import { useDispatch } from 'src/redux/store';
import RemoveIcon from '@mui/icons-material/Remove';
import AddIcon from '@mui/icons-material/Add';
import {
  incrementModifier as incrementModifierThunk,
  decrementModifier as decrementModifierThunk,
} from 'src/redux/features/items/itemsSlice';

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
const StyledTypography = styled(Typography)({
  fontSize: 12,
});

export default function QuickAdds({ item }: { item: PlaceableItem }) {
  const dispatch = useDispatch();
  if (!isPlaceableItem(item)) {
    return null;
  }

  function decrementModifier(modifierName: string) {
    dispatch(decrementModifierThunk({ itemId: item.id, modifierName }));
  }

  function incrementModifier(modifierName: string) {
    dispatch(incrementModifierThunk({ itemId: item.id, modifierName }));
  }

  if (Object.keys(item.modifiers).length === 0) return null;
  if (!item || !item.modifiers) return null;

  return (
    <List disablePadding>
      {Object.keys(item.modifiers).map((modifierName) => {
        return (
          <ListItem key={item.id}>
            <Stack
              direction="row"
              alignItems="center"
              sx={{ justifyContent: 'space-between', width: '100%' }}
            >
              <StyledTypography textAlign="left">{modifierName}</StyledTypography>
              <Stack direction="row" alignItems="center">
                <IconButton
                  onClick={() => decrementModifier(modifierName)}
                  aria-label={`decrement ${modifierName}`}
                >
                  <RemoveIcon sx={{ height: '10px' }} />
                </IconButton>
                <StyledTypography>
                  {item.modifiers ? item.modifiers[modifierName].length : 0}
                </StyledTypography>
                <IconButton
                  onClick={() => incrementModifier(modifierName)}
                  aria-label={`increment ${modifierName}`}
                >
                  <AddIcon sx={{ height: '10px' }} />
                </IconButton>
              </Stack>
            </Stack>
          </ListItem>
        );
      })}
    </List>
  );
}
