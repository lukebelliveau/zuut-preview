import React, { useEffect, useState } from 'react';
import Konva from 'konva';
import { Layer, Stage } from 'react-konva';

import Layout from '../../components/Layout';
import Renderer from '../../lib/renderer';
import { resizePlaygroundOnWindowResize } from '../../features/playgrounds/playgroundEffects';
import PlaygroundRepository from '../../lib/playground/playgroundRepository';

export const playground_path = () => '/playgrounds/current';

const playgroundRepo = PlaygroundRepository.forRedux();

function zoom(event: Konva.KonvaEventObject<WheelEvent>) {
  event.evt.preventDefault();
  const playground = playgroundRepo.select();

  if (event.evt.deltaY > 0) {
    playground.zoomIn();
  } else {
    playground.zoomOut();
  }

  playgroundRepo.update(playground);
}

export default function ShowPlayground() {
  const [firstLoad, setFirstLoad] = useState(true);
  const playground = playgroundRepo.select();
  const plan = playground.plan;

  if (!plan?.room) throw new Error('No room to display');

  useEffect(() => {
    if (firstLoad) {
      resizePlaygroundOnWindowResize();
      setFirstLoad(false);
    }
  }, [firstLoad]);
  
  const renderer = new Renderer(playground);
  const scale = playground.scale;

  return (
    <Layout>
      <div id="sandbox">
        <Stage
          width={playground.displayWidth}
          height={playground.displayHeight}
          x={10}
          y={10}
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
  );
}
