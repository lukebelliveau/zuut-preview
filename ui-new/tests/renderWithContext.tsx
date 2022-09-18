import { fireEvent, render, screen, waitFor } from '@testing-library/react';
import { EnhancedStore } from '@reduxjs/toolkit';
import { DndProvider } from 'react-dnd';
import { Provider } from 'react-redux';
import { HTML5Backend } from 'react-dnd-html5-backend';
import { createAppStore } from '../src/app/store';
import Plan from '../src/lib/plan';
import PlanReduxAdapter from '../src/lib/plan/planReduxAdapter';
import { create } from '../src/features/plans/planSlice';
import { setPlan } from '../src/features/playgrounds/playgroundSlice';
import { setUser } from '../src/features/users/userSlice';

export const renderWithContext = (
  children: JSX.Element,
  store?: EnhancedStore
) => {
  const testStore = store ? store : createAppStore();

  return render(
    <DndProvider backend={HTML5Backend}>
      <Provider store={testStore}>{children}</Provider>
    </DndProvider>
  );
};
