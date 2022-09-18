// routes
import { PATH_DASHBOARD } from '../../../routes/paths';
// components

import SvgIconStyle from '../../../components/SvgIconStyle';

import FestivalIcon from '@mui/icons-material/Festival';
import PotIcon from '@mui/icons-material/Forest';
import LightbulbIcon from '@mui/icons-material/Lightbulb';
import ThermostatIcon from '@mui/icons-material/Thermostat';
import WaterIcon from '@mui/icons-material/LocalDrink';
import ToolboxIcon from '@mui/icons-material/HomeRepairService';
import { Item } from 'src/lib/item';
import { fetchItemsLibrary, IItemGroup } from 'src/lib/itemsLibrary';
import { ItemNavSectionProps } from 'src/components/nav-section';
import queryKeys from 'src/lib/queryKeys';
import { useQuery } from '@tanstack/react-query';

// ----------------------------------------------------------------------

const getIcon = (name: string) => (
  <SvgIconStyle src={`/assets/icons/navbar/${name}.svg`} sx={{ width: 1, height: 1 }} />
);

const ICONS = {
  blog: getIcon('ic_blog'),
  cart: getIcon('ic_cart'),
  chat: getIcon('ic_chat'),
  mail: getIcon('ic_mail'),
  user: getIcon('ic_user'),
  kanban: getIcon('ic_kanban'),
  banking: getIcon('ic_banking'),
  booking: getIcon('ic_booking'),
  invoice: getIcon('ic_invoice'),
  calendar: getIcon('ic_calendar'),
  ecommerce: getIcon('ic_ecommerce'),
  analytics: getIcon('ic_analytics'),
  dashboard: getIcon('ic_dashboard'),
  menuItem: getIcon('ic_menu_item'),

  tent: <FestivalIcon />,
  pot: <PotIcon />,
  light: <LightbulbIcon />,
  climate: <ThermostatIcon />,
  water: <WaterIcon />,
  misc: <ToolboxIcon />,
};

function itemGroup(name: string, itemGroups: any): Item[] {
  const group = itemGroups.find((group: IItemGroup) => group.itemGroup === name);
  if (group === undefined) throw new Error(`Unknown item group: ${name}`);

  return group.items;
}

export const useQueryItemsNavConfig = () => {
  return useQuery([queryKeys.itemsNavConfig], async () => {
    const itemGroups = await fetchItemsLibrary();

    return getItemsNavConfig(itemGroups);
  });
};

export const getItemsNavConfig = (itemGroups: IItemGroup[]): ItemNavSectionProps['navConfig'] => {
  console.log('itemGroups', itemGroups);
  const tentItems = itemGroup('tents', itemGroups).map((item) => {
    return { name: item.name, item: item, path: item.name };
  });
  let tentItemGroup = {
    name: 'tents',
    path: '',
    icon: ICONS.tent,
    children: tentItems,
  };

  let potItemGroup = {
    name: 'pots',
    path: '',
    icon: ICONS.pot,
    children: itemGroup('pots', itemGroups).map((item) => {
      return { name: item.name, item: item, path: item.name };
    }),
  };

  let lightItemGroup = {
    name: 'lights',
    path: '',
    icon: ICONS.light,
    children: itemGroup('lights', itemGroups).map((item) => {
      return { name: item.name, item: item, path: item.name };
    }),
  };

  let climateItemGroup = {
    name: 'climate',
    path: '',
    icon: ICONS.climate,
    children: itemGroup('climate', itemGroups).map((item) => {
      return { name: item.name, item: item, path: item.name };
    }),
  };

  let miscItemGroup = {
    name: 'misc',
    path: '',
    icon: ICONS.misc,
    children: itemGroup('misc', itemGroups).map((item) => {
      return { name: item.name, item: item, path: item.name };
    }),
  };

  return [
    {
      subheader: 'items',
      items: [tentItemGroup, potItemGroup, lightItemGroup, climateItemGroup, miscItemGroup],
    },
  ];
};

const navConfig = [
  {
    subheader: 'items',
    items: [
      // USER
      {
        title: 'tents',
        path: PATH_DASHBOARD.user.root,
        icon: ICONS.tent,
        children: [
          { title: 'profile', path: PATH_DASHBOARD.user.profile },
          { title: 'cards', path: PATH_DASHBOARD.user.cards },
          { title: 'list', path: PATH_DASHBOARD.user.list },
          { title: 'create', path: PATH_DASHBOARD.user.new },
          { title: 'edit', path: PATH_DASHBOARD.user.demoEdit },
          { title: 'account', path: PATH_DASHBOARD.user.account },
        ],
      },

      // E-COMMERCE
      {
        title: 'pots',
        path: PATH_DASHBOARD.eCommerce.root,
        icon: ICONS.pot,
        children: [
          { title: 'shop', path: PATH_DASHBOARD.eCommerce.shop },
          { title: 'product', path: PATH_DASHBOARD.eCommerce.demoView },
          { title: 'list', path: PATH_DASHBOARD.eCommerce.list },
          { title: 'create', path: PATH_DASHBOARD.eCommerce.new },
          { title: 'edit', path: PATH_DASHBOARD.eCommerce.demoEdit },
          { title: 'checkout', path: PATH_DASHBOARD.eCommerce.checkout },
        ],
      },

      // LIGHTS
      {
        title: 'lights',
        path: PATH_DASHBOARD.invoice.root,
        icon: ICONS.light,
        children: [
          { title: 'list', path: PATH_DASHBOARD.invoice.list },
          { title: 'details', path: PATH_DASHBOARD.invoice.demoView },
          { title: 'create', path: PATH_DASHBOARD.invoice.new },
          { title: 'edit', path: PATH_DASHBOARD.invoice.demoEdit },
        ],
      },

      // BLOG
      {
        title: 'climate',
        path: PATH_DASHBOARD.blog.root,
        icon: ICONS.climate,
        children: [
          { title: 'posts', path: PATH_DASHBOARD.blog.posts },
          { title: 'post', path: PATH_DASHBOARD.blog.demoView },
          { title: 'create', path: PATH_DASHBOARD.blog.new },
        ],
      },
      {
        title: 'water',
        path: PATH_DASHBOARD.blog.root,
        icon: ICONS.water,
        children: [
          { title: 'posts', path: PATH_DASHBOARD.blog.posts },
          { title: 'post', path: PATH_DASHBOARD.blog.demoView },
          { title: 'create', path: PATH_DASHBOARD.blog.new },
        ],
      },
      {
        title: 'misc',
        path: PATH_DASHBOARD.blog.root,
        icon: ICONS.misc,
        children: [
          { title: 'posts', path: PATH_DASHBOARD.blog.posts },
          { title: 'post', path: PATH_DASHBOARD.blog.demoView },
          { title: 'create', path: PATH_DASHBOARD.blog.new },
        ],
      },
    ],
  },
];

export default navConfig;
