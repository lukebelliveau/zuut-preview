import { RootState } from '../../app/store';
import { selectJwt } from '../../features/users/userSelector';
import PlanGraphqlAdapter from './planGraphqlAdapter';
import PlanReduxAdapter from './planReduxAdapter';

export default class PlanService {
  state: RootState;
  jwt: string;

  constructor(state: RootState) {
    this.state = state;
    this.jwt = selectJwt(state);
  }

  get plan() {
    const reduxAdapter = new PlanReduxAdapter(this.state);
    return reduxAdapter.current();
  }

  syncCurrent() {
    const graphQLAdapter = new PlanGraphqlAdapter(this.jwt);
    return graphQLAdapter.update(this.plan);
  }
}