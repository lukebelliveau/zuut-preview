import { useState } from 'react';
import { useLocation } from 'react-router-dom';
// @mui
import { List, Collapse, Link } from '@mui/material';
//
import { isPlaceableListItem, ItemNavListProps } from '../type';
import NavItem from './NavItem';
import { getActive, isExternalLink } from '..';
import { isCeilingPlaceableItem } from 'src/lib/item/ceilingPlaceableItem';
import { dispatch } from 'src/redux/store';
import { select, setVisibleLayer } from 'src/redux/features/interactions/interactionsSlice';
import { useDispatchAddItem } from 'src/redux/features/items/itemsHooks';
import useBuildPlayground from 'src/hooks/useBuildPlayground';
import { IItem } from 'src/lib/item';
import { Layer } from 'src/lib/layer';
import { isPlaceableItem } from 'src/lib/item/placeableItem';

// ----------------------------------------------------------------------

type NavListRootProps = {
  data: ItemNavListProps;
  depth: number;
  hasChildren: boolean;
  isCollapse?: boolean;
};

export default function NavList({
  data,
  depth,
  hasChildren,
  isCollapse = false,
}: NavListRootProps) {
  const dispatchAddItem = useDispatchAddItem();
  const playground = useBuildPlayground();

  const { pathname } = useLocation();

  const active = getActive(data.path, pathname);

  const [open, setOpen] = useState(active);

  function placeItem(item: IItem) {
    if (isCeilingPlaceableItem(item)) dispatch(setVisibleLayer(Layer.CEILING));
    else dispatch(setVisibleLayer(Layer.FLOOR));

    // mixpanelTrack(mixpanelEvents.PLACE_ITEM, { itemName: item.name });
    if (isPlaceableItem(item)) {
      item.place(playground.place());
    }
    const itemCopy = item.copy();
    dispatchAddItem(itemCopy);
    dispatch(select(itemCopy.id));
  }

  const handleClickItem = () => {
    if (!hasChildren && isPlaceableListItem(data)) {
      // this is an item, not an expandable sublist
      placeItem(data.item);
    }
    setOpen(!open);
  };

  return (
    <>
      {isExternalLink(data.path) ? (
        <Link href={data.path} target="_blank" rel="noopener" underline="none">
          <NavItem item={data} depth={depth} open={open} active={active} isCollapse={isCollapse} />
        </Link>
      ) : (
        <NavItem
          item={data}
          depth={depth}
          open={open}
          active={active}
          isCollapse={isCollapse}
          onClick={handleClickItem}
        />
      )}

      {!isCollapse && hasChildren && data.children !== undefined && (
        <Collapse in={open} unmountOnExit>
          <List component="div" disablePadding>
            <NavSubList data={data.children} depth={depth} />
          </List>
        </Collapse>
      )}
    </>
  );
}

// ----------------------------------------------------------------------

type NavListSubProps = {
  data: ItemNavListProps[];
  depth: number;
};

function NavSubList({ data, depth }: NavListSubProps) {
  return (
    <>
      {data.map((list) => (
        <NavList key={list.name} data={list} depth={depth + 1} hasChildren={!!list.children} />
      ))}
    </>
  );
}
