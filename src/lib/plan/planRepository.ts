import Plan from '../plan';
import { PlanAdapter } from './planAdapter';
import PlanReduxAdapter from './planReduxAdapter';

const DEFAULT_PLAN_ID = '0';

export default class PlanRepository {
  adapter: PlanAdapter;

  public static forRedux() {
    const adapter = new PlanReduxAdapter();
    return new PlanRepository(adapter);
  }

  constructor(adapter: PlanAdapter) {
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