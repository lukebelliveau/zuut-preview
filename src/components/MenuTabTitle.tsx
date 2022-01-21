import React, { useCallback } from 'react';
import './MenuTabs.css';

interface IMenuTabTitleProps {
  title: string
  index: number
  setSelectedTab: (index: number) => void
  active: boolean
  id: string
}

const MenuTabTitle: React.FC<IMenuTabTitleProps> = ({ title, setSelectedTab, index, active, id}) => {

  const onClick = useCallback(() => {
    setSelectedTab(index);
  }, [setSelectedTab, index]);

  return (
    <button onClick={onClick} id={id} {...(active ? {className: 'active'} : {})}>{title}</button>
  );
};

export default MenuTabTitle;