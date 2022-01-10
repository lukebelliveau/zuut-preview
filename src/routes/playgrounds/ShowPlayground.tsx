import React from 'react';
import { Layer, Stage } from 'react-konva';
import { useSelector } from 'react-redux';

import Layout from '../../components/Layout';
import { selectById as selectPlanById } from '../../features/plans/planSelectors';
import { selectPlayground } from '../../features/playgrounds/playgroundSelector';
import { store } from '../../app/store';
import Renderer from '../../lib/renderer';

export const playground_path = () => '/playgrounds/current';

export default function ShowPlayground() {
  const playground = useSelector(selectPlayground);
  const planId = playground.planId;
  if (!planId) throw new Error('No plan available');

  const plan = selectPlanById(store.getState(), planId);
  if (!plan) throw new Error('No plan found');

  const header = <span>Playground / <strong>{plan.name}</strong></span>;
  const renderer = Renderer.fromPlan(1000, 1000, plan);

  return (
    <Layout header={header}>
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
