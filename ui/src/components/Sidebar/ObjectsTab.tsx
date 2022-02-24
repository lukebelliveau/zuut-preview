import { useDispatch } from 'react-redux';

import { addOne } from '../../features/items/itemsSlice';
import PlaceableItem from '../../lib/item/placeableItem';
import { itemGroup } from '../../lib/itemsLibrary';
import MenuSection from './MenuSection';
import PlaceableLibraryItem from './PlaceableLibraryItem';
import InventoryCandidate from './InventoryCandidate';
import SidebarTab from './SidebarTab';
import ItemReduxAdapter from '../../lib/item/itemReduxAdapter';
import { useBuildItemList, useBuildPlayground } from '../../app/builderHooks';

export default function LayoutTab() {
  const dispatch = useDispatch();
  const playground = useBuildPlayground();

  function placeItem(item: PlaceableItem) {
    item.place(playground.place());
    dispatch(addOne(ItemReduxAdapter.itemToState(item.copy())));
  }

  return (
    <SidebarTab>
      <MenuSection title="Pots">
        {itemGroup('pots').map((item) => (
          <PlaceableLibraryItem
            key={item.name}
            item={item as PlaceableItem}
            placeItem={placeItem}
          />
        ))}
      </MenuSection>
      <MenuSection title="Climate">
        {itemGroup('climate').map((item) => (
          <PlaceableLibraryItem
            key={item.name}
            item={item as PlaceableItem}
            placeItem={placeItem}
          />
        ))}
      </MenuSection>
      <MenuSection title="Structure">
        {itemGroup('structure').map((item) => (
          <PlaceableLibraryItem
            key={item.name}
            item={item as PlaceableItem}
            placeItem={placeItem}
          />
        ))}
      </MenuSection>
      <MenuSection title="Misc">
        {itemGroup('misc').map((item) => (
          <InventoryCandidate key={item.name} item={item} />
        ))}
      </MenuSection>
    </SidebarTab>
  );
}
