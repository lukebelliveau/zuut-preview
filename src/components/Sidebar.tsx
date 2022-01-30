import MenuTabs from './Sidebar/MenuTabs';
import LayoutTab from './Sidebar/LayoutTab';
import ObjectsTab from './Sidebar/ObjectsTab';

const Sidebar = () => {

  return (
    <MenuTabs>
      <LayoutTab />
      <ObjectsTab />
    </MenuTabs>
  );
};

export default Sidebar;