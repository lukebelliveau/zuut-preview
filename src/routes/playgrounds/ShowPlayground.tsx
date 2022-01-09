import React from 'react';
import { Layer, Stage } from 'react-konva';

import Layout from '../../components/Layout';
import { selectPlan } from '../../features/playgroundPlan/playgroundSelectors';
import Renderer from '../../lib/renderer';

export const playground_path = () => '/playgrounds/current';

export default function ShowPlayground() {
  const plan = selectPlan();
  if (!plan) throw new Error('No plan found');
  const header = <span>Playground / <strong>{plan.name}</strong></span>;
  const renderer = Renderer.fromPlan(1000, 1000, plan);

  return (
    <Layout header={header}>
      <div id="sandbox">
        <Stage width={plan.displayWidth} height={plan.displayHeight} x={10} y={10} draggable scaleX={1} scaleY={1}>
          <Layer>
            {renderer.render()}
          </Layer>
        </Stage>
      </div>
    </Layout>
  );
}
