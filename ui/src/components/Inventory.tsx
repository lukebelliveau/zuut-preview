import { useState } from 'react';
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
import { toggleSelect } from '../features/interactions/interactionsSlice';
import { handleDeleteOnKeyDown } from '../app/interactionHandlers';
import { Item } from '../lib/item';
import { onReturnKey } from '../lib/interactions/keyboard';

export default function Inventory() {
  const [hidden, setHidden] = useState(false);
  const className = hidden ? 'hidden' : undefined;
  const dispatch = useDispatch();
  const itemStates = useSelectAllItems();
  const selectedId = useAppSelector(selectSelectedItemId);
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
      dispatch(toggleSelect(item.id));
    } else if (selectedId === item.id) {
      handleDeleteOnKeyDown(e, store);
    }
  };

  return (
    <section ref={drop} id="inventory-list" className={className}>
      <h2>
        <button
          onClick={() => setHidden(!hidden)}
          onKeyDown={onReturnKey(() => { setHidden(!hidden); })}
        >
          Inventory
        </button>
      </h2>
      <div className="inventory-list-body">
        {items.length > 0 ? (
          <ul>
            {items.map((item) => (
              <li key={item.id}>
                <input type="checkbox" />
                <span
                  role="menuitem"
                  onClick={() => dispatch(toggleSelect(item.id))}
                  onKeyDown={(e) => handleItemKeyDown(e, item)}
                  tabIndex={0}
                  className={clsx({ selected: item.id === selectedId })}
                >
                  {item.name}
                </span>
              </li>
            ))}
          </ul>
        ) : (
          <p>Drag items from the Objects toolbox</p>
        )}
      </div>
    </section>
  );
}
