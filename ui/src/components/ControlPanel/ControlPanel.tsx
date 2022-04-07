import { useEffect, useState } from 'react';

import './ControlPanel.css';

import { useAppSelector } from '../../app/hooks';
import { selectSelectedItemId } from '../../features/interactions/interactionsSelectors';
import { useSelectItemById } from '../../features/items/itemsSelectors';
import { onReturnKey } from '../../lib/interactions/keyboard';
import { ItemControls } from './ItemControls';

type ControlPanelState = 'show' | 'hide' | 'minimize';

const ControlPanel = () => {
  const selectedItemIds = useAppSelector(selectSelectedItemId);
  const item = useSelectItemById(
    selectedItemIds.length === 1 ? selectedItemIds[0] : undefined
  );
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

  return (
    <div id="control-panel" className={controlPanelState}>
      <h2>
        <button
          onClick={toggleDisplayControlPanel}
          onKeyDown={onReturnKey(toggleDisplayControlPanel)}
        >
          Control Panel
        </button>
      </h2>
      {controlPanelState === 'show' ? <ItemControls itemState={item} /> : null}
    </div>
  );
};

export default ControlPanel;
