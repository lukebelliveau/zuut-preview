import React, { useCallback } from 'react';
import './MenuTabs.css';

type Props = {
  title: string
  index: number
  setSelectedTab: (index: number) => void
  active: boolean
  id: string
}

const MenuTabTitle: React.FC<Props> = ({ title, setSelectedTab, index, active, id}) => {

  const onClick = useCallback(() => {
    setSelectedTab(index);
  }, [setSelectedTab, index]);

  return (
    <button onClick={onClick} id={id} {...(active ? {className: 'active'} : {})}>{title}</button>
  );
};

export default MenuTabTitle;