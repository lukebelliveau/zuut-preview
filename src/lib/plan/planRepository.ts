import { Adapter } from '../adapter';
import Plan from '../plan';
import PlanReduxAdapter from './planReduxAdapter';

const DEFAULT_PLAN_ID = '0';

export default class PlanRepository {
  adapter: Adapter<Plan>;

  public static forRedux() {
    const adapter = new PlanReduxAdapter();
    return new PlanRepository(adapter);
  }

  constructor(adapter: Adapter<Plan>) {
    this.adapter = adapter;
  }

  default(): Plan {
    return this.selectById(DEFAULT_PLAN_ID);
  }

  selectById(id: string): Plan {
    return this.adapter.selectById(id);
  }

  create(plan: Plan) {
    this.adapter.create(plan);
  }

  update(plan: Plan) {
    this.adapter.update(plan);
  }
}