import { useState } from 'react';
import { useDrop } from 'react-dnd';
import { useSelectAllItems } from '../features/items/itemsSelectors';
import { useItemsAdapter } from '../lib/items/itemReduxAdapter';
import { BaseItem } from '../lib/items/itemTypes';

import { MISC_ITEM_TYPE } from '../lib/items/miscItem';

import './ShoppingList.css';

export default function ShoppingList() {
  const [hidden, setHidden] = useState(false);
  const className = hidden ? 'hidden' : undefined;
  const { addItem } = useItemsAdapter();

  const items = useSelectAllItems();

  const [_, drop] = useDrop(() => ({
    accept: MISC_ITEM_TYPE,
    drop: (item: BaseItem) => {
      addItem(item);
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
                {item.name}
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
