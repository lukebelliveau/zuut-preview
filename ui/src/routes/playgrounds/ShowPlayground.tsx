import Konva from 'konva';
import { useRef } from 'react';
import { useDrop } from 'react-dnd';
import { Helmet } from 'react-helmet-async';
import { Stage } from 'react-konva';
import { Provider, useDispatch, useStore } from 'react-redux';
import { v4 } from 'uuid';

import Layout from '../../components/Layout';
import { useResizePlaygroundOnWindowResize } from '../../features/playgrounds/playgroundEffects';
import Inventory from '../../components/Inventory';
import {
  loadSavedPlayground,
  zoom as zoomPlayground,
} from '../../features/playgrounds/playgroundSlice';
import PlaygroundReduxAdapter from '../../lib/playground/playgroundReduxAdapter';
import PlaygroundRoom from '../../components/Playground/PlaygroundRoom';
import PlaygroundItems from '../../components/Playground/PlaygroundItems';
import GridLines from '../../components/Playground/GridLines';
import ControlPanel from '../../components/ControlPanel/ControlPanel';
import { DRAGGABLE_SIDEBAR_ITEM } from '../../components/Sidebar/SidebarTabs';
import { useBuildPlayground } from '../../app/builderHooks';
import Loading from '../../components/Loading';
import { useJwt } from '../../features/users/userSelector';
import {
  handleDeleteOnKeyDown,
  handleUndoRedoOnKeyDown,
} from '../../app/interactionHandlers';
import { useDispatchAddItem } from '../../features/items/itemsHooks';

import './ShowPlayground.css';
import Toolbar from '../../components/Toolbar/Toolbar';
import PlaceableItem, { isPlaceableItem } from '../../lib/item/placeableItem';

export const playground_path = () => '/playgrounds/current';

export default function ShowPlayground() {
  const stageRef = useRef<any>(null);
  const dispatch = useDispatch();
  const playground = useBuildPlayground();
  const jwt = useJwt();
  const store = useStore();
  const dispatchAddItem = useDispatchAddItem();

  useResizePlaygroundOnWindowResize();

  const [_, drop] = useDrop(() => ({
    accept: [DRAGGABLE_SIDEBAR_ITEM],
    drop: (item: PlaceableItem) => {
      if (isPlaceableItem(item)) {
        item.place(playground.place());
      }
      dispatchAddItem(item.copy());
    },
  }));

  if (!playground.plan || !jwt) {
    if (jwt) dispatch(loadSavedPlayground(jwt));
    return <Loading />;
  }

  const room = playground.plan.room;
  if (!room) throw new Error('No room found');

  function zoom(event: Konva.KonvaEventObject<WheelEvent>) {
    event.evt.preventDefault();

    if (stageRef.current) {
      const { x, y } = stageRef.current.getPointerPosition();
      const zoomParams = {
        mouseX: x,
        mouseY: y,
        stageX: stageRef.current.x(),
        stageY: stageRef.current.y(),
      };

      if (event.evt.deltaY > 0) {
        playground.zoomIn(zoomParams);
      } else {
        playground.zoomOut(zoomParams);
      }

      dispatch(
        zoomPlayground(PlaygroundReduxAdapter.playgroundToState(playground))
      );
    }
  }

  const scale = playground.scale;

  const handleKeyDown = (e: React.KeyboardEvent<HTMLSpanElement>) => {
    handleDeleteOnKeyDown(e, store);
    handleUndoRedoOnKeyDown(e, store);
  };

  return (
    <div
      role="presentation"
      // eslint-disable-next-line jsx-a11y/no-noninteractive-tabindex
      tabIndex={0}
      onKeyDown={handleKeyDown}
      className="playground-wrapper"
      data-testid="playground-container"
    >
      <Helmet>
        <title>Zuut - Design your grow</title>
      </Helmet>
      <Layout>
        <div id="sandbox" ref={drop}>
          <Toolbar />
          <Stage
            key={v4()}
            ref={stageRef}
            width={playground.displayWidth}
            height={playground.displayHeight}
            x={playground.centerX}
            y={playground.centerY}
            scaleX={scale}
            scaleY={scale}
            onWheel={zoom}
            draggable
          >
            <Provider store={store}>
              <GridLines />
              <PlaygroundRoom room={room} />
              <PlaygroundItems />
            </Provider>
          </Stage>
        </div>
      </Layout>
      <Inventory />
      <ControlPanel />
    </div>
  );
}
