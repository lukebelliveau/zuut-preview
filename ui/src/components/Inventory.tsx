import { Fragment, useState } from 'react';
import { useDrop } from 'react-dnd';
import { useDispatch, useStore } from 'react-redux';
import { useAppSelector } from '../app/hooks';
import { selectSelectedItemId } from '../features/interactions/interactionsSelectors';
import clsx from 'clsx';

import { useSelectAllItems } from '../features/items/itemsSelectors';
import { addItem } from '../features/items/itemsSlice';
import ItemReduxAdapter from '../lib/item/itemReduxAdapter';
import MiscItem, { MISC_ITEM_TYPE } from '../lib/item/miscItem';

import './Inventory.css';
import {
  select,
  toggleSelect,
} from '../features/interactions/interactionsSlice';
import { handleDeleteOnKeyDown } from '../app/interactionHandlers';
import { Item } from '../lib/item';
import { onReturnKey } from '../lib/interactions/keyboard';
import { isModiferItem } from '../lib/item/modifierItem';
import { isPlaceableItem } from '../lib/item/placeableItem';
import { setVisibleLayer } from '../features/playgrounds/playgroundSlice';

export default function Inventory() {
  const [hidden, setHidden] = useState(false);
  const className = hidden ? 'hidden' : undefined;
  const dispatch = useDispatch();
  const itemStates = useSelectAllItems();
  const selectedIds = useAppSelector(selectSelectedItemId);
  const store = useStore();

  const items = ItemReduxAdapter.itemStatesToItemList(itemStates);

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
    dispatch(select(item.id));
    if (isPlaceableItem(item)) {
      dispatch(setVisibleLayer(item.layer));
    }
  };

  return (
    <section ref={drop} id="inventory-list" className={className}>
      <h2>
        <button
          onClick={() => setHidden(!hidden)}
          onKeyDown={onReturnKey(() => {
            setHidden(!hidden);
          })}
        >
          Inventory
        </button>
      </h2>
      <div className="inventory-list-body">
        {items.length > 0 ? (
          <ul>
            {items
              .filter((item) => !isModiferItem(item))
              .map((item) => {
                return (
                  <Fragment key={item.id}>
                    <li>
                      <input type="checkbox" />
                      <span
                        role="menuitem"
                        onClick={() => selectItemFromInventory(item)}
                        onKeyDown={(e) => handleItemKeyDown(e, item)}
                        tabIndex={0}
                        className={clsx({
                          selected: selectedIds.includes(item.id),
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
    </section>
  );
}
