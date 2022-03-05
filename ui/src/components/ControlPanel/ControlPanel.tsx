import { KeyboardEventHandler, useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { useAppSelector } from '../../app/hooks';
import { selectSelectedItemId } from '../../features/interactions/interactionsSelectors';
import { useSelectItemById } from '../../features/items/itemsSelectors';
import { ItemState } from '../../features/items/itemState';
import { isPlaceableItem, Item } from '../../lib/item';
import ItemReduxAdapter from '../../lib/item/itemReduxAdapter';
import './ControlPanel.css';
import RectangleImage from '../../images/items/rectangle.svg';
import DeleteIcon from '../../images/delete.png';
import { removeItem } from '../../features/items/itemsSlice';
import { unselect } from '../../features/interactions/interactionsSlice';

type ControlPanelState = 'show' | 'hide' | 'minimize';

const ControlPanel = () => {
  const selectedItemId = useAppSelector(selectSelectedItemId);
  const item = useSelectItemById(selectedItemId);
  const [controlPanelState, setControlPanelState] = useState<ControlPanelState>(
    item ? 'show' : 'hide'
  );

  useEffect(() => {
    if (item) {
      setControlPanelState('show');
    } else {
      setControlPanelState('hide');
    }
  }, [item]);

  const toggleDisplayControlPanel = () => {
    if (item) {
      if (controlPanelState === 'show') {
        setControlPanelState('minimize');
      } else {
        setControlPanelState('show');
      }
    } else {
      setControlPanelState('hide');
    }
  };

  const handleKeyDown: KeyboardEventHandler<HTMLButtonElement> = (e) => {
    if (e.key === 'Return' || e.key === 'Enter') {
      toggleDisplayControlPanel();
    }
  };

  return (
    <div id="control-panel" className={controlPanelState}>
      <h2>
        <button onClick={toggleDisplayControlPanel} onKeyDown={handleKeyDown}>
          Control Panel
        </button>
      </h2>
      {controlPanelState === 'show' ? <ItemControls item={item} /> : null}
    </div>
  );
};

const ItemControls = ({ item: itemState }: { item?: ItemState }) => {
  const dispatch = useDispatch();
  if (!itemState) return null;

  const item = ItemReduxAdapter.stateToItem(itemState);

  const deleteItem = () => {
    dispatch(removeItem(item.id));
    dispatch(unselect());
  };

  const handleKeyDownDeleteItem: KeyboardEventHandler<HTMLButtonElement> = (
    e
  ) => {
    if (e.key === 'Return' || e.key === 'Enter') {
      dispatch(removeItem(item.id));
    }
  };

  return (
    <>
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
            className="delete-button"
            onClick={deleteItem}
            onKeyDown={handleKeyDownDeleteItem}
            aria-label="delete item"
          >
            <img src={DeleteIcon} alt="delete item" />
          </button>
        </div>
      </div>
    </>
  );
};

const ItemImage = ({ item }: { item: Item }) => {
  if (isPlaceableItem(item)) {
    return <img src={item.image} alt={item.name} />;
  } else {
    return <img src={RectangleImage} alt={item.name} />;
  }
};

export default ControlPanel;
