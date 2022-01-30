import React, { ReactElement, useState } from 'react';
import MenuTabTitle from './MenuTabTitle';
import './MenuTabs.css';

type Props = {
  children: ReactElement[]
}

const MenuTabs: React.FC<Props> = ({ children }) => {
  const [selectedTab, setSelectedTab] = useState(0);

  return (
    <div className="sidebarMenuTabs" role="tablist"> 
      <MenuTabTitle
        title="Layout"
        index={0}
        setSelectedTab={setSelectedTab}
        active={selectedTab === 0}
        id="layout"
      />
      <MenuTabTitle
        title="Objects"
        index={1}
        setSelectedTab={setSelectedTab}
        active={selectedTab === 1}
        id="objects"
      />
      {children[selectedTab]}
    </div>
  );
};

export default MenuTabs;