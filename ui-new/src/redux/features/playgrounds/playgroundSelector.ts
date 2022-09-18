import { createSelector } from '@reduxjs/toolkit';
import useAppSelector from '../../../hooks/useAppSelector';
import { RootState } from '../../../redux/store';

const playgroundState = (state: RootState) => state.playground;

export const selectPlaygroundState = createSelector(
  playgroundState,
  (playgroundState) => playgroundState
);

export const useSelectPlayground = () => useAppSelector((state) => state.playground);
