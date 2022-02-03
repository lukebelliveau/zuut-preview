import RoomItem from '../../lib/item/roomItem';
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