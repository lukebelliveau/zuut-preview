import { AnimatePresence, m } from 'framer-motion';
import { useState } from 'react';
// @mui
import { alpha, styled } from '@mui/material/styles';
import {
  Stack,
  Divider,
  Typography,
  IconButton,
  List,
  ListItem,
  Checkbox,
  Button,
} from '@mui/material';

import { Link as RouterLink } from 'react-router-dom';

// utils
import cssStyles from '../../../utils/cssStyles';
// config
import { NAVBAR, HEADER } from '../../../config';
import Iconify from '../../Iconify';
import Scrollbar from '../../Scrollbar';
import { varFade } from '../../animate';
import AnimatedToggleButton from './ToggleButton';
import { AppStore, useDispatch } from 'src/redux/store';
import { selectSelectedItemId } from 'src/redux/features/interactions/interactionsSelectors';
import { useSelectAllItemIds, useSelectAllItems } from 'src/redux/features/items/itemsSelectors';
import ItemReduxAdapter from 'src/lib/item/itemReduxAdapter';
import useAppSelector from 'src/hooks/useAppSelector';
import { isPlaceableItem } from 'src/lib/item/placeableItem';
import { shoppingCartUrlWithRecordIds } from 'src/lib/url';
import {
  selectOrDeselectAllIfSelected,
  setVisibleLayer,
  selectMany,
  toggleSelect,
  select,
  unselect,
  unselectAll,
} from 'src/redux/features/interactions/interactionsSlice';
import { handleDeleteOnKeyDown } from 'src/utils/interactionHandlers';
import { useStore } from 'react-redux';
import { IItem, Item } from 'src/lib/item';
import RemoveDoneIcon from '@mui/icons-material/RemoveDone';
import DoneAllIcon from '@mui/icons-material/DoneAll';
import Select from 'src/theme/overrides/Select';
import { useTheme } from '@mui/system';
import { isWallItem } from 'src/lib/item/wallItem';
import { isModifierItem } from 'src/lib/item/modifierItem';

// ----------------------------------------------------------------------

const INVENTORY_TOP = 40;
const INVENTORY_HEADER_HEIGHT = 60;
export const INVENTORY_HEADER_BOTTOM = INVENTORY_TOP + INVENTORY_HEADER_HEIGHT;

const RootStyle = styled(m.div)(({ theme }) => ({
  ...cssStyles(theme).bgBlur({ color: theme.palette.background.paper, opacity: 0.92 }),
  top: INVENTORY_TOP,
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

export default function InventoryDrawer() {
  const [open, setOpen] = useState(true);

  const dispatch = useDispatch();
  const itemStates = useSelectAllItems();
  const selectedIds = useAppSelector(selectSelectedItemId);
  const store = useStore() as AppStore;
  const theme = useTheme();

  const items = ItemReduxAdapter.itemStatesToItemList(itemStates);
  const itemIds = useSelectAllItemIds();

  const handleItemKeyDown = (e: React.KeyboardEvent<HTMLSpanElement>, item: Item) => {
    if (e.key === 'Enter' || e.key === 'Return') {
      selectItemFromInventory(item);
    } else if (selectedIds.includes(item.id)) {
      handleDeleteOnKeyDown(e, store);
    }
  };

  const selectItemFromInventory = (item: Item) => {
    dispatch(selectOrDeselectAllIfSelected(item.id));
    if (isPlaceableItem(item)) {
      dispatch(setVisibleLayer(item.layer));
    }
  };

  const selectAll = () => {
    dispatch(selectMany(itemIds.map((id) => id.toString())));
  };

  const toggleItemSelected = (item: Item) => {
    dispatch(toggleSelect(item.id));
  };

  let SelectButtonIcon = DoneAllIcon;
  let selectButtonOnClick = selectAll;

  const allItemsSelected = selectedIds.length === itemIds.length && selectedIds.length > 0;

  if (allItemsSelected) {
    SelectButtonIcon = RemoveDoneIcon;
    selectButtonOnClick = () => {
      dispatch(unselectAll());
    };
  }

  const shoppingCartUrl = shoppingCartUrlWithRecordIds(items);

  const varSidebar = varFade({
    distance: NAVBAR.BASE_WIDTH,
    durationIn: 0.32,
    durationOut: 0.32,
  }).inRight;

  const handleToggle = () => {
    setOpen((prev) => !prev);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <RootStyle {...varSidebar}>
      <Stack>
        <Stack
          direction="row"
          alignItems="center"
          justifyContent="space-between"
          sx={{ py: 2, pr: 1, pl: 2.5, height: INVENTORY_HEADER_HEIGHT }}
        >
          <IconButton onClick={selectButtonOnClick} disabled={items.length < 1}>
            <SelectButtonIcon
              sx={{
                color: allItemsSelected ? 'default' : theme.palette.primary.main,
              }}
            />
          </IconButton>
          <Typography variant="subtitle1" sx={{ flexGrow: 1, textAlign: 'center' }}>
            Inventory
          </Typography>

          {/* <IconButton onClick={handleClose}>
        <Iconify icon={'eva:close-fill'} width={20} height={20} />
      </IconButton> */}

          {/* hacky spacer to center Inventory title */}
          <IconButton>
            <DoneAllIcon sx={{ visibility: 'hidden' }} />
          </IconButton>
        </Stack>
        <Button
          sx={{ py: 2, pr: 1, pl: 2.5 }}
          component={RouterLink}
          to={shoppingCartUrl}
          target="_blank"
          rel="noopener noreferrer"
          disabled={items.length < 1}
        >
          Open Shopping Cart
        </Button>
      </Stack>

      <Divider sx={{ borderStyle: 'dashed' }} />

      <Scrollbar sx={{ flexGrow: 1 }}>
        <List>
          {items
            .filter((item) => !isModifierItem(item) && !isWallItem(item))
            .map((item) => {
              return (
                <InventoryItem
                  key={item.id}
                  item={item}
                  selectedIds={selectedIds}
                  toggleItemSelected={toggleItemSelected}
                  handleItemKeyDown={handleItemKeyDown}
                  selectItemFromInventory={selectItemFromInventory}
                />
              );
            })}
        </List>
      </Scrollbar>
    </RootStyle>
  );

  // return (
  //   <>
  //     {/* {<AnimatedToggleButton open={open} onToggle={handleToggle} />} */}

  //     <AnimatePresence>
  //       {true && (
  //         <>
  //           (
  //           <RootStyle {...varSidebar}>
  //             <Stack>
  //               <Stack
  //                 direction="row"
  //                 alignItems="center"
  //                 justifyContent="space-between"
  //                 sx={{ py: 2, pr: 1, pl: 2.5, height: INVENTORY_HEADER_HEIGHT }}
  //               >
  //                 <IconButton onClick={selectButtonOnClick} disabled={items.length < 1}>
  //                   <SelectButtonIcon
  //                     sx={{
  //                       color: allItemsSelected ? 'default' : theme.palette.primary.main,
  //                     }}
  //                   />
  //                 </IconButton>
  //                 <Typography variant="subtitle1" sx={{ flexGrow: 1, textAlign: 'center' }}>
  //                   Inventory
  //                 </Typography>

  //                 {/* <IconButton onClick={handleClose}>
  //                   <Iconify icon={'eva:close-fill'} width={20} height={20} />
  //                 </IconButton> */}

  //                 {/* hacky spacer to center Inventory title */}
  //                 <IconButton>
  //                   <DoneAllIcon sx={{ visibility: 'hidden' }} />
  //                 </IconButton>
  //               </Stack>
  //               <Button
  //                 sx={{ py: 2, pr: 1, pl: 2.5 }}
  //                 component={RouterLink}
  //                 to={shoppingCartUrl}
  //                 target="_blank"
  //                 rel="noopener noreferrer"
  //                 disabled={items.length < 1}
  //               >
  //                 Open Shopping Cart
  //               </Button>
  //             </Stack>

  //             <Divider sx={{ borderStyle: 'dashed' }} />

  //             <Scrollbar sx={{ flexGrow: 1 }}>
  //               <List>
  //                 {items
  //                   .filter((item) => !isModifierItem(item) && !isWallItem(item))
  //                   .map((item) => {
  //                     return (
  //                       <InventoryItem
  //                         key={item.id}
  //                         item={item}
  //                         selectedIds={selectedIds}
  //                         toggleItemSelected={toggleItemSelected}
  //                         handleItemKeyDown={handleItemKeyDown}
  //                         selectItemFromInventory={selectItemFromInventory}
  //                       />
  //                     );
  //                   })}
  //               </List>
  //             </Scrollbar>
  //           </RootStyle>
  //           )
  //         </>
  //       )}
  //     </AnimatePresence>
  //   </>
  // );
}

const InventoryItem = ({
  item,
  selectedIds,
  toggleItemSelected,
  selectItemFromInventory,
  handleItemKeyDown,
}: {
  item: IItem;
  selectedIds: string[];
  toggleItemSelected: (item: IItem) => void;
  selectItemFromInventory: (item: IItem) => void;
  handleItemKeyDown: (e: React.KeyboardEvent<HTMLSpanElement>, item: Item) => void;
}) => {
  const selected = selectedIds.includes(item.id);
  return (
    <>
      <ListItem>
        <Checkbox
          aria-label={item.name}
          checked={selected}
          onChange={() => toggleItemSelected(item)}
        />
        <Typography
          sx={{
            fontWeight: selected ? 'bold' : 'default',
            cursor: 'pointer',
          }}
          onKeyDown={(e) => handleItemKeyDown(e, item)}
          onClick={() => selectItemFromInventory(item)}
        >
          {item.name}
        </Typography>
      </ListItem>
      {isPlaceableItem(item)
        ? Object.entries(item.modifiers).map(([modifierName, modifierIds]) => {
            if (modifierIds.length > 0) {
              return (
                <ListItem
                  key={modifierName}
                  sx={{
                    // display: 'flex',
                    // justifyContent: 'flex-end',
                    marginLeft: '42px',
                  }}
                >
                  <Typography role="menuitem">
                    {`${modifierName} (x${modifierIds.length})`}
                  </Typography>
                </ListItem>
              );
            } else return null;
          })
        : null}
    </>
  );
};
