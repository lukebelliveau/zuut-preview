import { useState } from 'react';
import { useDrop } from 'react-dnd';
import { useSelector } from 'react-redux';

import MiscItem from '../lib/items/miscItem';
import ShoppingListRepository from '../lib/shoppingList/shoppingListRepository';

import './ShoppingList.css';


export default function ShoppingList() {
  const [hidden, setHidden] = useState(false);
  const className = hidden ? 'hidden' : undefined;
  const shoppingListRepo = ShoppingListRepository.forReduxSelector(useSelector);
  const shoppingListItems = shoppingListRepo.all();

  const [_, drop] = useDrop(() => ({
    accept: 'Misc',
    drop: (item: MiscItem) => {
      const repo = ShoppingListRepository.forRedux();
      repo.create(item);
    }
  }));

  return <section ref={drop} id="shopping-list" className={className}>
    <h2>
      <button onClick={() => setHidden(!hidden)} onKeyDown={(e) => { if (e.key === 'Return') setHidden(!hidden); }}>
        Shopping List
      </button>
    </h2>
    <div className="shopping-list-body">
      {shoppingListItems.length > 0 ?
        <ul>
          {shoppingListItems.map(item => (
            <li key={item.name}>
              <input type="checkbox" />
              {item.name}
            </li>
          ))}
        </ul>
        : <p>Drag items from the Objects toolbox</p>
      }
    </div>
  </section>;
}
