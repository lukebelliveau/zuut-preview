import Konva from 'konva';
import { useEffect, useRef, useState } from 'react';
import { useDrop } from 'react-dnd';
import { Helmet } from 'react-helmet';
import { Layer, Rect, Stage, useStrictMode } from 'react-konva';
import { useDispatch } from 'react-redux';

import Layout from '../../components/Layout';
import { resizePlaygroundOnWindowResize } from '../../features/playgrounds/playgroundEffects';
import ShoppingList from '../../components/ShoppingList';
import MiscItem, { MISC_ITEM_TYPE } from '../../lib/items/miscItem';
import createTestRoom from './createTestRoom';
import { addOne, updateOne } from '../../features/items/itemsSlice';
import ItemReduxAdapter from '../../lib/items/itemReduxAdapter';
import { useSelectPlayground } from '../../features/playgrounds/playgroundSelector';
import PlaygroundReduxAdapter from '../../lib/playground/playgroundReduxAdapter';
import { useSelectPlanById } from '../../features/plans/planSelectors';
import PlaygroundRepository from '../../lib/playground/playgroundRepository';
import PlaygroundRoom from '../../components/Playgound/PlaygroundRoom';
import PlaygroundItems from '../../components/Playgound/PlaygroundItems';
import { useSelectAllItems } from '../../features/items/itemsSelectors';
import { PlaygroundItem } from '../../components/Playgound/PlaygroundItem';
import PlaceableItem from '../../lib/items/placeableItem';
import { KonvaEventObject } from 'konva/lib/Node';
import { v4 } from 'uuid';

export const playground_path = () => '/playgrounds/current';

export default function ShowPlayground() {
  if (process.env.REACT_APP_TEST_PLAYGROUND) createTestRoom(20, 10);
  useStrictMode(true);

  const [firstLoad, setFirstLoad] = useState(true);
  const stageRef = useRef<any>(null);
  const dispatch = useDispatch();
  const playgroundState = useSelectPlayground();
  const planState = useSelectPlanById(playgroundState.planId);
  if (!planState) throw new Error('No plan found');
  const itemStates = useSelectAllItems();

  const playground = PlaygroundReduxAdapter.playgroundFromState(planState, playgroundState);
  const plan = playground.plan;
  if (!plan) throw new Error('No plan found');
  const room = plan.room;
  if (!room) throw new Error('No room found');
  const items = ItemReduxAdapter.itemStatesToItemList(itemStates);

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
    const repo = PlaygroundRepository.forRedux();
  
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
  
      repo.zoom(playground);
    }
  }

  function updatePlacement(item: PlaceableItem, e: KonvaEventObject<DragEvent>) {
    item.setPosition({
      x: e.target.x(),
      y: e.target.y()
    });
    dispatch(updateOne({ id: item.id, changes: ItemReduxAdapter.itemToState(item) }));
  }
  
  const scale = playground.scale;

  // Unfortunately Konva somehow breaks react hooks so we can't have custom components for items/rooms
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
          {/* <PlaygroundRoom /> */}
          <Layer>
            <Rect
              x={room.x}
              y={room.y}
              width={room.width}
              height={room.length}
              stroke="black"
              strokeWidth={1}
              strokeScaleEnabled={false}
            />
          </Layer>
          {/* <PlaygroundItems /> */}
          <Layer>
            {items.placeable().map(item => <Rect
                key={item.id}
                x={item.x}
                y={item.y}
                width={item.width}
                height={item.length}
                stroke="black"
                strokeWidth={1}
                strokeScaleEnabled={false}
                onDragEnd={e => updatePlacement(item, e)}
                draggable
              />)}
          </Layer>
        </Stage>
      </div>
    </Layout>
    <ShoppingList />
  </>);
}
