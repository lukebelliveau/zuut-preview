import MiscItem from '../../lib/items/miscItem';
import MenuSection from './MenuSection';
import SidebarTab from './SidebarTab';

export default function LayoutTab() {
  return <SidebarTab>
    <MenuSection 
      key="layout"
      itemGroup="layout"
      items={[new MiscItem('window')]}
    />
  </SidebarTab> ;
}