import { BaseItem, CreateItemProps } from '../itemTypes';

export const createBaseItem = ({
  name = '',
  width = 30,
  length = 30,
  height = 30,
  type = 'Base',
}: CreateItemProps): BaseItem => {
  return {
    name,
    width,
    length,
    height,
    type,
    placement: undefined,
    image: undefined,
  };
};
