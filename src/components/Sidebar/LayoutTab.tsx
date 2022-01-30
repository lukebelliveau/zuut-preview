import MiscItem from '../../lib/items/miscItem';
import MenuSection from './MenuSection';
import PlaceableItem from './PlaceableItem';
import SidebarTab from './SidebarTab';

const items = [
  new MiscItem('window')
];

export default function LayoutTab() {
  return <SidebarTab>
    <MenuSection title="Layout">
      {items.map(item => 
        <PlaceableItem key={item.name} item={item} />
      )}
    </MenuSection>
  </SidebarTab> ;
}