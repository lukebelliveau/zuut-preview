import React, { ReactElement, useState } from 'react';
import MenuTabTitle from './MenuTabTitle';
import './MenuTabs.css';

type Props = {
  children: ReactElement[]
}

const MenuTabs: React.FC<Props> = ({ children }) => {
  const [selectedTab, setSelectedTab] = useState(0);

  return (
    <div className="sidebarMenuTabs"> 
        {children.map((item, index) => (
          <MenuTabTitle
            key={index}
            title={item.props.title}
            index={index}
            setSelectedTab={setSelectedTab}
            active={index === selectedTab}
            id={item.props.id}
          />
        ))}
      {children[selectedTab]}
    </div>
  );
};

export default MenuTabs;