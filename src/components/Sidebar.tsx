import MenuTabs from './MenuTabs';
import SingleMenuTab from './SingleMenuTab';

const Sidebar = () => {

  return (
    <MenuTabs>
      <SingleMenuTab id='layout' title="Layout">Add windows and such!</SingleMenuTab>
      <SingleMenuTab id='toolbox' title="Toolbox">Tools help you build things.</SingleMenuTab>
      <SingleMenuTab id='objects' title="Objects">Items for your grow.</SingleMenuTab>
    </MenuTabs>
  );
};

export default Sidebar;