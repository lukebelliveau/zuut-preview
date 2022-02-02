import { CreateItemProps, PlaceableItem } from '../itemTypes';
import PotImage from '../../../images/items/pot.svg';

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
    placeable: { x: 0, y: 0 },
    image: PotImage,
  };
};
