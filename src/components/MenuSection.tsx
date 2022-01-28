import { useState } from 'react';

import { Item } from '../lib/objects/item';
import ShoppingListCandidate from './MenuSection/ShoppingListCandidate';

export interface IItemGroup {
  itemGroup: string,
  items: Item[]
}

export const MenuSection = ({ itemGroup, items }: IItemGroup) => {
  const [open, setOpen] = useState(true);

  // Fix CSS for accordion panels
  return (
    <div className={`accordion_item ${open ? 'active' : ''}`}>
      <div>
        <button className="button" onClick={() => setOpen(!open)}>
          {itemGroup}
          {/* Change to caret icons using Semantic UI */}
          <span className="control">{open ? '   -' : '   +' } </span>
        </button>
      </div>
      {/* Replace item strings with dynamic icons */}
      <div className={`items_wrapper ${open ? 'open' : ''}`}>
        <ul className="items">
          {items.map(item => <ShoppingListCandidate key={item.name} item={item} />)}
        </ul>
      </div>
    </div>
  );
};

