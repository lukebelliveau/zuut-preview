import { onReturnKey } from '../../lib/interactions/keyboard';
import { Item } from '../../lib/item';

import './ItemIcon.css';

type ItemIconProps = {
  dragRef?: any;
  item: Item;
  onClick?: (e: any) => void;
  onKeyboard?: () => void;
};

export default function ItemIcon({
  dragRef,
  item,
  onClick,
  onKeyboard,
}: ItemIconProps) {
  return (
    <button
      draggable={true}
      ref={dragRef}
      tabIndex={0}
      className="item-icon"
      onClick={onClick}
      onKeyUp={onKeyboard && onReturnKey(onKeyboard)}
    >
      {item.name}
    </button>
  );
}
