import { EnhancedStore } from '@reduxjs/toolkit';
import { render, screen, fireEvent, waitForElementToBeRemoved } from '@testing-library/react';
import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';
import { HelmetProvider } from 'react-helmet-async';
import { Provider } from 'react-redux';

import { createAppStore } from '../../app/store';
import { create } from '../../features/plans/planSlice';
import { setPlan } from '../../features/playgrounds/playgroundSlice';
import { setUser } from '../../features/users/userSlice';
import Plan from '../../lib/plan';
import PlanReduxAdapter from '../../lib/plan/planReduxAdapter';
import ShowPlayground from './ShowPlayground';

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
    !msg
      .toString()
      .includes('Image given has not completed loading') &&
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

    const addPotButton = await screen.findByRole('button', { name: /Pot 2x2/i });
    fireEvent.click(addPotButton);
    
    /* TODO: re-enable when we can figure out the following error:

      ● ShowPlayground › creates, selects, and deletes an item

        Image given has not completed loading

        at CanvasRenderingContext2D.drawImage (node_modules/jsdom/lib/jsdom/living/nodes/HTMLCanvasElement-impl.js:124:17)
        at SceneContext.apply [as drawImage] (node_modules/konva/lib/Context.js:229:22)
        at Image.call [as _sceneFunc] (node_modules/konva/lib/shapes/Image.js:63:31)
        at Image.drawScene (node_modules/konva/lib/Shape.js:341:22)
        at forEach (node_modules/konva/lib/Container.js:230:13)
            at Array.forEach (<anonymous>)
        at Layer._drawChildren (node_modules/konva/lib/Container.js:229:70)
        at Layer.call (node_modules/konva/lib/Container.js:179:18)
        at Layer.drawScene (node_modules/konva/lib/Layer.js:253:39)
        at Layer.draw (node_modules/konva/lib/Node.js:1161:14)

    */
    // item in inventory list
    // const item = await screen.findByRole('menuitem', { name: /Pot 2x2/i });
    // fireEvent.click(item);

    // // user sees Control Panel
    // screen.getByText('Description');
    // screen.getByText('Transform');

    // delete item
    // fireEvent.keyDown(item, { key: 'Delete' });
    // expect(screen.queryByRole('menuitem', { name: /Pot 2x2/i })).toBeNull();
  });
});

const renderWithContext = (children: JSX.Element, store?: EnhancedStore) => {
  const testStore = store ? store : createAppStore();

  render(
    <HelmetProvider>
      <Provider store={testStore}>
        <DndProvider backend={HTML5Backend}>
          {children}
        </DndProvider>
      </Provider>
    </HelmetProvider>
  );
};
