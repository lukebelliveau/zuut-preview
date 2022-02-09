import React, { ReactElement, useState } from 'react';

import SidebarTabTitle from './SidebarTabTitle';
import LayoutTab from './LayoutTab';
import ObjectsTab from './ObjectsTab';

import './SidebarTabs.css';

function SidebarTabs() {
  const [selectedTab, setSelectedTab] = useState(0);

  return (<>
    <div className="sidebar-menu-tabs" role="tablist"> 
      <SidebarTabTitle
        title="Layout"
        index={0}
        setSelectedTab={setSelectedTab}
        active={selectedTab === 0}
        id="layout"
      />
      <SidebarTabTitle
        title="Objects"
        index={1}
        setSelectedTab={setSelectedTab}
        active={selectedTab === 1}
        id="objects"
      />
    </div>
    {[
      <LayoutTab />,
      <ObjectsTab />
    ][selectedTab]}
  </>);
}

export default SidebarTabs;