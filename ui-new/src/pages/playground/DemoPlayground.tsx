import LoadingScreen from 'src/components/LoadingScreen';
import useBuildPlayground from 'src/hooks/useBuildPlayground';
import { createDemoPlan } from 'src/redux/features/playgrounds/playgroundSlice';
import { isDemoMode, useDispatch } from 'src/redux/store';
import ShowPlayground, { PlaygroundWithPlan } from './ShowPlayground';

const DemoPlayground = () => {
  if (!isDemoMode()) {
    throw new Error("Rendered DemoPlayground in non-demo mode. This shouldn't happen.");
  }

  const playground = useBuildPlayground();
  const dispatch = useDispatch();

  if (!playground.plan || !playground.plan.room) {
    dispatch(createDemoPlan());

    return <LoadingScreen />;
  }

  return <ShowPlayground playground={playground as PlaygroundWithPlan} />;
};

export default DemoPlayground;
