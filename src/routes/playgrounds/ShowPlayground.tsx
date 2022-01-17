import React, { useEffect, useState } from 'react';
import { Layer, Stage } from 'react-konva';
import { useSelector } from 'react-redux';

import Layout from '../../components/Layout';
import { selectPlayground } from '../../features/playgrounds/playgroundSelector';
import Renderer from '../../lib/renderer';
import { useSandboxPlan } from '../../app/hooks';
import { resizePlaygroundOnWindowResize } from '../../features/playgrounds/playgroundEffects';
import { store } from '../../app/store';

export const playground_path = () => '/playgrounds/current';

export default function ShowPlayground() {
  const [firstLoad, setFirstLoad] = useState(true);
  const playground = useSelector(selectPlayground);
  const plan = useSandboxPlan();
  if (!plan) throw new Error('No plan to display');
  if (!plan.room) throw new Error('No room to display');

  useEffect(() => {
    if (firstLoad) {
      resizePlaygroundOnWindowResize(store);
      setFirstLoad(false);
    }
  }, [firstLoad]);
  
  const renderer = new Renderer(playground, plan);
  const scale = renderer.scale();

  return (
    <Layout>
      <div id="sandbox">
        <Stage
          width={playground.displayWidth}
          height={playground.displayHeight}
          scaleX={scale}
          scaleY={scale}
          draggable>
          <Layer>
            {renderer.render()}
          </Layer>
        </Stage>
      </div>
    </Layout>
  );
}
