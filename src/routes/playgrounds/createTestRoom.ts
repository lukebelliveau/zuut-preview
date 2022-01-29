import { feetToMm } from '../../lib/conversions';
import Plan from '../../lib/plan';
import PlanRepository from '../../lib/plan/planRepository';
import PlaygroundRepository from '../../lib/playground/playgroundRepository';

const createTestRoom = (width: number, length: number) => {
  const plan = Plan.sandbox();
  const planRepo = PlanRepository.forRedux();
  const playgroundRepo = PlaygroundRepository.forRedux();

  planRepo.create(plan);

  const playground = playgroundRepo.select();
  playground.plan = plan;
  playgroundRepo.update(playground);

  const currentPlan = planRepo.default();
  const newPlan = new Plan(
    currentPlan?.name,
    feetToMm(width),
    feetToMm(length),
    undefined,
    currentPlan?.id
  );

  planRepo.update(newPlan);
};

export default createTestRoom;

if (process.env.REACT_APP_TEST_PLAYGROUND) createTestRoom(20, 10);
