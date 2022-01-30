import { itemGroup } from '../../lib/itemsLibrary';
import MenuSection from './MenuSection';
import PlaceableItem from './PlaceableItem';
import ShoppingListCandidate from './ShoppingListCandidate';
import SidebarTab from './SidebarTab';

export default function LayoutTab() {
  return <SidebarTab>
    <MenuSection title="Pots">
      {itemGroup('pots').map(item =>
        <PlaceableItem item={item} />)}
    </MenuSection>
    <MenuSection title="Climate">
      {itemGroup('climate').map(item =>
        <PlaceableItem item={item} />)}
    </MenuSection>
    <MenuSection title="Structure">
      {itemGroup('structure').map(item =>
        <PlaceableItem item={item} />)}
    </MenuSection>
    <MenuSection title="Misc">
      {itemGroup('misc').map(item =>
        <ShoppingListCandidate item={item} />)}
    </MenuSection>
  </SidebarTab>;
}