import { useSelectAllPlans } from '../../features/plans/planSelectors';
import { PlanState } from '../../features/plans/planState';
import { feetToMm } from '../../lib/conversions';
import usePlanAdapter from '../../lib/plan/planAdapter';
import usePlaygroundAdapter from '../../lib/playground/playgroundAdapter';

const useCreateTestRoomIfDev = (width: number, length: number) => {
  const playgroundFunctions = usePlaygroundAdapter();
  const planAdapter = usePlanAdapter();
  const plans = useSelectAllPlans();

  if (!process.env.REACT_APP_TEST_PLAYGROUND || plans.length > 0) return;

  const testPlan: PlanState = {
    name: 'Test Plan',
    id: '0',
    room: {
      width: feetToMm(width),
      length: feetToMm(length),
      height: undefined,
      x: 0,
      y: 0,
    },
  };

  planAdapter.create(testPlan);
  playgroundFunctions.setPlan(testPlan);
};

export default useCreateTestRoomIfDev;
