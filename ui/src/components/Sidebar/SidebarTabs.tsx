import React, { useState } from 'react';

import SidebarTabTitle from './SidebarTabTitle';
import LayoutTab from './LayoutTab';
import ObjectsTab from './ObjectsTab';
import LeftChevron from '../../images/glyphs/chevron-left.png';
import RightChevron from '../../images/glyphs/chevron-right.png';

import './SidebarTabs.css';
import clsx from 'clsx';
import { useDispatch } from 'react-redux';
import { resizePlayground } from '../../features/playgrounds/playgroundSlice';

export const DRAGGABLE_SIDEBAR_ITEM = 'DRAGGABLE_SIDEBAR_ITEM';

function SidebarTabs() {
  const [selectedTab, setSelectedTab] = useState(0);
  const [hidden, setHidden] = useState(false);
  const dispatch = useDispatch();

  const toggleShouldDisplay = () => {
    setHidden(!hidden);
    dispatch(resizePlayground());
  };

  return (
    <div id="sidebar-wrapper" className={clsx({ hidden })}>
      <button
        id="minimize-sidebar"
        onClick={toggleShouldDisplay}
        className={clsx({ hidden })}
      >
        <img
          src={hidden ? RightChevron : LeftChevron}
          alt="minimize-inventory"
        />
      </button>
      <div id="sidebar" className={clsx({ hidden })}>
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
        {[<LayoutTab />, <ObjectsTab />][selectedTab]}
      </div>
    </div>
  );
}

export default SidebarTabs;
