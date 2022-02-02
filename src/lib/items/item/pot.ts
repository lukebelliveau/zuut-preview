import { CreateItemProps, PlaceableItem } from '../itemTypes';
import PotImage from '../../../images/items/pot.svg';
import { defaultPlacementState } from '../itemsAdapter';

export const createPotItem = ({
  name = '',
  width = 30,
  length = 30,
  height = 30,
}: CreateItemProps): PlaceableItem => {
  return {
    name,
    width,
    length,
    height,
    type: 'Pot',
    placement: defaultPlacementState,
    image: PotImage,
  };
};
