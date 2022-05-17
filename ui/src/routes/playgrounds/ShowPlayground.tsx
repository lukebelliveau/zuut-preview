import Konva from 'konva';
import { Fragment, useRef } from 'react';
import { useDrop } from 'react-dnd';
import { Helmet } from 'react-helmet-async';
import { Stage } from 'react-konva';
import { Provider, useDispatch, useStore } from 'react-redux';
import { v4 } from 'uuid';

import Layout from '../../components/Layout';
import { useResizePlaygroundOnWindowResize } from '../../features/playgrounds/playgroundEffects';
import {
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

import Feedback from 'feeder-react-feedback';
import 'feeder-react-feedback/dist/feeder-react-feedback.css';
import './ShowPlayground.css';
import Toolbar from '../../components/Toolbar/Toolbar';
import PlaceableItem, { isPlaceableItem } from '../../lib/item/placeableItem';
import { isCeilingPlaceableItem } from '../../lib/item/ceilingPlaceableItem';
import { Layer } from '../../lib/layer';
import { Point } from '../../lib/point';
import { setVisibleLayer } from '../../features/interactions/interactionsSlice';

import { useAuth0 } from '@auth0/auth0-react';
import { DEMO_MODE } from '../../app/store';
import { createPlan } from '../../features/plans/planSlice';
import { feetToMm } from '../../lib/conversions';

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

  if (DEMO_MODE && !playground.plan) {
    dispatch(
      createPlan({
        name: 'Demo Playground',
        width: feetToMm(50),
        length: feetToMm(50),
      })
    );
    return <Loading />;
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
      </div>
      <Feedback
        projectId="6267e6a8b4e0a100041f4471"
        emailDefaultValue={user?.email}
        email
      />
    </Fragment>
  );
}
