import { createSelector } from '@reduxjs/toolkit';

import { RootState } from '../../app/rootState';
import PlaygroundReduxAdapter from '../../lib/playground/playgroundReduxAdapter';

const playgroundState = (state: RootState) => state.playground;

export const selectPlaygroundState = createSelector(playgroundState, playgroundState => playgroundState);
