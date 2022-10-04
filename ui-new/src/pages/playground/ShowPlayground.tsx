import Konva from 'konva';
import { Fragment, useEffect, useRef } from 'react';
import { useDrop } from 'react-dnd';
import { Helmet } from 'react-helmet-async';
import { Stage } from 'react-konva';
import { Provider, useStore } from 'react-redux';
import { v4 } from 'uuid';

import {
  useLoadDemoPlan,
  useResizePlaygroundOnWindowResize,
} from '../../redux/features/playgrounds/playgroundEffects';
import {
  createDemoPlan,
  loadSavedPlayground,
  zoom as zoomPlayground,
} from '../../redux/features/playgrounds/playgroundSlice';
import PlaygroundReduxAdapter from '../../lib/playground/playgroundReduxAdapter';
import PlaygroundRoom from '../../components/playground/PlaygroundRoom';
import PlaygroundItems from '../../components/playground/PlaygroundItems';
import GridLines from '../../components/playground/GridLines';
// import { DRAGGABLE_SIDEBAR_ITEM } from '../../components/sidebar/SidebarTabs';
import useBuildPlayground from '../../hooks/useBuildPlayground';
import LoadingScreen from '../../components/LoadingScreen';
import { useJwt } from '../../redux/features/users/userSelector';
// import {
//   handleDeleteOnKeyDown,
//   handleEscOnKeyDown,
//   handleSelectAllOnKeyDown,
//   handleUndoRedoOnKeyDown,
// } from '../../app/interactionHandlers';
import { useDispatchAddItem } from '../../redux/features/items/itemsHooks';

// import Toolbar from '../../components/Toolbar/Toolbar';
import PlaceableItem, { isPlaceableItem } from '../../lib/item/placeableItem';
import { isCeilingPlaceableItem } from '../../lib/item/ceilingPlaceableItem';
import { Layer } from '../../lib/layer';
import { Point } from '../../lib/point';
import { setVisibleLayer } from '../../redux/features/interactions/interactionsSlice';

// import { useAuth0 } from '@auth0/auth0-react';
import useAuth from '../../hooks/useAuth';
import { AppStore, isDemoMode, useDispatch } from '../../redux/store';
// import MobileWarningModal from '../../components/MobileWarningModal';
import { useQueryItemsLibrary } from '../../lib/itemsLibrary';
import {
  handleDeleteOnKeyDown,
  handleEscOnKeyDown,
  handleSelectAllOnKeyDown,
  handleUndoRedoOnKeyDown,
} from 'src/utils/interactionHandlers';
import { HEADER } from 'src/config';
import TopLevelErrorBoundary from 'src/components/TopLevelErrorBoundary';

// export const playground_path = () => '/playgrounds/current';
// export const demo_playground_path = () => '/playgrounds/demo';

export const DRAGGABLE_SIDEBAR_ITEM = 'DRAGGABLE_SIDEBAR_ITEM';

export default function ShowPlayground() {
  const stageRef = useRef<any>(null);
  const dispatch = useDispatch();
  const playground = useBuildPlayground();
  const jwt = useJwt();
  const store = useStore() as AppStore;
  const dispatchAddItem = useDispatchAddItem();
  const { user } = useAuth();
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
      if (isCeilingPlaceableItem(item)) dispatch(setVisibleLayer(Layer.CEILING));
      else dispatch(setVisibleLayer(Layer.FLOOR));

      if (isPlaceableItem(item)) {
        item.place(
          hackyPlaygroundCenterRef.current ? hackyPlaygroundCenterRef.current : playground.place()
        );
      }

      dispatchAddItem(item.copy());
    },
  }));

  if (isDemoMode() && !playground.plan) {
    dispatch(createDemoPlan());

    return <LoadingScreen />;
  } else if (isDemoMode() && playground.plan) {
  } else if (!playground.plan || !jwt) {
    if (jwt) dispatch(loadSavedPlayground(jwt));
    return <LoadingScreen />;
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

      dispatch(zoomPlayground(PlaygroundReduxAdapter.playgroundToState(playground)));
    }
  }

  const { scale } = playground;

  return (
    <TopLevelErrorBoundary toTrack={{ state: store.getState() }} errorName={'ShowPlayground Error'}>
      <Fragment>
        <div
          role="presentation"
          // eslint-disable-next-line jsx-a11y/no-noninteractive-tabindex
          tabIndex={0}
          style={{ height: '100%', width: '100%' }}
          data-testid="playground-container"
        >
          <div id="sandbox" ref={drop} style={{ height: '100%', width: '100%' }}>
            <div style={{ paddingTop: HEADER.DASHBOARD_DESKTOP_OFFSET_HEIGHT - 10 }}>
              <Stage
                key={v4()}
                ref={stageRef}
                width={playground.displayWidth}
                height={playground.displayHeight}
                // height={600}
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
          </div>
        </div>
      </Fragment>
    </TopLevelErrorBoundary>
  );
}
