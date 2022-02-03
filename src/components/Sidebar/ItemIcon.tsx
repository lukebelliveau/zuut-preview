import { Item } from '../../lib/item';

import './ItemIcon.css';

type ItemIconProps = {
  dragRef?: any;
  item: Item;
  onClick?: (e: any) => void;
  onKeyboard?: () => void;
}

export default function ItemIcon({ dragRef, item, onClick, onKeyboard }: ItemIconProps) {

  function onEnterOrReturn(e: any): void {
    if (onKeyboard && (e.key === 'Return' || e.key === 'Enter')) onKeyboard();
  }

  return <div draggable={true} ref={dragRef} role="button" tabIndex={0} className="item-icon" onClick={onClick} onKeyUp={onEnterOrReturn}>
    {item.name}
  </div>;
}