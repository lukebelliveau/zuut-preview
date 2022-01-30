import MiscItem from '../../lib/items/miscItem';
import SidebarMenuPanel from './SidebarMenuPanel';

export default function LayoutTab() {
  return <SidebarMenuPanel sections={[{itemGroup: 'layout', items: [new MiscItem('window')]}]} />;
}