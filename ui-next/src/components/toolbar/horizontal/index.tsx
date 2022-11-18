import { memo } from 'react';
// @mui
import { Divider, Stack } from '@mui/material';
import ItemList from './ItemList';
import DimensionsPopover from 'src/components/toolbar/horizontal/DimensionsPopover';
import EditPopover from './EditPopover';
import {
  ICONS,
  useQueryClimateItems,
  useQueryLightItems,
  useQueryMiscItems,
  useQueryPotItems,
  useQueryTentItems,
  useQueryWaterItems,
} from 'src/layouts/playground/toolbar/NavConfig';
import DropdownPlaceholder from './DropdownPlaceholder';

// ----------------------------------------------------------------------

const hideScrollbar = {
  msOverflowStyle: 'none',
  scrollbarWidth: 'none',
  overflowY: 'scroll',
  '&::-webkit-scrollbar': {
    display: 'none',
  },
} as const;

const TentItems = () => {
  const { isLoading, isError, data: potItems, error } = useQueryTentItems();

  if (isLoading) {
    return <DropdownPlaceholder label="Tents" icon={ICONS.tent} />;
  }

  if (isError) {
    // console.error(error);
    return <span>Error loading items!</span>;
  }

  return (
    <Stack direction="row" flexShrink={0} justifyContent="flex-start">
      <ItemList
        key={potItems.name + potItems.path}
        data={potItems}
        depth={1}
        hasChildren={!!potItems.children}
      />
    </Stack>
  );
};

const PotItems = () => {
  const { isLoading, isError, data: potItems, error } = useQueryPotItems();

  if (isLoading) {
    return <DropdownPlaceholder label="Pots" icon={ICONS.pot} />;
  }

  if (isError) {
    return <span>Error loading items!</span>;
  }

  return (
    <Stack direction="row" flexShrink={0} justifyContent="flex-start">
      <ItemList
        key={potItems.name + potItems.path}
        data={potItems}
        depth={1}
        hasChildren={!!potItems.children}
      />
    </Stack>
  );
};

const LightItems = () => {
  const { isLoading, isError, data: lightItems, error } = useQueryLightItems();

  if (isLoading) {
    return <DropdownPlaceholder label="Lights" icon={ICONS.light} />;
  }

  if (isError) {
    return <span>Error loading items!</span>;
  }

  return (
    <Stack direction="row" flexShrink={0} justifyContent="flex-start">
      <ItemList
        key={lightItems.name + lightItems.path}
        data={lightItems}
        depth={1}
        hasChildren={!!lightItems.children}
      />
    </Stack>
  );
};

const ClimateItems = () => {
  const { isLoading, isError, data: lightItems } = useQueryClimateItems();

  if (isLoading) {
    return <DropdownPlaceholder label="Climate" icon={ICONS.climate} />;
  }

  if (isError) {
    return <span>Error loading items!</span>;
  }

  return (
    <Stack direction="row" flexShrink={0} justifyContent="flex-start">
      <ItemList
        key={lightItems.name + lightItems.path}
        data={lightItems}
        depth={1}
        hasChildren={!!lightItems.children}
      />
    </Stack>
  );
};

const WaterItems = () => {
  const { isLoading, isError, data: waterItems } = useQueryWaterItems();

  if (isLoading) {
    return <DropdownPlaceholder label="Water" icon={ICONS.water} />;
  }

  if (isError) {
    return <span>Error loading items!</span>;
  }

  return (
    <Stack direction="row" flexShrink={0} justifyContent="flex-start">
      <ItemList
        key={waterItems.name + waterItems.path}
        data={waterItems}
        depth={1}
        hasChildren={!!waterItems.children}
      />
    </Stack>
  );
};

const MiscItems = () => {
  const { isLoading, isError, data: miscItems, error } = useQueryMiscItems();

  if (isLoading) {
    return <DropdownPlaceholder label="Misc" icon={ICONS.misc} />;
  }

  if (isError) {
    return <span>Error loading items!</span>;
  }

  return (
    <Stack direction="row" flexShrink={0} justifyContent="flex-start">
      <ItemList
        key={miscItems.name + miscItems.path}
        data={miscItems}
        depth={1}
        hasChildren={!!miscItems.children}
      />
    </Stack>
  );
};

function NavSectionHorizontal() {
  return (
    <Stack>
      <Stack
        direction="row"
        sx={{
          bgcolor: 'background.neutral',
          // borderRadius: 1,
          borderRadius: '8px 0px 0px 8px',
          px: 0.5,
          paddingRight: 0,
        }}
        id="horizontal-toolbar"
        justifyContent="space-around"
      >
        <Stack direction="row" sx={{ ...hideScrollbar, py: 1 }} width="100%">
          <Stack direction="row" flexShrink={0} justifyContent="flex-start">
            <TentItems />
            <PotItems />
            <LightItems />
            <ClimateItems />
            <WaterItems />
            <MiscItems />
          </Stack>

          <Divider orientation="vertical" />
          <Stack
            direction="row"
            flexShrink={0}
            flexGrow={1}
            justifyContent="flex-start"
          >
            <DimensionsPopover />
            <EditPopover />
          </Stack>
        </Stack>
      </Stack>
    </Stack>
  );
}

export default memo(NavSectionHorizontal);
