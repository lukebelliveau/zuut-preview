import { createSelector } from '@reduxjs/toolkit';

import Playground from '../../lib/playground';
import { RootState } from '../../app/rootState';

const playgroundState = (state: RootState) => state.playground;

export const selectPlayground = createSelector(playgroundState, (playgroundState) => {
  return new Playground(
    playgroundState.displayWidth,
    playgroundState.displayHeight,
    playgroundState.planId
  );
});

