import { RootState } from '../../redux/store';
import { selectJwt } from '../../redux/features/users/userSelector';
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
}
