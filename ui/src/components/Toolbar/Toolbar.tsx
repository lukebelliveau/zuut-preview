import { useDispatch } from 'react-redux';
import {
  undoItemAction,
  redoItemAction,
} from '../../features/items/itemsSlice';

import './Toolbar.css';
import {
  useSelectRedoStack,
  useSelectUndoStack,
} from '../../features/items/itemsSelectors';
import UndoIcon from './UndoIcon';
import RedoIcon from './RedoIcon';
import { toggleLayer } from '../../features/playgrounds/playgroundSlice';
import { useSelectPlayground } from '../../features/playgrounds/playgroundSelector';
import { Layer } from '../../lib/layer';

function Toolbar() {
  const dispatch = useDispatch();
  const playground = useSelectPlayground();

  const undo = () => {
    dispatch(undoItemAction());
  };

  const redo = () => {
    dispatch(redoItemAction());
  };

  function toggleSelectedLayer() {
    dispatch(toggleLayer());
  }

  const doIfEnter = (
    e: React.KeyboardEvent<HTMLElement>,
    callbackIfEnter: () => void
  ) => {
    if (e.key === 'Return' || e.key === 'Enter') {
      callbackIfEnter();
    }
  };

  const undoStack = useSelectUndoStack();
  const redoStack = useSelectRedoStack();

  return (
    <div id="toolbar">
      <button
        className='tool'
        tabIndex={0}
        onClick={undo}
        onKeyDown={(e) => doIfEnter(e, undo)}
        aria-label="undo"
        disabled={undoStack.length === 0}
      >
        <UndoIcon />
      </button>
      <button
        className='tool'
        tabIndex={0}
        onClick={redo}
        onKeyDown={(e) => doIfEnter(e, redo)}
        aria-label="redo"
        disabled={redoStack.length === 0}
      >
        <RedoIcon />
      </button>
      <button
        className={playground.showLayer === Layer.FLOOR ? 'primary' : 'secondary'}
        tabIndex={0}
        onClick={toggleSelectedLayer}
        onKeyDown={(e) => doIfEnter(e, toggleSelectedLayer)}
        aria-label="Floor plane"
      >
        Floor Plane
      </button>
      <button
        className={playground.showLayer === Layer.CEILING ? 'primary' : 'secondary'}
        tabIndex={0}
        onClick={toggleSelectedLayer}
        onKeyDown={(e) => doIfEnter(e, toggleSelectedLayer)}
        aria-label="Ceiling plane"
      >
        Ceiling Plane
      </button>
    </div>
  );
};

export default Toolbar;
