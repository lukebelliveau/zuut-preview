import { MenuSection, IItemGroup } from './MenuSection';

interface ISidebarMenuPanelSections {
  sections: IItemGroup[];
};

const SidebarMenuPanel = ({ sections }: ISidebarMenuPanelSections) => {

    return <div className='contentSection '>
      {sections.map(section => (
        <MenuSection 
          itemGroup={section.itemGroup}
          items={section.items}
        />
      ))}
    </div>;
};

export default SidebarMenuPanel;
