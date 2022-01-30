import React from 'react';
import { useDrag } from 'react-dnd';

import { Item } from '../../lib/items/item';

type ShoppingListCandidateProps = {
  item: Item;
}

export default function ShoppingListCandidate({ item }: ShoppingListCandidateProps) {
  const [_, drag] = useDrag(() => ({
    type: 'Misc',
    item
  }));

  function sendToShoppingList() {
    
  }
  function onKeyboard(e: any): void {
    if (e.key === 'Return') sendToShoppingList();
  }

  return <div key={item.name} ref={drag} tabIndex={0} role="button" onClick={sendToShoppingList} onKeyUp={onKeyboard}>{item.name}</div>;
}