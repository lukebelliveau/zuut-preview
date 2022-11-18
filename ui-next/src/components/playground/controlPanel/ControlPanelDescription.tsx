// @mui
import { styled } from '@mui/material/styles';
import {
  Grid,
  RadioGroup,
  CardActionArea,
  Stack,
  Typography,
  Box,
} from '@mui/material';
// hooks
import useSettings from '../../../hooks/useSettings';
//
import Iconify from '../../iconify';
import BoxMask from './BoxMask';
import Image from 'src/components/image';
import { IItem } from 'src/lib/item';
import { isPlaceableItem } from 'src/lib/item/placeableItem';

// ----------------------------------------------------------------------

const BoxStyle = styled(CardActionArea)(({ theme }) => ({
  height: 72,
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  color: theme.palette.text.disabled,
  border: `solid 1px ${theme.palette.grey[500]}`,
  borderRadius: Number(theme.shape.borderRadius) * 1.25,
}));

// ----------------------------------------------------------------------

export default function ControlPanelDescription({ item }: { item: IItem }) {
  const { themeMode, onChangeMode } = useSettings();
  if (!isPlaceableItem(item)) {
    return null;
  }

  return (
    <Stack direction="row" spacing={2} justifyContent="space-between">
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'flex-start',
          width: '25%',
        }}
      >
        <Image src={item.image.src} maxHeight={48} />
      </Box>
      <Typography variant="body2" sx={{ textAlign: 'right', fontSize: 12 }}>
        {item.description}
      </Typography>
    </Stack>
  );
}
