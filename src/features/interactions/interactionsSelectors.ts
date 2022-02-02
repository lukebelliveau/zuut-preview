import { useAppSelector } from '../../app/hooks';

export const useSelectInteractionsState = () =>
  useAppSelector((state) => state.interactions);
export const useSelectDragState = () =>
  useAppSelector((state) => state.interactions.drag);

export const useSelectSnapInterval = () =>
  useAppSelector((state) => state.interactions.snap.interval);

export const useSelectSnapInteractionState = () =>
  useAppSelector((state) => state.interactions.snap);
