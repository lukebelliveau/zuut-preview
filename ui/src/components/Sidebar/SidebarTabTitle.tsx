import { useCallback } from 'react';

type MenuTabTitleProps = {
  title: string;
  index: number;
  setSelectedTab: (index: number) => void;
  active: boolean;
  id: string;
};

export default function SidebarTabTitle({
  title,
  setSelectedTab,
  index,
  active,
  id,
}: MenuTabTitleProps) {
  const onClick = useCallback(
    (e: any) => {
      e.preventDefault();
      setSelectedTab(index);
    },
    [setSelectedTab, index]
  );

  return (
    <button
      role="tab"
      aria-selected={active}
      onClick={onClick}
      id={id}
      {...(active ? { className: 'active' } : {})}
    >
      {title}
    </button>
  );
}
