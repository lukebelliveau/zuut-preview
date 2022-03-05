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

  syncCurrent() {
    const reduxAdapter = new PlanReduxAdapter(this.state);
    const plan = reduxAdapter.current();
    
    const graphQLAdapter = new PlanGraphqlAdapter(this.jwt);
    return graphQLAdapter.update(plan);
  }
}