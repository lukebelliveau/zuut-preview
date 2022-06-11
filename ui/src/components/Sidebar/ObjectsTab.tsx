import { useDispatch } from 'react-redux';

import PlaceableItem, { isPlaceableItem } from '../../lib/item/placeableItem';
import { itemGroup } from '../../lib/itemsLibrary';
import MenuSection from './MenuSection';
import PlaceableLibraryItem from './PlaceableLibraryItem';
import SidebarTab from './SidebarTab';
import { useBuildPlayground } from '../../app/builderHooks';
import { useDispatchAddItem } from '../../features/items/itemsHooks';
import { mixpanelEvents } from '../../analytics/mixpanelEvents';
import { mixpanelTrack } from '../../analytics/mixpanelTrack';
import { isCeilingPlaceableItem } from '../../lib/item/ceilingPlaceableItem';
import { Layer } from '../../lib/layer';
import {
  select,
  setVisibleLayer,
} from '../../features/interactions/interactionsSlice';
import { IItem } from '../../lib/item';

export default function LayoutTab() {
  const dispatch = useDispatch();
  const playground = useBuildPlayground();
  const dispatchAddItem = useDispatchAddItem();

  function placeItem(item: IItem) {
    if (isCeilingPlaceableItem(item)) dispatch(setVisibleLayer(Layer.CEILING));
    else dispatch(setVisibleLayer(Layer.FLOOR));

    mixpanelTrack(mixpanelEvents.PLACE_ITEM, { itemName: item.name });
    if (isPlaceableItem(item)) {
      item.place(playground.place());
    }
    const itemCopy = item.copy();
    dispatchAddItem(itemCopy);
    dispatch(select(itemCopy.id));
  }

  return (
    <SidebarTab>
      <MenuSection title="Tents">
        {itemGroup('tents').map((item) => (
          <PlaceableLibraryItem
            key={item.name}
            item={item as PlaceableItem}
            placeItem={placeItem}
          />
        ))}
      </MenuSection>
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
      <MenuSection title="Water">
        {itemGroup('water').map((item) => (
          <PlaceableLibraryItem
            key={item.name}
            item={item as PlaceableItem}
            placeItem={placeItem}
          />
        ))}
      </MenuSection>
      <MenuSection title="Misc">
        {itemGroup('misc').map((item) => (
          <PlaceableLibraryItem
            key={item.name}
            item={item as PlaceableItem}
            placeItem={placeItem}
          />
        ))}
      </MenuSection>
      {/* <MenuSection title="Non-playground items">
        {itemGroup('extras').map((item) => (
          <InventoryCandidate key={item.name} item={item} />
        ))}
      </MenuSection> */}
    </SidebarTab>
  );
}
