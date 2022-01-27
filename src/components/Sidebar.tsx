import MenuTabs from './MenuTabs';
import SingleMenuTab from './SingleMenuTab';
import SidebarMenuPanel from './SidebarMenuPanel';
import ObjectsMenu from './Objects';

const Sidebar = () => {

  return (
    <MenuTabs>
      <SingleMenuTab id='layout' title="Layout">
        <SidebarMenuPanel sections={[{itemGroup: 'layout', items: [{ name: 'Add windows and such!' }]}]} />
      </SingleMenuTab>
      <SingleMenuTab id='objects' title="Objects">
        <SidebarMenuPanel sections={ObjectsMenu} />
      </SingleMenuTab>
    </MenuTabs>
  );
};

export default Sidebar;