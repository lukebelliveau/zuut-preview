import { useDispatch } from 'react-redux';

import { useBuildPlayground } from '../../app/builderHooks';
import { select } from '../../features/interactions/interactionsSlice';
import { addOne } from '../../features/items/itemsSlice';
import DoorItem from '../../lib/item/doorItem';
import ItemReduxAdapter from '../../lib/item/itemReduxAdapter';
import PlaceableItem from '../../lib/item/placeableItem';
import WindowItem from '../../lib/item/windowitem';

import MenuSection from './MenuSection';
import PlaceableLibraryItem from './PlaceableLibraryItem';
import SidebarTab from './SidebarTab';

const layoutItems = [new WindowItem('Window'), new DoorItem('Door')];

export default function LayoutTab() {
  const dispatch = useDispatch();
  const playground = useBuildPlayground();

  function placeItem(item: PlaceableItem) {
    item.place(playground.place());
    dispatch(addOne(ItemReduxAdapter.itemToState(item.copy())));
    dispatch(select(item.id));
  }

  return (
    <SidebarTab>
      <MenuSection title="Layout">
        {layoutItems.map((item) => (
          <PlaceableLibraryItem
            key={item.name}
            item={item}
            placeItem={placeItem}
          />
        ))}
      </MenuSection>
    </SidebarTab>
  );
}
