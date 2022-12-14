import Konva from 'konva';
import { Fragment, useEffect, useRef } from 'react';
import { useDrop } from 'react-dnd';
import { Helmet } from 'react-helmet-async';
import { Stage } from 'react-konva';
import { Provider, useDispatch, useStore } from 'react-redux';
import { v4 } from 'uuid';

import Layout from '../../components/Layout';
import {
  useLoadDemoPlan,
  useResizePlaygroundOnWindowResize,
} from '../../features/playgrounds/playgroundEffects';
import {
  createDemoPlan,
  loadSavedPlayground,
  zoom as zoomPlayground,
} from '../../features/playgrounds/playgroundSlice';
import PlaygroundReduxAdapter from '../../lib/playground/playgroundReduxAdapter';
import PlaygroundRoom from '../../components/Playground/PlaygroundRoom';
import PlaygroundItems from '../../components/Playground/PlaygroundItems';
import GridLines from '../../components/Playground/GridLines';
import { DRAGGABLE_SIDEBAR_ITEM } from '../../components/Sidebar/SidebarTabs';
import { useBuildPlayground } from '../../app/builderHooks';
import Loading from '../../components/Loading';
import { useJwt } from '../../features/users/userSelector';
import {
  handleDeleteOnKeyDown,
  handleEscOnKeyDown,
  handleSelectAllOnKeyDown,
  handleUndoRedoOnKeyDown,
} from '../../app/interactionHandlers';
import { useDispatchAddItem } from '../../features/items/itemsHooks';

import './ShowPlayground.css';
import Toolbar from '../../components/Toolbar/Toolbar';
import PlaceableItem, { isPlaceableItem } from '../../lib/item/placeableItem';
import { isCeilingPlaceableItem } from '../../lib/item/ceilingPlaceableItem';
import { Layer } from '../../lib/layer';
import { Point } from '../../lib/point';
import { setVisibleLayer } from '../../features/interactions/interactionsSlice';

import { useAuth0 } from '@auth0/auth0-react';
import { isDemoMode } from '../../app/store';
import { feetToMm } from '../../lib/conversions';
import MobileWarningModal from '../../components/MobileWarningModal';
import { useQueryItemsLibrary } from '../../lib/itemsLibrary';

export const playground_path = () => '/playgrounds/current';
export const demo_playground_path = () => '/playgrounds/demo';

export default function ShowPlayground() {
  const stageRef = useRef<any>(null);
  const dispatch = useDispatch();
  const playground = useBuildPlayground();
  const jwt = useJwt();
  const store = useStore();
  const dispatchAddItem = useDispatchAddItem();
  const { user } = useAuth0();
  useQueryItemsLibrary();

  /**
   * Ugh. I'm not able to get the react-dnd useDrop() hook to update
   * when the playground updates. The instance of `playground` the callback closes over
   * always returns { x: 0, y: 0} (initial values),
   * even when the component re-renders with different playground values.
   *
   * This hacky workaround ensures that when an item is dropped,
   * it's placed in the center of the playground.
   */
  const hackyPlaygroundCenterRef = useRef<Point>();
  hackyPlaygroundCenterRef.current = playground.place();

  useLoadDemoPlan();
  useResizePlaygroundOnWindowResize();

  const [_, drop] = useDrop(() => ({
    accept: [DRAGGABLE_SIDEBAR_ITEM],
    drop: (item: PlaceableItem) => {
      if (isCeilingPlaceableItem(item))
        dispatch(setVisibleLayer(Layer.CEILING));
      else dispatch(setVisibleLayer(Layer.FLOOR));

      if (isPlaceableItem(item)) {
        item.place(
          hackyPlaygroundCenterRef.current
            ? hackyPlaygroundCenterRef.current
            : playground.place()
        );
      }

      dispatchAddItem(item.copy());
    },
  }));

  if (isDemoMode() && !playground.plan) {
    dispatch(createDemoPlan());

    return <Loading />;
  } else if (isDemoMode() && playground.plan) {
  } else if (!playground.plan || !jwt) {
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

      if (event.evt.deltaY < 0) {
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
    handleSelectAllOnKeyDown(e, store);
    handleEscOnKeyDown(e, store);
  };

  return (
    <Fragment>
      <div
        role="presentation"
        // eslint-disable-next-line jsx-a11y/no-noninteractive-tabindex
        tabIndex={0}
        onKeyDown={handleKeyDown}
        className="playground-wrapper"
        data-testid="playground-container"
      >
        <Layout>
          <Helmet>
            <title>Zuut - Design your grow</title>
          </Helmet>
          <div id="sandbox" ref={drop}>
            <Toolbar />
            <Stage
              key={v4()}
              ref={stageRef}
              width={playground.displayWidth}
              height={playground.displayHeight}
              /**
               * TODO: the "recenter playground" function is super hacked together
               * it is probably because of the console warning you see whenever you run the app/tests
               *
               * `ReactKonva: You have a Konva node with draggable = true and position defined but no onDragMove or onDragEnd events are handled.`
               *
               * We probably need to use the onDragMove/End events to pass a new (x,y) to the Stage component
               * whenever the user drags, then recentering will be done by recentering the (x,y)
               *
               * or not, just riffing, I haven't tried this yet
               */
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
        <MobileWarningModal />
      </div>
    </Fragment>
  );
}
