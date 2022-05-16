import { Layer, Line } from 'react-konva';
import { useBuildPlan } from '../../app/builderHooks';
import Grid from '../../lib/grid';

const GridLines = () => {
  const plan = useBuildPlan();

  return (
    <Layer>
      {plan.grid.lines.map((line, i) => (
        <Line
          key={i}
          strokeWidth={1}
          strokeScaleEnabled={false}
          stroke={'#ededed'}
          points={line}
        />
      ))}
    </Layer>
  );
};

export default GridLines;
