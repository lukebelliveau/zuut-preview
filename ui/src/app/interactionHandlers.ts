import { unselect } from '../features/interactions/interactionsSlice';
import { removeItem } from '../features/items/itemsSlice';
import { AppStore } from './store';

export const handleDeleteOnKeyDown = (
  e: React.KeyboardEvent<HTMLSpanElement>,
  store: AppStore
) => {
  const selectedItemId = store.getState().interactions.selected;

  if ((e.key === 'Backspace' || e.key === 'Delete') && selectedItemId) {
    store.dispatch(removeItem(selectedItemId));
    store.dispatch(unselect());
  }
};
