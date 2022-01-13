import React from 'react';
import { Layer, Stage } from 'react-konva';
import { useSelector } from 'react-redux';

import Layout from '../../components/Layout';
import { selectPlayground } from '../../features/playgrounds/playgroundSelector';
import Renderer from '../../lib/renderer';
import { useSandboxPlan } from '../../app/hooks';

export const playground_path = () => '/playgrounds/current';

export default function ShowPlayground() {
  const playground = useSelector(selectPlayground);
  const plan = useSandboxPlan();

  const renderer = new Renderer(playground, plan);

  return (
    <Layout>
      <div id="sandbox">
        <Stage
          width={playground.displayWidth}
          height={playground.displayHeight}
          x={10}
          y={10}
          scaleX={playground.scale}
          scaleY={playground.scale}
          draggable>
          <Layer>
            {renderer.render()}
          </Layer>
        </Stage>
      </div>
    </Layout>
  );
}
