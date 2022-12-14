import { useState, useEffect, useRef } from 'react';
// @mui
import { Link } from '@mui/material';
//
import { isPlaceableListItem, ItemNavListProps } from '../type';
import { PaperStyle } from './style';
import NavItem from './NavItem';
import { IItem } from 'src/lib/item';
import { isCeilingPlaceableItem } from 'src/lib/item/ceilingPlaceableItem';
import { isPlaceableItem } from 'src/lib/item/placeableItem';
import {
  setVisibleLayer,
  select,
} from 'src/redux/features/interactions/interactionsSlice';
import { dispatch } from 'src/redux/store';
import { Layer } from 'src/lib/layer';
import useBuildPlayground from 'src/hooks/useBuildPlayground';
import { useDispatchAddItem } from 'src/redux/features/items/itemsHooks';
import useActiveLink from 'src/hooks/useActiveLink';
import { useRouter } from 'next/router';

// ----------------------------------------------------------------------

type ItemListRootProps = {
  data: ItemNavListProps;
  depth: number;
  hasChildren: boolean;
};

export default function ItemList({
  data,
  depth,
  hasChildren,
}: ItemListRootProps) {
  const menuRef = useRef(null);

  const router = useRouter();
  const playground = useBuildPlayground();
  const dispatchAddItem = useDispatchAddItem();

  const { active, isExternalLink } = useActiveLink(data.path);

  const [open, setOpen] = useState(false);

  useEffect(() => {
    if (open) {
      handleClose();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [data.path]);

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const placeItem = (item: IItem) => {
    if (isCeilingPlaceableItem(item)) dispatch(setVisibleLayer(Layer.CEILING));
    else dispatch(setVisibleLayer(Layer.FLOOR));

    // mixpanelTrack(mixpanelEvents.PLACE_ITEM, { itemName: item.name });
    if (isPlaceableItem(item)) {
      item.place(playground.place());
    }
    const itemCopy = item.copy();
    dispatchAddItem(itemCopy);
    dispatch(select(itemCopy.id));
  };

  const handleClickItem = () => {
    if (!hasChildren && isPlaceableListItem(data)) {
      // this is an item, not an expandable sublist
      placeItem(data.item);
    }
    setOpen(!open);
  };

  return (
    <>
      <NavItem
        item={data}
        depth={depth}
        open={open}
        active={active}
        ref={menuRef}
        onClick={handleClickItem}
        // onMouseEnter={handleOpen}
        onMouseLeave={handleClose}
      />

      {hasChildren && data.children !== undefined ? (
        <PaperStyle
          open={open}
          anchorEl={menuRef.current}
          anchorOrigin={
            depth === 1
              ? { vertical: 'bottom', horizontal: 'left' }
              : { vertical: 'center', horizontal: 'right' }
          }
          transformOrigin={
            depth === 1
              ? { vertical: 'top', horizontal: 'left' }
              : { vertical: 'center', horizontal: 'left' }
          }
          PaperProps={{
            onMouseEnter: handleOpen,
            onMouseLeave: handleClose,
          }}
        >
          <NavSubList data={data.children} depth={depth} />
        </PaperStyle>
      ) : null}
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
        <ItemList
          key={list.name + list.path}
          data={list}
          depth={depth + 1}
          hasChildren={!!list.children}
        />
      ))}
    </>
  );
}
