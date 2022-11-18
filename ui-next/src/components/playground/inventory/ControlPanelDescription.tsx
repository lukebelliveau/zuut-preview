// @mui
import { Stack, Typography, Box } from '@mui/material';

import Image from 'src/components/image';
import { IItem } from 'src/lib/item';
import { isPlaceableItem } from 'src/lib/item/placeableItem';

// ----------------------------------------------------------------------

export default function ControlPanelDescription({ item }: { item: IItem }) {
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
