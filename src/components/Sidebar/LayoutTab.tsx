import MiscItem from '../../lib/items/miscItem';
import RoomItem from '../../lib/items/roomItem';
import MenuSection from './MenuSection';
import PlaceableLibraryItem from './PlaceableLibraryItem';
import SidebarTab from './SidebarTab';

const items = [
  new RoomItem('window')
];

export default function LayoutTab() {
  return <SidebarTab>
    <MenuSection title="Layout">
      {items.map(item => 
        <PlaceableLibraryItem key={item.name} item={item} />
      )}
    </MenuSection>
  </SidebarTab> ;
}