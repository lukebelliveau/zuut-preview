import { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
// @mui
import { List, Collapse, Link } from '@mui/material';
//
import { ItemNavListProps } from '../type';
import NavItem from './NavItem';
import { getActive, isExternalLink } from '..';

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
  const navigate = useNavigate();

  const { pathname } = useLocation();

  const active = getActive(data.path, pathname);

  const [open, setOpen] = useState(active);

  const handleClickItem = () => {
    if (!hasChildren) {
      navigate(data.path);
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

      {!isCollapse && hasChildren && data.children !== undefined ? (
        <Collapse in={open} unmountOnExit>
          <List component="div" disablePadding>
            <NavSubList data={data.children} depth={depth} />
          </List>
        </Collapse>
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
        <NavList
          key={list.name + list.path}
          data={list}
          depth={depth + 1}
          hasChildren={!!list.children}
        />
      ))}
    </>
  );
}
