import mixpanel from 'mixpanel-browser';
import PlaceableItem from '../../lib/item/placeableItem';
import { itemGroup } from '../../lib/itemsLibrary';
import MenuSection from './MenuSection';
import PlaceableLibraryItem from './PlaceableLibraryItem';
import InventoryCandidate from './InventoryCandidate';
import SidebarTab from './SidebarTab';
import { useBuildPlayground } from '../../app/builderHooks';
import { useDispatchAddItem } from '../../features/items/itemsHooks';
import { mixpanelEvents } from '../../analytics/mixpanelEvents';

export default function LayoutTab() {
  const playground = useBuildPlayground();
  const dispatchAddItem = useDispatchAddItem();

  function placeItem(item: PlaceableItem) {
    mixpanel.track(mixpanelEvents.PLACE_ITEM, { itemName: item.name });
    item.place(playground.place());
    dispatchAddItem(item.copy());
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
      <MenuSection title="Lights">
        {itemGroup('lights').map((item) => (
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
