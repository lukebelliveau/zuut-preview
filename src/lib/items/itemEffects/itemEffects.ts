import { PlaceableItemState } from '../../../features/items/itemState';
import useTrackCollisions from './effects/useTrackCollisions';

type ItemEffect = (item: PlaceableItemState) => void;

export const getEffectFor = (item: PlaceableItemState): ItemEffect => {
  switch (item.type) {
    default:
      return useBaseItemEffect;
  }
};

const useBaseItemEffect: ItemEffect = (item: PlaceableItemState): void => {
  useTrackCollisions(item);
};
