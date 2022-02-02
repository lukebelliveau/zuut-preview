import { PlaceableItemState } from '../../../features/items/itemState';
import { canOnlyCollideWithGrowspace } from './effects/collisionRules/canOnlyCollideWithGrowspace';
import useComputeCollisionState from './effects/useComputeCollisionState';
import useTrackCollisions from './effects/useTrackCollisions';

type ItemEffect = (item: PlaceableItemState) => void;

export const getEffectFor = (item: PlaceableItemState): ItemEffect => {
  switch (item.type) {
    case 'Pot':
      return usePotItemEffect;
    default:
      return useBaseItemEffect;
  }
};

const useBaseItemEffect: ItemEffect = (item: PlaceableItemState): void => {
  useTrackCollisions(item);
};

const usePotItemEffect = (item: PlaceableItemState) => {
  useBaseItemEffect(item);
  useComputeCollisionState(item, [canOnlyCollideWithGrowspace]);
};
