/* eslint-disable jsx-a11y/click-events-have-key-events */
import { useState } from 'react';
import { useSelector } from 'react-redux';

import PlaygroundRepository from '../../lib/playground/playgroundRepository';
import ShoppingListCandidate from './ShoppingListCandidate';
import MiscItem from '../../lib/items/miscItem';
import { IItemGroup } from '../../lib/itemsLibrary';

// TODO: Remove the eslint disablers and make accessible!

export default function MenuSection({ itemGroup, items }: IItemGroup) {
  const [open, setOpen] = useState(true);
  const playgroundRepo = PlaygroundRepository.forReduxSelector(useSelector);
  const playground = playgroundRepo.select();

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
          {items.map(item => 
          // TODO: Combine playground and shoppinglist select/drag-n-drop
          // eslint-disable-next-line jsx-a11y/no-static-element-interactions
          <div onClick={() =>
            { const repo = PlaygroundRepository.forRedux();
              item.setStartingXPosition((playground.plan?.room?.width || 0)/2);
              item.setStartingYPosition((playground.plan?.room?.length || 0)/2);
              playground.items = playground.items.concat(item);
              repo.addItem(playground);}
          }>
            <ShoppingListCandidate key={item.name} item={item} />
          </div>)}
        </ul>
      </div>
    </div>
  );
};

