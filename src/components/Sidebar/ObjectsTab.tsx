import { itemGroup } from '../../lib/itemsLibrary';
import MenuSection from './MenuSection';
import PlaceableLibraryItem from './PlaceableLibraryItem';
import ShoppingListCandidate from './ShoppingListCandidate';
import SidebarTab from './SidebarTab';

export default function LayoutTab() {
  return (
    <SidebarTab>
      <MenuSection title="Pots">
        {itemGroup('pots').map((item) => (
          <PlaceableLibraryItem key={item.name} item={item} />
        ))}
      </MenuSection>
      <MenuSection title="Climate">
        {itemGroup('climate').map((item) => (
          <PlaceableLibraryItem key={item.name} item={item} />
        ))}
      </MenuSection>
      <MenuSection title="Structure">
        {itemGroup('structure').map((item) => (
          <PlaceableLibraryItem key={item.name} item={item} />
        ))}
      </MenuSection>
      <MenuSection title="Misc">
        {itemGroup('misc').map((item) => (
          <ShoppingListCandidate key={item.name} item={item} />
        ))}
      </MenuSection>
    </SidebarTab>
  );
}
