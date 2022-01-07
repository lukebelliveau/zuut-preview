import React from 'react';
import { Layer, Stage } from 'react-konva';

import GridRenderer from '../../lib/renderer/gridRenderer';
import Layout from '../../components/Layout';
import { selectPlaygroundPlan } from '../../features/playgroundPlan/playgroundPlanSelector';
import Renderer from '../../lib/renderer';

export const playground_path = () => '/playgrounds/current';

export default function ShowPlayground() {
  const plan = selectPlaygroundPlan();
  if (!plan) throw new Error('No plan found');
  const header = <span>Playground / <strong>{plan.name}</strong></span>;
  const renderer = Renderer.fromPlan(1000, 1000, plan);
  const gridRenderer = new GridRenderer(1000, 1000);

  return (
    <Layout header={header}>
      <div id="sandbox">
        <Stage width={renderer.width} height={renderer.height}>
          <Layer>
            {gridRenderer.render()}
            {renderer.render()}
          </Layer>
        </Stage>
      </div>
    </Layout>
  );
}
