import { fireEvent, screen } from '@testing-library/react';
import { renderWithContext } from '../../../tests/renderWithContext';
import { createAppStore } from '../../app/store';
import { itemsSelectors } from '../../features/items/itemsSelectors';
import { create } from '../../features/plans/planSlice';
import { setPlan } from '../../features/playgrounds/playgroundSlice';
import { setUser } from '../../features/users/userSlice';
import Plan from '../../lib/plan';
import PlanReduxAdapter from '../../lib/plan/planReduxAdapter';
import LayoutTab from './LayoutTab';

describe('LayoutTab', () => {
  it('displays a Window item', () => {
    const testStore = createAppStore();
    const plan = new Plan();
    const planState = PlanReduxAdapter.planToState(plan);
    testStore.dispatch(create(planState));
    testStore.dispatch(setPlan(plan.id));
    testStore.dispatch(setUser('jwt'));
    renderWithContext(<LayoutTab />, testStore);

    screen.getByText('Window');
  });

  it('places a window item', () => {
    const testStore = createAppStore();
    const plan = new Plan();
    const planState = PlanReduxAdapter.planToState(plan);
    testStore.dispatch(create(planState));
    testStore.dispatch(setPlan(plan.id));
    testStore.dispatch(setUser('jwt'));
    renderWithContext(<LayoutTab />, testStore);

    const windowMenuItem = screen.getByText('Window');
    fireEvent.click(windowMenuItem);

    const items = itemsSelectors.selectAll(testStore.getState());

    expect(items.length).toBe(1);
    expect(items[0].name).toBe('Window');
  });
});
