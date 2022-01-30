import ItemsLibrary from '../../lib/itemsLibrary';
import SidebarMenuPanel from './SidebarMenuPanel';

export default function LayoutTab() {
  return <SidebarMenuPanel sections={ItemsLibrary} />;
}