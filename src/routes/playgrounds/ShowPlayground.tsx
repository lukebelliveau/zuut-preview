import Konva from 'konva';
import { useEffect, useRef, useState } from 'react';
import { useDrop } from 'react-dnd';
import { Helmet } from 'react-helmet';
import { Stage, useStrictMode } from 'react-konva';
import { Provider } from 'react-redux';
import { v4 } from 'uuid';

import Layout from '../../components/Layout';
import usePlaygroundEffects from '../../features/playgrounds/playgroundEffects';
import ShoppingList from '../../components/ShoppingList';
import { MISC_ITEM_TYPE } from '../../lib/items/miscItem';
import createTestRoom from './createTestRoom';
import { useSelectPlayground } from '../../features/playgrounds/playgroundSelector';
import { useSelectPlanById } from '../../features/plans/planSelectors';
import PlaygroundRoom from '../../components/Playgound/PlaygroundRoom';
import PlaygroundItems from '../../components/Playgound/PlaygroundItems';
import { store } from '../../app/store';
import usePlaygroundAdapter from '../../lib/playground/playgroundAdapter';
import useItemsAdapter from '../../lib/items/itemReduxAdapter';
import { BaseItem } from '../../lib/items/itemTypes';

export const playground_path = () => '/playgrounds/current';

export default function ShowPlayground() {
  const { resizePlaygroundOnWindowResize } = usePlaygroundEffects();
  if (process.env.REACT_APP_TEST_PLAYGROUND) createTestRoom(20, 10);
  useStrictMode(true);

  const [firstLoad, setFirstLoad] = useState(true);
  const stageRef = useRef<any>(null);
  const playground = useSelectPlayground();
  if (!playground.planId) throw new Error('No planId in playground!');
  const plan = useSelectPlanById(playground.planId);
  if (!plan) throw new Error('No plan found');
  const room = plan.room;
  if (!room) throw new Error('No room found');

  const { zoomIn, zoomOut } = usePlaygroundAdapter();

  useEffect(() => {
    if (firstLoad) {
      resizePlaygroundOnWindowResize();
      setFirstLoad(false);
    }
  }, [firstLoad, resizePlaygroundOnWindowResize]);

  const { addItem } = useItemsAdapter();
  const [_, drop] = useDrop(() => ({
    accept: MISC_ITEM_TYPE,
    drop: (item: BaseItem) => {
      addItem(item);
    },
  }));

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
        zoomIn(zoomParams);
      } else {
        zoomOut(zoomParams);
      }
    }
  }

  const scale = playground.scale;

  return (
    <>
      <Helmet>
        <title>Zuut - Design your grow</title>
      </Helmet>
      <Layout>
        <div id="sandbox" role="application" ref={drop}>
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
              <PlaygroundRoom room={room} />
              <PlaygroundItems />
            </Provider>
          </Stage>
        </div>
      </Layout>
      <ShoppingList />
    </>
  );
}
