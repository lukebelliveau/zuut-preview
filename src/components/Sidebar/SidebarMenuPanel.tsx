import { IItemGroup } from '../../lib/itemsLibrary';
import { MenuSection } from './MenuSection';

interface ISidebarMenuPanelSections {
  sections: IItemGroup[];
};

const SidebarMenuPanel = ({ sections }: ISidebarMenuPanelSections) => {
    return <div className="content-section">
      {sections.map(section => (
        <MenuSection 
          key={section.itemGroup}
          itemGroup={section.itemGroup}
          items={section.items}
        />
      ))}
    </div>;
};

export default SidebarMenuPanel;
