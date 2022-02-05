import { Layer, Line } from 'react-konva';
import { useBuildPlan } from '../../app/builderHooks';
import Grid from '../../lib/grid';

const GridLines = () => {
  const plan = useBuildPlan();
  const grid = new Grid(plan?.room?.width, plan?.room?.length);

  return (
    <Layer>
      {grid.lines.map((line, i) => <Line
        key={i}
        strokeWidth={1}
        strokeScaleEnabled={false}
        stroke={'#ededed'}
        points={line}
      />)}
    </Layer>
  );
};

export default GridLines;
