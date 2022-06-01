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
import { Layer } from '../../lib/layer';
import { useSelectShowLayer } from '../../features/interactions/interactionsSelectors';
import { toggleLayer } from '../../features/interactions/interactionsSlice';
import ResetPlaygroundModal from './ResetPlaygroundModal';
import { useState } from 'react';
import Modal from 'react-modal';
import {
  resizePlayground,
  update,
} from '../../features/playgrounds/playgroundSlice';
import { useBuildPlayground } from '../../app/builderHooks';
import PlaygroundReduxAdapter from '../../lib/playground/playgroundReduxAdapter';

function Toolbar() {
  const dispatch = useDispatch();
  const showLayer = useSelectShowLayer();
  const playground = useBuildPlayground();
  const [modalIsOpen, setIsOpen] = useState(false);
  function openModal() {
    setIsOpen(true);
  }

  function closeModal() {
    Modal.setAppElement('#root');
    setIsOpen(false);
  }

  const undo = () => {
    dispatch(undoItemAction());
  };

  const redo = () => {
    dispatch(redoItemAction());
  };

  function toggleSelectedLayer(layer: Layer) {
    dispatch(toggleLayer(layer));
  }

  const doIfEnter = (
    e: React.KeyboardEvent<HTMLElement>,
    callbackIfEnter: () => void
  ) => {
    if (e.key === 'Return' || e.key === 'Enter') {
      callbackIfEnter();
    }
  };

  /**
   * A gross hack to re-center the Playground (Konva stage)
   * Slightly changing a value on playground causes the ShowPlayground
   * component to re-render, which will re-center the grid. Sorry...
   */
  const recenterPlayground = () => {
    const displayWidth = playground.displayWidth;
    playground.displayWidth = displayWidth - 1;
    dispatch(update(PlaygroundReduxAdapter.playgroundToState(playground)));
  };

  const undoStack = useSelectUndoStack();
  const redoStack = useSelectRedoStack();

  return (
    <div id="toolbar">
      <button
        className="tool"
        tabIndex={0}
        onClick={undo}
        onKeyDown={(e) => doIfEnter(e, undo)}
        aria-label="undo"
        disabled={undoStack.length === 0}
      >
        <UndoIcon />
      </button>
      <button
        className="tool"
        tabIndex={0}
        onClick={redo}
        onKeyDown={(e) => doIfEnter(e, redo)}
        aria-label="redo"
        disabled={redoStack.length === 0}
      >
        <RedoIcon />
      </button>
      <button
        className={showLayer[Layer.FLOOR] ? 'primary' : 'secondary'}
        tabIndex={0}
        onClick={() => toggleSelectedLayer(Layer.FLOOR)}
        onKeyDown={(e) => doIfEnter(e, () => toggleSelectedLayer(Layer.FLOOR))}
        aria-label="Floor plane"
      >
        Floor Plane
      </button>
      <button
        className={showLayer[Layer.CEILING] ? 'primary' : 'secondary'}
        tabIndex={0}
        onClick={() => toggleSelectedLayer(Layer.CEILING)}
        onKeyDown={(e) =>
          doIfEnter(e, () => toggleSelectedLayer(Layer.CEILING))
        }
        aria-label="Ceiling plane"
      >
        Ceiling Plane
      </button>
      <button className="tool" onClick={recenterPlayground}>
        Recenter playground
      </button>
      <button className="tool" onClick={openModal}>
        Reset playground
      </button>
      <ResetPlaygroundModal open={modalIsOpen} closeModal={closeModal} />
    </div>
  );
}

export default Toolbar;
