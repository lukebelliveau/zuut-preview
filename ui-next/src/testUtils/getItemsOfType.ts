import { AppStore } from '../redux/store';

const getItemsOfType = (itemType: string, store: AppStore) => {
  const itemsOfType = Object.values(
    store.getState().items.present.entities
  ).filter((item: any) => item.type === itemType);

  return itemsOfType;
};

export default getItemsOfType;
