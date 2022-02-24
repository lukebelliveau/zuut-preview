import Konva from 'konva';
import { useEffect, useRef, useState } from 'react';
import { useDrop } from 'react-dnd';
import { Helmet } from 'react-helmet-async';
import { Stage } from 'react-konva';
import { Provider, useDispatch } from 'react-redux';
import { v4 } from 'uuid';

import Layout from '../../components/Layout';
import { resizePlaygroundOnWindowResize } from '../../features/playgrounds/playgroundEffects';
import ShoppingList from '../../components/ShoppingList';
import { addOne, removeOne } from '../../features/items/itemsSlice';
import ItemReduxAdapter from '../../lib/item/itemReduxAdapter';
import {
  loadSavedPlayground,
  zoom as zoomPlayground,
} from '../../features/playgrounds/playgroundSlice';
import PlaygroundReduxAdapter from '../../lib/playground/playgroundReduxAdapter';
import PlaygroundRoom from '../../components/Playground/PlaygroundRoom';
import PlaygroundItems from '../../components/Playground/PlaygroundItems';
import { store } from '../../app/store';
import GridLines from '../../components/Playground/GridLines';
import ControlPanel from '../../components/ControlPanel/ControlPanel';
import { DRAGGABLE_SIDEBAR_ITEM } from '../../components/Sidebar/SidebarTabs';
import { isPlaceableItem, Item } from '../../lib/item';
import { useBuildPlayground } from '../../app/builderHooks';
import Loading from '../../components/Loading';
import { useJwt } from '../../features/users/userSelector';
import { EntityId } from '@reduxjs/toolkit';
import { unselect } from '../../features/interactions/interactionsSlice';

export const playground_path = () => '/playgrounds/current';

export default function ShowPlayground() {
  const [firstLoad, setFirstLoad] = useState(true);
  const stageRef = useRef<any>(null);
  const dispatch = useDispatch();
  const playground = useBuildPlayground();
  const jwt = useJwt();

  useEffect(() => {
    if (firstLoad) {
      resizePlaygroundOnWindowResize();
      setFirstLoad(false);
    }
  }, [firstLoad]);

  const [_, drop] = useDrop(() => ({
    accept: [DRAGGABLE_SIDEBAR_ITEM],
    drop: (item: Item) => {
      if (isPlaceableItem(item)) {
        item.place(playground.place());
      }
      dispatch(addOne(ItemReduxAdapter.itemToState(item.copy())));
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
    const selectedItemId = store.getState().interactions.selected;
    if ((e.key === 'Backspace' || e.key === 'Delete') && selectedItemId) {
      dispatch(removeOne(selectedItemId as EntityId));
      dispatch(unselect());
    }
  };

  return (
    <>
      <Helmet>
        <title>Zuut - Design your grow</title>
      </Helmet>
      <Layout>
        <div
          id="sandbox"
          role="presentation"
          ref={drop}
          // eslint-disable-next-line jsx-a11y/no-noninteractive-tabindex
          tabIndex={0}
          onKeyDown={handleKeyDown}
        >
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
      <ShoppingList />
      <ControlPanel />
    </>
  );
}
