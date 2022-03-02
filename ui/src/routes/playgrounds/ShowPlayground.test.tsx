import { EnhancedStore } from '@reduxjs/toolkit';
import { render, screen, fireEvent } from '@testing-library/react';
import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';
import { HelmetProvider } from 'react-helmet-async';
import { Provider } from 'react-redux';
import { MemoryRouter, Route, Routes } from 'react-router-dom';

import { createAppStore } from '../../app/store';
import { create } from '../../features/plans/planSlice';
import { setPlan } from '../../features/playgrounds/playgroundSlice';
import { setUser } from '../../features/users/userSlice';
import Plan from '../../lib/plan';
import PlanReduxAdapter from '../../lib/plan/planReduxAdapter';
import ShowPlayground, { playground_path } from './ShowPlayground';

/**
 * the react-konva stage prints a faulty error about react-dom's act() when rendered in a test.
 * if this specific error appears, from this specific place, in this specific file, silence it.
 */
const originalWarn = console.error.bind(console.error);
beforeAll(() => {
  console.error = (msg: string) =>
    !msg
      .toString()
      .includes(
        'Be sure to use the matching version of act() corresponding to your renderer:'
      ) &&
    !msg
      .toString()
      .includes('at node_modules/react-konva/lib/ReactKonvaCore.js:82:21') &&
    originalWarn(msg);
});

describe('ShowPlayground', () => {
  it('creates, selects, and deletes an item', async () => {
    const store = createAppStore();
    const plan = new Plan();
    const planState = PlanReduxAdapter.planToState(plan);
    store.dispatch(create(planState));
    store.dispatch(setPlan(plan.id));
    store.dispatch(setUser('jwt'));

    renderWithContext(<ShowPlayground />, store);

    const objectsTab = screen.getByText('Objects');
    fireEvent.click(objectsTab);

    const addPotButton = screen.getByRole('button', { name: /Pot 2x2/i });
    fireEvent.click(addPotButton);

    // item in inventory list
    const item = screen.getByRole('menuitem', { name: /Pot 2x2/i });
    fireEvent.click(item);

    // user sees Control Panel
    screen.getByText('Description');
    screen.getByText('Transform');

    // delete item
    fireEvent.keyDown(item, { key: 'Delete' });
    expect(screen.queryByRole('menuitem', { name: /Pot 2x2/i })).toBeNull();
  });
});

const renderWithContext = (children: JSX.Element, store?: EnhancedStore) => {
  const testStore = store ? store : createAppStore();

  render(
    <HelmetProvider>
      <Provider store={testStore}>
        <DndProvider backend={HTML5Backend}>
          <MemoryRouter initialEntries={[playground_path()]}>
            <Routes>
              <Route path={playground_path()} element={<ShowPlayground />} />
            </Routes>
          </MemoryRouter>
        </DndProvider>
      </Provider>
    </HelmetProvider>
  );
};
