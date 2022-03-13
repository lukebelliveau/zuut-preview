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

const Toolbar = () => {
  const dispatch = useDispatch();

  const undo = () => {
    dispatch(undoItemAction());
  };

  const redo = () => {
    dispatch(redoItemAction());
  };

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
        tabIndex={0}
        onClick={undo}
        onKeyDown={(e) => doIfEnter(e, undo)}
        aria-label="undo"
        disabled={undoStack.length === 0}
      >
        <UndoIcon />
      </button>
      <button
        tabIndex={0}
        onClick={redo}
        onKeyDown={(e) => doIfEnter(e, redo)}
        aria-label="redo"
        disabled={redoStack.length === 0}
      >
        <RedoIcon />
      </button>
    </div>
  );
};

export default Toolbar;
