import { createSelector } from '@reduxjs/toolkit';
import { useAppSelector } from '../../app/hooks';
import { RootState } from '../../app/store';

const playgroundState = (state: RootState) => state.playground;

export const selectPlaygroundState = createSelector(
  playgroundState,
  (playgroundState) => playgroundState
);

export const useSelectPlayground = () =>
  useAppSelector((state) => state.playground);
