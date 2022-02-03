import Konva from 'konva';
import { useEffect, useRef, useState } from 'react';
import { useDrop } from 'react-dnd';
import { Helmet } from 'react-helmet';
import { Stage } from 'react-konva';
import { Provider, useDispatch } from 'react-redux';
import { v4 } from 'uuid';

import Layout from '../../components/Layout';
import { resizePlaygroundOnWindowResize } from '../../features/playgrounds/playgroundEffects';
import ShoppingList from '../../components/ShoppingList';
import MiscItem, { MISC_ITEM_TYPE } from '../../lib/item/miscItem';
import { addOne } from '../../features/items/itemsSlice';
import ItemReduxAdapter from '../../lib/item/itemReduxAdapter';
import { useSelectPlayground } from '../../features/playgrounds/playgroundSelector';
import { zoom as zoomPlayground } from '../../features/playgrounds/playgroundSlice';
import PlaygroundReduxAdapter from '../../lib/playground/playgroundReduxAdapter';
import { useSelectPlanById } from '../../features/plans/planSelectors';
import PlaygroundRoom from '../../components/Playgound/PlaygroundRoom';
import PlaygroundItems from '../../components/Playgound/PlaygroundItems';
import { store } from '../../app/store';

export const playground_path = () => '/playgrounds/current';

export default function ShowPlayground() {
  const [firstLoad, setFirstLoad] = useState(true);
  const stageRef = useRef<any>(null);
  const dispatch = useDispatch();
  const playgroundState = useSelectPlayground();
  const planState = useSelectPlanById(playgroundState.planId);
  if (!planState) throw new Error('No plan found');

  const playground = PlaygroundReduxAdapter.playgroundFromState(planState, playgroundState);
  const plan = playground.plan;
  if (!plan) throw new Error('No plan found');
  const room = plan.room;
  if (!room) throw new Error('No room found');

  useEffect(() => {
    if (firstLoad) {
      resizePlaygroundOnWindowResize();
      setFirstLoad(false);
    }
  }, [firstLoad]);

  const [_, drop] = useDrop(() => ({
    accept: MISC_ITEM_TYPE,
    drop: (item: MiscItem) => {
      dispatch(addOne(ItemReduxAdapter.itemToState(item.copy())));
    }
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
        playground.zoomIn(zoomParams);
      } else {
        playground.zoomOut(zoomParams);
      }
  
      dispatch(zoomPlayground(PlaygroundReduxAdapter.playgroundToState(playground)));
    }
  }
  
  const scale = playground.scale;

  return (<>
    <Helmet><title>Zuut - Design your grow</title></Helmet>
    <Layout>
      <div id="sandbox" role="application" ref={drop}>
        <Stage
          key={v4()}
          ref={stageRef}
          width={playground.displayWidth}
          height={playground.displayHeight}
          x={playground.centerPosition.x}
          y={playground.centerPosition.y}
          scaleX={scale}
          scaleY={scale}
          onWheel={zoom}
          draggable>
            <Provider store={store}>
              <PlaygroundRoom room={room} />
              <PlaygroundItems />
            </Provider>
        </Stage>
      </div>
    </Layout>
    <ShoppingList />
  </>);
}
