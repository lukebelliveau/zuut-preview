import { useDrag } from 'react-dnd';
import { Item } from '../../lib/objects/item';

type ShoppingListCandidateProps = {
  item: Item;
}

export default function ShoppingListCandidate({ item }: ShoppingListCandidateProps) {
  const [_, drag] = useDrag(() => ({
    type: 'Misc',
    item
  }));

  return <li key={item.name} ref={drag}>{item.name}</li>;
}