import { ReactElement } from 'react';
import { BoxProps } from '@mui/material';
import { IItem } from 'src/lib/item';

// ----------------------------------------------------------------------

export type NavListProps = {
  title: string;
  path: string;
  icon?: ReactElement;
  info?: ReactElement;
  caption?: string;
  disabled?: boolean;
  roles?: string[];
  children?: any;
};

export function isPlaceableListItem(
  listItem: any
): listItem is PlaceableListItem {
  return (listItem as PlaceableListItem).item !== undefined;
}

export interface PlaceableListItem {
  name: string;
  path: string;
  item: IItem;
}

export function isItemNavList(
  listItem: PlaceableListItem | ItemNavListProps
): listItem is ItemNavListProps {
  return (listItem as ItemNavListProps).children !== undefined;
}

export type ItemNavListProps = {
  name: string;
  path: string;
  title?: string;
  icon?: ReactElement;
  info?: ReactElement;
  caption?: string;
  disabled?: boolean;
  roles?: string[];
  children?: PlaceableListItem[];
};

export interface ItemNavSectionProps extends BoxProps {
  isCollapse?: boolean;
  navConfig: {
    subheader: string;
    items: ItemNavListProps[];
  }[];
}

export type NavItemProps = {
  item: ItemNavListProps;
  depth: number;
  open: boolean;
  active: boolean;
  isCollapse?: boolean;
  isExternalLink?: boolean;
};

export interface NavSectionProps extends BoxProps {
  isCollapse?: boolean;
  navConfig: {
    subheader: string;
    items: ItemNavListProps[];
  }[];
}
