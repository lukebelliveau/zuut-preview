import MenuTabs from './MenuTabs';
import SingleMenuTab from './SingleMenuTab';
import SidebarMenuPanel from './SidebarMenuPanel';
import ItemsLibrary from './Objects';
import MiscItem from '../lib/items/miscItem';

const Sidebar = () => {

  return (
    <MenuTabs>
      <SingleMenuTab id='layout' title="Layout">
        <SidebarMenuPanel sections={[{itemGroup: 'layout', items: [new MiscItem('window')]}]} />
      </SingleMenuTab>
      <SingleMenuTab id='objects' title="Objects">
        <SidebarMenuPanel sections={ItemsLibrary} />
      </SingleMenuTab>
    </MenuTabs>
  );
};

export default Sidebar;