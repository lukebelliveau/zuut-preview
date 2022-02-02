import { KonvaEventObject } from 'konva/lib/Node';
import { useAppDispatch } from '../../app/hooks';

import {
  moveDrag,
  endDrag as endDragAction,
} from '../../features/interactions/interactionsSlice';
import { ItemState } from '../../features/items/itemState';

const useInteractionsAdapter = () => {
  const dispatch = useAppDispatch();

  const updateMoveDrag = (
    item: ItemState,
    event: KonvaEventObject<MouseEvent>
  ) => {
    dispatch(
      moveDrag({ id: item.id, x: event.target.x(), y: event.target.y() })
    );
  };

  const endDrag = () => {
    dispatch(endDragAction());
  };

  return { updateMoveDrag, endDrag };
};

export default useInteractionsAdapter;
