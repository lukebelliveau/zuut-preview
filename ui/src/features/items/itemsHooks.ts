import { useDispatch } from 'react-redux';

import { Item } from '../../lib/item';
import ItemReduxAdapter from '../../lib/item/itemReduxAdapter';
import { addItem, dropItem } from './itemsSlice';

export function useDispatchAddItem() {
  const dispatch = useDispatch();

  return function add(item: Item) {
    dispatch(addItem(ItemReduxAdapter.itemToState(item)));
  };
}

export function useDispatchDropItem() {
  const dispatch = useDispatch();

  return function drop(item: Item) {
    dispatch(dropItem(ItemReduxAdapter.itemToState(item)));
  };
}