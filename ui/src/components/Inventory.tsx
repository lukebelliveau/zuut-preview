import { Fragment, useState } from 'react';
import { useDrop } from 'react-dnd';
import { useDispatch, useStore } from 'react-redux';
import { useAppSelector } from '../app/hooks';
import { selectSelectedItemId } from '../features/interactions/interactionsSelectors';
import clsx from 'clsx';

import {
  useSelectAllItemIds,
  useSelectAllItems,
} from '../features/items/itemsSelectors';
import { addItem } from '../features/items/itemsSlice';
import ItemReduxAdapter from '../lib/item/itemReduxAdapter';
import MiscItem, { MISC_ITEM_TYPE } from '../lib/item/miscItem';

import './Inventory.css';
import {
  select,
  selectMany,
  selectOrDeselectAllIfSelected,
  setVisibleLayer,
  toggleSelect,
  unselect,
  unselectAll,
} from '../features/interactions/interactionsSlice';
import { handleDeleteOnKeyDown } from '../app/interactionHandlers';
import { Item } from '../lib/item';
import { isModiferItem } from '../lib/item/modifierItem';
import { isPlaceableItem } from '../lib/item/placeableItem';
import ControlPanel from './ControlPanel/ControlPanel';
import { isWallItem } from '../lib/item/wallItem';

export default function Inventory() {
  const [hidden, setHidden] = useState(false);
  const className = hidden ? 'hidden' : undefined;
  const dispatch = useDispatch();
  const itemStates = useSelectAllItems();
  const selectedIds = useAppSelector(selectSelectedItemId);
  const store = useStore();

  const items = ItemReduxAdapter.itemStatesToItemList(itemStates);
  const itemIds = useSelectAllItemIds();

  const [_, drop] = useDrop(() => ({
    accept: MISC_ITEM_TYPE,
    drop: (item: MiscItem) => {
      dispatch(addItem(ItemReduxAdapter.itemToState(item.copy())));
    },
  }));

  const handleItemKeyDown = (
    e: React.KeyboardEvent<HTMLSpanElement>,
    item: Item
  ) => {
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

  const setItemSelected = (checked: boolean, item: Item) => {
    if (checked) {
      dispatch(select(item.id));
    } else {
      dispatch(unselect(item.id));
    }
  };

  let selectButtonText = 'Select All';
  let selectButtonOnClick = selectAll;

  if (selectedIds.length === itemIds.length && selectedIds.length > 0) {
    selectButtonText = 'Deselect All';
    selectButtonOnClick = () => {
      dispatch(unselectAll());
    };
  }

  return (
    <div id="inventory-sidebar">
      <section ref={drop} id="inventory-list" className={className}>
        <div id="inventory-header">
          <h2>Inventory</h2>
          <div className="buttons">
            <button
              tabIndex={0}
              onClick={selectButtonOnClick}
              aria-label={selectButtonText}
              disabled={itemIds.length === 0}
            >
              {selectButtonText}
            </button>
          </div>
        </div>
        <div className="inventory-list-body">
          {items.length > 0 ? (
            <ul>
              {items
                .filter((item) => !isModiferItem(item) && !isWallItem(item))
                .map((item) => {
                  const selected = selectedIds.includes(item.id);
                  return (
                    <Fragment key={item.id}>
                      <li>
                        <input
                          type="checkbox"
                          checked={selected}
                          onChange={() => toggleItemSelected(item)}
                        />
                        <span
                          role="menuitem"
                          onClick={() => selectItemFromInventory(item)}
                          onKeyDown={(e) => handleItemKeyDown(e, item)}
                          tabIndex={0}
                          className={clsx({
                            selected,
                          })}
                        >
                          {item.name}
                        </span>
                      </li>
                      {isPlaceableItem(item)
                        ? Object.entries(item.modifiers).map(
                            ([modifierName, modifierIds]) => {
                              if (modifierIds.length > 0) {
                                return (
                                  <li key={modifierName}>
                                    <span
                                      role="menuitem"
                                      className="modifier-list-item"
                                    >
                                      {`${modifierName} (x${modifierIds.length})`}
                                    </span>
                                  </li>
                                );
                              } else return null;
                            }
                          )
                        : null}
                    </Fragment>
                  );
                })}
            </ul>
          ) : (
            <p>Drag items from the Objects toolbox</p>
          )}
        </div>
        {items.filter((item) => isWallItem(item)).length > 0 &&
        process.env.NODE_ENV === 'development' ? (
          <div className="layout-list-body">
            <span>
              <b>Layout</b>
            </span>
            <ul>
              {items
                .filter((item) => isWallItem(item))
                .map((item) => {
                  const selected = selectedIds.includes(item.id);
                  return (
                    <Fragment key={item.id}>
                      <li>
                        <input
                          type="checkbox"
                          checked={selected}
                          onClick={() => toggleItemSelected(item)}
                          onChange={(e) =>
                            setItemSelected(e.target.checked, item)
                          }
                        />
                        <span
                          role="menuitem"
                          onClick={() => selectItemFromInventory(item)}
                          onKeyDown={(e) => handleItemKeyDown(e, item)}
                          tabIndex={0}
                          className={clsx({
                            selected,
                          })}
                        >
                          {item.name}
                        </span>
                      </li>
                      {isPlaceableItem(item)
                        ? Object.entries(item.modifiers).map(
                            ([modifierName, modifierIds]) => {
                              if (modifierIds.length > 0) {
                                return (
                                  <li key={modifierName}>
                                    <span
                                      role="menuitem"
                                      className="modifier-list-item"
                                    >
                                      {`${modifierName} (x${modifierIds.length})`}
                                    </span>
                                  </li>
                                );
                              } else return null;
                            }
                          )
                        : null}
                    </Fragment>
                  );
                })}
            </ul>
          </div>
        ) : null}
      </section>
      <ControlPanel />
    </div>
  );
}
