import { memo } from 'react';
// @mui
import { Stack } from '@mui/material';
//
import { NavSectionProps } from '../type';
import ItemList from './ItemList';
import DimensionsPopover from 'src/components/nav-section/horizontal/DimensionsPopover';
import Toolbar from './Toolbar';

// ----------------------------------------------------------------------

const hideScrollbar = {
  msOverflowStyle: 'none',
  scrollbarWidth: 'none',
  overflowY: 'scroll',
  '&::-webkit-scrollbar': {
    display: 'none',
  },
} as const;

function NavSectionHorizontal({ navConfig }: NavSectionProps) {
  return (
    <Stack>
      <Stack
        direction="row"
        justifyContent="center"
        id="horizontal-item-bar"
        sx={{ bgcolor: 'background.neutral', borderRadius: 1, px: 0.5 }}
      >
        <Stack direction="row" sx={{ ...hideScrollbar, py: 1 }}>
          {navConfig.map((group) => (
            <Stack key={group.subheader} direction="row" flexShrink={0}>
              {group.items.map((list) => (
                <ItemList
                  key={list.name + list.path}
                  data={list}
                  depth={1}
                  hasChildren={!!list.children}
                />
              ))}
              <DimensionsPopover />
            </Stack>
          ))}
        </Stack>
      </Stack>
      <Stack
        direction="row"
        justifyContent="center"
        id="horizontal-item-bar"
        sx={{ bgcolor: 'background.neutral', borderRadius: 1, px: 0.5 }}
      >
        <Stack direction="row" sx={{ ...hideScrollbar, py: 1 }}>
          <Toolbar />
        </Stack>
      </Stack>
    </Stack>
  );
}

export default memo(NavSectionHorizontal);
