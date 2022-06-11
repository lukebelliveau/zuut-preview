import { EnhancedStore } from '@reduxjs/toolkit';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';
import { HelmetProvider } from 'react-helmet-async';
import { Provider } from 'react-redux';

import { createAppStore } from '../../app/store';
import { create } from '../../features/plans/planSlice';
import { setPlan } from '../../features/playgrounds/playgroundSlice';
import { setUser } from '../../features/users/userSlice';
import { MODIFIER_ITEM_TYPE } from '../../lib/item/modifierItem';
import { POT_ITEM_TYPE } from '../../lib/item/potItem';
import Plan from '../../lib/plan';
import PlanReduxAdapter from '../../lib/plan/planReduxAdapter';
import ShowPlayground from './ShowPlayground';
import getItemsOfType from '../../../tests/getItemsOfType';

jest.mock('../../lib/plan/planService');

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
    !msg.toString().includes('Image given has not completed loading') &&
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

    const potsTab = screen.getByText('Pots');
    fireEvent.click(potsTab);

    const addPotButton = await screen.findByRole('button', {
      name: /2 Gallon Pot/i,
    });
    fireEvent.click(addPotButton);

    // item in inventory list
    const item = await screen.findByRole('menuitem', {
      name: /2 Gallon Pot/i,
    });

    // user sees Control Panel
    screen.getByText('Description');
    screen.getByText('Transform');

    // delete item
    fireEvent.keyDown(item, { key: 'Delete' });
    expect(
      screen.queryByRole('menuitem', { name: /2 Gallon Pot/i })
    ).toBeNull();
  });

  it('can undo and redo', async () => {
    const store = createAppStore();
    const plan = new Plan();
    const planState = PlanReduxAdapter.planToState(plan);
    store.dispatch(create(planState));
    store.dispatch(setPlan(plan.id));
    store.dispatch(setUser('jwt'));

    renderWithContext(<ShowPlayground />, store);

    const objectsTab = screen.getByText('Objects');
    fireEvent.click(objectsTab);

    const potsTab = screen.getByText('Pots');
    fireEvent.click(potsTab);

    const addPotButton = screen.getByRole('button', { name: /2 Gallon Pot/i });
    fireEvent.click(addPotButton);

    // item created, shows in inventory list
    screen.getByRole('menuitem', { name: /2 Gallon Pot/i });

    const playgroundContainer = screen.getByTestId('playground-container');

    fireKeyboardUndoOn(playgroundContainer);
    expect(
      screen.queryByRole('menuitem', { name: /2 Gallon Pot/i })
    ).toBeNull();

    fireKeyboardRedoOn(playgroundContainer);
    expect(
      screen.getByRole('menuitem', { name: /2 Gallon Pot/i })
    ).toBeInTheDocument();

    const undoButton = screen.getByLabelText('undo');
    const redoButton = screen.getByLabelText('redo');

    fireEvent.click(undoButton);
    expect(
      screen.queryByRole('menuitem', { name: /2 Gallon Pot/i })
    ).toBeNull();

    fireEvent.click(redoButton);
    expect(
      screen.getByRole('menuitem', { name: /2 Gallon Pot/i })
    ).toBeInTheDocument();
  });
});

describe('modifiers', () => {
  it('increments and decrements a modifier', () => {
    const store = createAppStore();
    const plan = new Plan();
    const planState = PlanReduxAdapter.planToState(plan);
    store.dispatch(create(planState));
    store.dispatch(setPlan(plan.id));
    store.dispatch(setUser('jwt'));

    renderWithContext(<ShowPlayground />, store);

    const objectsTab = screen.getByText('Objects');
    fireEvent.click(objectsTab);

    const potsTab = screen.getByText('Pots');
    fireEvent.click(potsTab);

    const addPotButton = screen.getByRole('button', { name: /2 Gallon Pot/i });
    fireEvent.click(addPotButton);

    // item created, shows in inventory list
    screen.getByRole('menuitem', { name: /2 Gallon Pot/i });

    const incrementSoilButton = screen.getByLabelText('increment Soil');
    const decrementSoilButton = screen.getByLabelText('decrement Soil');

    fireEvent.click(incrementSoilButton);
    // Soil shows in inventory
    screen.getByText(/Soil \(/);
    // Soil *count* shows in inventory
    screen.getByText('Soil (x1)');
    // Soil is an item added to state
    const SoilItem = getItemsOfType(MODIFIER_ITEM_TYPE, store)[0];
    const potItem = getItemsOfType(POT_ITEM_TYPE, store)[0];
    expect(potItem?.modifiers?.Soil[0]).toBe(SoilItem?.id);

    fireEvent.click(incrementSoilButton);
    screen.getByText('Soil (x2)');

    fireEvent.click(decrementSoilButton);
    screen.getByText('Soil (x1)');
    fireEvent.click(decrementSoilButton);
    expect(screen.queryByText(/Soil \(/)).toBeNull();
  });

  it('deletes modifiers when the parent item is deleted', async () => {
    const store = createAppStore();
    const plan = new Plan();
    const planState = PlanReduxAdapter.planToState(plan);
    store.dispatch(create(planState));
    store.dispatch(setPlan(plan.id));
    store.dispatch(setUser('jwt'));

    renderWithContext(<ShowPlayground />, store);

    const objectsTab = screen.getByText('Objects');
    fireEvent.click(objectsTab);

    const potsTab = screen.getByText('Pots');
    fireEvent.click(potsTab);

    const addPotButton = screen.getByRole('button', { name: /2 Gallon Pot/i });
    fireEvent.click(addPotButton);

    // item created, shows in inventory list
    const potInventoryItem = screen.getByRole('menuitem', {
      name: /2 Gallon Pot/i,
    });

    const incrementSoilButton = screen.getByLabelText('increment Soil');
    const decrementSoilButton = screen.getByLabelText('decrement Soil');

    fireEvent.click(incrementSoilButton);
    // Soil shows in inventory
    screen.getByText(/Soil \(/);
    // Soil *count* shows in inventory
    screen.getByText('Soil (x1)');
    // Soil is an item added to state
    const SoilItem = getItemsOfType(MODIFIER_ITEM_TYPE, store)[0];
    const potItem = getItemsOfType(POT_ITEM_TYPE, store)[0];
    expect(potItem?.modifiers?.Soil[0]).toBe(SoilItem?.id);

    // delete pot
    fireEvent.keyDown(potInventoryItem, { key: 'Delete' });

    expect(
      screen.queryByRole('menuitem', { name: /2 Gallon Pot/i })
    ).toBeNull();
    expect(screen.queryByText(/Soil \(/)).toBeNull();
    await waitFor(() =>
      expect(store.getState().items.present.ids.length).toBe(0)
    );
  });
});

const fireKeyboardRedoOn = (container: HTMLElement) => {
  fireEvent.keyDown(container, {
    key: 'z',
    metaKey: true,
    shiftKey: true,
  });
};

const fireKeyboardUndoOn = (container: HTMLElement) => {
  fireEvent.keyDown(container, {
    key: 'z',
    metaKey: true,
  });
};

const renderWithContext = (children: JSX.Element, store?: EnhancedStore) => {
  const testStore = store ? store : createAppStore();

  render(
    <HelmetProvider>
      <Provider store={testStore}>
        <DndProvider backend={HTML5Backend}>{children}</DndProvider>
      </Provider>
    </HelmetProvider>
  );
};
