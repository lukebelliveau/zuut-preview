import { useDispatch } from 'react-redux';

import DeleteIcon from '../../images/delete.svg';
import RotateIcon from '../../images/rotate.svg';

import { ItemImage } from './ItemImage';
import { unselect } from '../../features/interactions/interactionsSlice';
import { removeItem } from '../../features/items/itemsSlice';
import { ItemState } from '../../features/items/itemState';
import ItemReduxAdapter from '../../lib/item/itemReduxAdapter';
import { onReturnKey } from '../../lib/interactions/keyboard';

export function ItemControls({ item: itemState }: { item?: ItemState }) {
  const dispatch = useDispatch();
  if (!itemState) return null;

  const item = ItemReduxAdapter.stateToItem(itemState);

  function deleteItem() {
    dispatch(removeItem(item.id));
    dispatch(unselect(item.id));
  }

  function rotateItem() {}

  return (
    <div className="control-panel-body">
      <div className="control-panel-section">
        <h4>Description</h4>
        <div className="item-description">
          <ItemImage item={item} />
          <div>
            <h3>{item.name}</h3>
            <p>Lorem ipsum product details and description body</p>
          </div>
        </div>
      </div>
      <div className="control-panel-section transform">
        <h4>Transform</h4>
        <button
          onClick={deleteItem}
          onKeyDown={onReturnKey(deleteItem)}
          aria-label="delete item"
          tabIndex={-1}
        >
          <img src={DeleteIcon} alt="delete item" />
        </button>
        <button
          onClick={rotateItem}
          onKeyDown={onReturnKey(rotateItem)}
          aria-label="rotate item"
          tabIndex={-1}
        >
          <img src={RotateIcon} alt="rotate item" />
        </button>
      </div>
    </div>
  );
}
