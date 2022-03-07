import { useStore } from 'react-redux';
import { ActionCreators } from 'redux-undo';
import UndoIcon from '../../images/glyphs/undo.png';
import RedoIcon from '../../images/glyphs/redo.png';

import './Toolbar.css';

const Toolbar = () => {
  const store = useStore();

  const undo = () => {
    store.dispatch(ActionCreators.undo());
  };

  const redo = () => {
    store.dispatch(ActionCreators.redo());
  };

  const doIfEnter = (
    e: React.KeyboardEvent<HTMLElement>,
    callbackIfEnter: () => void
  ) => {
    if (e.key === 'Return' || e.key === 'Enter') {
      callbackIfEnter();
    }
  };

  return (
    <div id="toolbar">
      <button
        tabIndex={0}
        onClick={undo}
        onKeyDown={(e) => doIfEnter(e, undo)}
        aria-label="undo"
      >
        <img src={UndoIcon} alt="undo" />
      </button>
      <button
        tabIndex={0}
        onClick={redo}
        onKeyDown={(e) => doIfEnter(e, redo)}
        aria-label="redo"
      >
        <img src={RedoIcon} alt="redo" />
      </button>
    </div>
  );
};

export default Toolbar;
