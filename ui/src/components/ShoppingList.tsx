import { useState } from 'react';
import { useDrop } from 'react-dnd';
import { useDispatch } from 'react-redux';
import { useAppSelector } from '../app/hooks';
import { selectSelectedItemId } from '../features/interactions/interactionsSelectors';
import clsx from 'clsx';

import { useSelectAllItems } from '../features/items/itemsSelectors';
import { addOne } from '../features/items/itemsSlice';
import ItemReduxAdapter from '../lib/item/itemReduxAdapter';
import MiscItem, { MISC_ITEM_TYPE } from '../lib/item/miscItem';

import './ShoppingList.css';
import { toggleSelect } from '../features/interactions/interactionsSlice';

export default function ShoppingList() {
  const [hidden, setHidden] = useState(false);
  const className = hidden ? 'hidden' : undefined;
  const dispatch = useDispatch();
  const itemStates = useSelectAllItems();
  const selectedId = useAppSelector(selectSelectedItemId);

  const items = ItemReduxAdapter.itemStatesToItemList(itemStates);

  const [_, drop] = useDrop(() => ({
    accept: MISC_ITEM_TYPE,
    drop: (item: MiscItem) => {
      dispatch(addOne(ItemReduxAdapter.itemToState(item.copy())));
    },
  }));

  return (
    <section ref={drop} id="shopping-list" className={className}>
      <h2>
        <button
          onClick={() => setHidden(!hidden)}
          onKeyDown={(e) => {
            if (e.key === 'Return') setHidden(!hidden);
          }}
        >
          Shopping List
        </button>
      </h2>
      <div className="shopping-list-body">
        {items.length > 0 ? (
          <ul>
            {items.map((item) => (
              <li key={item.id}>
                <input type="checkbox" />
                <span
                  role="menuitem"
                  onClick={() => dispatch(toggleSelect(item.id))}
                  onKeyDown={(e) => {
                    if (e.key === 'Enter') {
                      dispatch(toggleSelect(item.id));
                    }
                  }}
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
