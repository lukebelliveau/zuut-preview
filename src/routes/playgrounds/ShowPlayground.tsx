import React, { useEffect, useRef, useState } from 'react';
import Konva from 'konva';
import { Layer, Stage } from 'react-konva';

import Layout from '../../components/Layout';
import Renderer from '../../lib/renderer';
import { resizePlaygroundOnWindowResize } from '../../features/playgrounds/playgroundEffects';
import PlaygroundRepository from '../../lib/playground/playgroundRepository';
import { useSelector } from 'react-redux';
import { Helmet } from 'react-helmet';
import ShoppingList from '../../components/ShoppingList';

export const playground_path = () => '/playgrounds/current';

export default function ShowPlayground() {
  const [firstLoad, setFirstLoad] = useState(true);
  const stageRef = useRef<any>(null);
  const playgroundRepo = PlaygroundRepository.forReduxSelector(useSelector);
  const playground = playgroundRepo.select();
  const plan = playground.plan;

  if (!plan?.room) throw new Error('No room to display');

  useEffect(() => {
    if (firstLoad) {
      resizePlaygroundOnWindowResize();
      setFirstLoad(false);
    }
  }, [firstLoad]);

  function zoom(event: Konva.KonvaEventObject<WheelEvent>) {
    event.evt.preventDefault();
    const repo = PlaygroundRepository.forRedux();
    const playground = repo.select();
  
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
  
  const renderer = new Renderer(playground);
  const scale = playground.scale;

  return (<>
    <Helmet><title>Zuut - Design your grow</title></Helmet>
    <Layout>
      <div id="sandbox">
        <Stage
          ref={stageRef}
          width={playground.displayWidth}
          height={playground.displayHeight}
          x={playground.centerPosition.x}
          y={playground.centerPosition.y}
          scaleX={scale}
          scaleY={scale}
          onWheel={zoom}
          draggable>
          <Layer>
            {renderer.render()}
          </Layer>
        </Stage>
      </div>
    </Layout>
    <ShoppingList />
  </>);
}
