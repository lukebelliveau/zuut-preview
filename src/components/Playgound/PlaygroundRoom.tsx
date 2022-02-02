import { Layer, Rect } from 'react-konva';
import { useSelector } from 'react-redux';

import { useSelectPlanById } from '../../features/plans/planSelectors';
import { selectPlaygroundState, useSelectPlayground } from '../../features/playgrounds/playgroundSelector';
import PlanReduxAdapter from '../../lib/plan/planReduxAdapter';

export default function PlaygroundRoom() {
  const playgroundState = useSelector(selectPlaygroundState);
  const planState = useSelectPlanById(playgroundState.planId);
  if (!planState) throw new Error('No plan found');
  const plan = PlanReduxAdapter.stateToPlan(planState);
  if (!plan.room) throw new Error('No room found');

  return <Layer>
    <Rect
      x={plan.room.x}
      y={plan.room.y}
      width={plan.room.width}
      height={plan.room.length}
      stroke="black"
      strokeWidth={1}
      strokeScaleEnabled={false}
    />
  </Layer>;
}