import { useDispatch } from 'react-redux';

import { useBuildItemList, useBuildPlayground } from '../../app/builderHooks';
import { addOne } from '../../features/items/itemsSlice';
import ItemReduxAdapter from '../../lib/item/itemReduxAdapter';
import PlaceableItem from '../../lib/item/placeableItem';
import RoomItem from '../../lib/item/roomItem';
import MenuSection from './MenuSection';
import PlaceableLibraryItem from './PlaceableLibraryItem';
import SidebarTab from './SidebarTab';

const items = [
  new RoomItem('window')
];

export default function LayoutTab() {
  const dispatch = useDispatch();
  const playground = useBuildPlayground();
  const items = useBuildItemList();
  
  function placeItem(item: PlaceableItem) {
    item.setPosition(playground.place(), items);
    dispatch(addOne(ItemReduxAdapter.itemToState(item.copy())));
  }
  
  return <SidebarTab>
    <MenuSection title="Layout">
      {items.map(item => 
        <PlaceableLibraryItem key={item.name} item={item} placeItem={placeItem} />
      )}
    </MenuSection>
  </SidebarTab> ;
}