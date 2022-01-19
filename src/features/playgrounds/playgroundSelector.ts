import { createSelector } from '@reduxjs/toolkit';

import { RootState } from '../../app/rootState';

const playgroundState = (state: RootState) => state.playground;

export const selectPlayground = createSelector(playgroundState, playgroundState => playgroundState);
