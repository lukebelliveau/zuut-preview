import { useDispatch } from 'react-redux';

import DeleteIcon from '../../images/delete.svg';
import RotateIcon from '../../images/rotate.svg';
import MinusIcon from '../../images/glyphs/minus.svg';
import PlusIcon from '../../images/glyphs/plus.svg';

import { ItemImage } from './ItemImage';
import { unselect } from '../../features/interactions/interactionsSlice';
import {
  incrementModifier as incrementModifierThunk,
  decrementModifier as decrementModifierThunk,
  removeItem,
  rotate,
} from '../../features/items/itemsSlice';
import { ItemState } from '../../features/items/itemState';
import ItemReduxAdapter from '../../lib/item/itemReduxAdapter';
import { onReturnKey } from '../../lib/interactions/keyboard';
import PlaceableItem from '../../lib/item/placeableItem';
import { isWallItem } from '../../lib/item/wallItem';

export function ItemControls({ itemState }: { itemState?: ItemState }) {
  const dispatch = useDispatch();
  if (!itemState) return null;

  const item = ItemReduxAdapter.stateToItem(itemState) as PlaceableItem;

  function deleteItem() {
    dispatch(removeItem(item.id));
    dispatch(unselect(item.id));
  }

  function rotateItem() {
    dispatch(rotate(item.id));
  }

  return (
    <div className="control-panel-body">
      <div className="control-panel-section">
        <h4>Description</h4>
        <div className="item-description">
          <ItemImage item={item} />
          <div>
            <h3>{item.name}</h3>
            {/* <p>{item.description}</p> */}
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
        {isWallItem(item) ? null : (
          <button
            onClick={rotateItem}
            onKeyDown={onReturnKey(rotateItem)}
            aria-label="rotate item"
            tabIndex={-1}
          >
            <img src={RotateIcon} alt="rotate item" />
          </button>
        )}
      </div>
      <ModifierControls item={item} />
    </div>
  );
}

const ModifierControls = ({ item }: { item: PlaceableItem }) => {
  const dispatch = useDispatch();
  if (!item || !item.modifiers) return null;

  function decrementModifier(modifierName: string) {
    dispatch(decrementModifierThunk({ itemId: item.id, modifierName }));
  }

  function incrementModifier(modifierName: string) {
    dispatch(incrementModifierThunk({ itemId: item.id, modifierName }));
  }
  if (Object.keys(item.modifiers).length === 0) return null;

  return (
    <div className="control-panel-section">
      <h4>Quick adds</h4>
      {Object.keys(item.modifiers).map((modifierName) => {
        return (
          <div className="modifier-row" key={modifierName}>
            <span title={modifierName}>{modifierName}</span>
            <div className="modifier-buttons">
              <button
                onClick={() => decrementModifier(modifierName)}
                aria-label={`decrement ${modifierName}`}
                tabIndex={0}
              >
                <img src={MinusIcon} alt={`decrement ${modifierName}`} />
              </button>
              {item.modifiers ? item.modifiers[modifierName].length : null}
              <button
                onClick={() => incrementModifier(modifierName)}
                aria-label={`increment ${modifierName}`}
                tabIndex={0}
              >
                <img src={PlusIcon} alt={`increment ${modifierName}`} />
              </button>
            </div>
          </div>
        );
      })}
    </div>
  );
};
