import React, { useCallback } from 'react';

interface IMenuTabTitleProps {
  title: string
  index: number
  setSelectedTab: (index: number) => void
  active: boolean
  id: string
}

const SidebarTabTitle: React.FC<IMenuTabTitleProps> = ({ title, setSelectedTab, index, active, id}) => {

  const onClick = useCallback(() => {
    setSelectedTab(index);
  }, [setSelectedTab, index]);

  return (
    <button role="tab" aria-selected={active} onClick={onClick} id={id} {...(active ? {className: 'active'} : {})}>{title}</button>
  );
};

export default SidebarTabTitle;