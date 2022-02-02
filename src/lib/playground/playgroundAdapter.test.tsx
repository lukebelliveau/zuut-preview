import { AnyAction, Store } from '@reduxjs/toolkit';
import { ReactNode } from 'react';
import { Provider } from 'react-redux';
import { renderHook, act } from '@testing-library/react-hooks';

import { createStore } from '../../app/store';
import usePlaygroundAdapter from './playgroundAdapter';
import { RoomState } from '../../features/plans/planState';
import { create } from '../../features/plans/planSlice';

describe('playgroundAdapter', () => {
  describe('zoomOut', () => {
    it('decreases zoom by 5', () => {
      const store = createStore();
      const { playgroundAdapter } = getPlaygroundAdapter(store);

      playgroundAdapter.zoomOut({
        mouseX: 10,
        mouseY: 10,
        stageX: 20,
        stageY: 20,
      });

      const { playground } = store.getState();

      expect(playground.scale).toBe(0.95);
      expect(playground.centerX).toBe(19.5);
      expect(playground.centerY).toBe(19.5);
    });
  });

  describe('zoomIn', () => {
    it('decreases zoom by 5', () => {
      const store = createStore();
      const { playgroundAdapter } = getPlaygroundAdapter(store);

      playgroundAdapter.zoomIn({
        mouseX: 10,
        mouseY: 10,
        stageX: 20,
        stageY: 20,
      });

      const { playground } = store.getState();

      expect(playground.scale).toBe(1.05);
      expect(playground.centerX).toBe(20.5);
      expect(playground.centerY).toBe(20.5);
    });
  });

  describe('setDisplayDimensions', () => {
    it('updates width, height and scale', () => {
      const store = createStore();
      const plan = createPlan({
        room: { width: 10_000, length: 10_000, height: 12, x: 0, y: 0 },
      });
      store.dispatch(create(plan));
      const { playgroundAdapter } = getPlaygroundAdapter(store);

      playgroundAdapter.setPlan(plan);

      playgroundAdapter.setDisplayDimensions(5000, 6000);

      const { playground } = store.getState();

      expect(playground.displayWidth).toBe(5000);
      expect(playground.displayHeight).toBe(6000);
      expect(playground.scale).toBe(0.498);
    });
  });
});

/**
 * https://react-hooks-testing-library.com/
 */
const getPlaygroundAdapter = (store: Store<any, AnyAction>) => {
  const Wrapper = ({ children }: { children: ReactNode }) => {
    return <Provider store={store}>{children}</Provider>;
  };

  const { result } = renderHook(() => usePlaygroundAdapter(), {
    wrapper: Wrapper,
  });

  return {
    playgroundAdapter: result.current,
  };
};

export const createPlayground = ({
  planId = undefined,
  displayWidth = 10,
  displayHeight = 10,
  scale = 1,
  centerX = 0,
  centerY = 0,
}: {
  planId?: string | undefined;
  displayWidth?: number;
  displayHeight?: number;
  centerX?: number;
  centerY?: number;
  scale?: number;
}) => {
  return {
    planId,
    displayWidth,
    displayHeight,
    centerX,
    centerY,
    scale,
  };
};

export const createPlan = ({
  id = '0',
  name,
  room,
}: {
  id?: string;
  name?: string;
  room?: RoomState;
}) => {
  return {
    id,
    name,
    room,
  };
};
