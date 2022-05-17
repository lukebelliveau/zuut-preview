type ISidebarMenuPanelSections = {
  children: React.ReactNode;
};

export default function SidebarTab({ children }: ISidebarMenuPanelSections) {
  return <div className="content-section">{children}</div>;
}
