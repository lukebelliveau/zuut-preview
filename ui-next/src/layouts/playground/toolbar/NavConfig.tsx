// routes
import { PATH_APP } from '../../../routes/paths';
// components

import SvgIconStyle from '../../../components/SvgIconStyle';

import FestivalIcon from '@mui/icons-material/Festival';
import PotIcon from '@mui/icons-material/Forest';
import LightbulbIcon from '@mui/icons-material/Lightbulb';
import ThermostatIcon from '@mui/icons-material/Thermostat';
import WaterIcon from '@mui/icons-material/LocalDrink';
import ToolboxIcon from '@mui/icons-material/HomeRepairService';
import WindowIcon from '@mui/icons-material/Window';
import { Item } from 'src/lib/item';
import {
  fetchClimateItems,
  fetchItemsLibrary,
  fetchLights,
  fetchMiscItems,
  fetchPots,
  fetchTents,
  fetchWaterItems,
  IItemGroup,
} from 'src/lib/itemsLibrary';
import { ItemNavListProps, ItemNavSectionProps } from 'src/components/toolbar';
import queryKeys from 'src/lib/queryKeys';
import { useQuery, UseQueryResult } from '@tanstack/react-query';
import WindowItem from 'src/lib/item/windowitem';
import DoorItem from 'src/lib/item/doorItem';

// ----------------------------------------------------------------------

const getIcon = (name: string) => (
  <SvgIconStyle
    src={`/assets/icons/navbar/${name}.svg`}
    sx={{ width: 1, height: 1 }}
  />
);

export const ICONS = {
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
  layout: <WindowIcon />,
};

function itemGroup(name: string, itemGroups: any): Item[] {
  const group = itemGroups.find(
    (group: IItemGroup) => group.itemGroup === name
  );
  if (group === undefined) throw new Error(`Unknown item group: ${name}`);

  return group.items;
}

export const useQueryItemsNavConfig = () => {
  return useQuery([queryKeys.itemsNavConfig], async () => {
    const { itemsLibrary } = await fetchItemsLibrary();

    return getItemsNavConfig(itemsLibrary);
  });
};

export const usePrefetchItemGroups = () => {
  useQueryTentItems();
  useQueryPotItems();
  useQueryLightItems();
  useQueryClimateItems();
  useQueryWaterItems();
  useQueryMiscItems();
};

export const useQueryTentItems = (): UseQueryResult<ItemNavListProps> => {
  return useQuery([queryKeys.tentItems], async () => {
    const tentItems = await fetchTents();

    return {
      name: 'tents',
      path: '',
      icon: ICONS.tent,
      children: tentItems.map((item) => {
        return { name: item.name, item: item, path: item.name };
      }),
    };
  });
};

export const useQueryPotItems = (): UseQueryResult<ItemNavListProps> => {
  return useQuery([queryKeys.potItems], async () => {
    const potItems = await fetchPots();

    return {
      name: 'pots',
      path: '',
      icon: ICONS.pot,
      children: potItems.map((item) => {
        return { name: item.name, item: item, path: item.name };
      }),
    };
  });
};

export const useQueryLightItems = (): UseQueryResult<ItemNavListProps> => {
  return useQuery([queryKeys.lightItems], async () => {
    const lightItems = await fetchLights();

    return {
      name: 'lights',
      path: '',
      icon: ICONS.light,
      children: lightItems.map((item) => {
        return { name: item.name, item: item, path: item.name };
      }),
    };
  });
};

export const useQueryClimateItems = (): UseQueryResult<ItemNavListProps> => {
  return useQuery([queryKeys.climateItems], async () => {
    const climateItems = await fetchClimateItems();

    return {
      name: 'climate',
      path: '',
      icon: ICONS.climate,
      children: climateItems.map((item) => {
        return { name: item.name, item: item, path: item.name };
      }),
    };
  });
};

export const useQueryWaterItems = (): UseQueryResult<ItemNavListProps> => {
  return useQuery([queryKeys.waterItems], async () => {
    const waterItems = await fetchWaterItems();

    return {
      name: 'water',
      path: '',
      icon: ICONS.water,
      children: waterItems.map((item) => {
        return { name: item.name, item: item, path: item.name };
      }),
    };
  });
};

export const useQueryMiscItems = (): UseQueryResult<ItemNavListProps> => {
  return useQuery([queryKeys.miscItems], async () => {
    const miscItems = await fetchMiscItems();

    return {
      name: 'misc',
      path: '',
      icon: ICONS.misc,
      children: miscItems.map((item) => {
        return { name: item.name, item: item, path: item.name };
      }),
    };
  });
};

// const layoutItems = [
//   {
//     name: 'Window',
//     item: new WindowItem({ name: 'Window' }),
//     path: 'Window',
//   },
//   {
//     name: 'Door',
//     item: new DoorItem({ name: 'Door' }),
//     path: 'Door',
//   },
// ];

export const getItemsNavConfig = (
  itemGroups: IItemGroup[]
): ItemNavSectionProps['navConfig'] => {
  const tentItems = itemGroup('tents', itemGroups).map((item) => {
    return { name: item.name, item: item, path: item.name };
  });

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

  // let layoutItemGroup = {
  //   name: 'layout',
  //   path: '',
  //   icon: ICONS.layout,
  //   children: layoutItems,
  // };

  return [
    {
      subheader: 'items',
      // items: [lightItemGroup, climateItemGroup, miscItemGroup, layoutItemGroup],
      items: [lightItemGroup, climateItemGroup, miscItemGroup],
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
        path: PATH_APP[404],
        icon: ICONS.tent,
        children: [
          { title: 'profile', path: PATH_APP[404] },
          { title: 'cards', path: PATH_APP[404] },
          { title: 'list', path: PATH_APP[404] },
          { title: 'create', path: PATH_APP[404] },
          { title: 'edit', path: PATH_APP[404] },
          { title: 'account', path: PATH_APP[404] },
        ],
      },

      // E-COMMERCE
      {
        title: 'pots',
        path: PATH_APP[404],
        icon: ICONS.pot,
        children: [
          { title: 'shop', path: PATH_APP[404] },
          { title: 'product', path: PATH_APP[404] },
          { title: 'list', path: PATH_APP[404] },
          { title: 'create', path: PATH_APP[404] },
          { title: 'edit', path: PATH_APP[404] },
          { title: 'checkout', path: PATH_APP[404] },
        ],
      },

      // LIGHTS
      {
        title: 'lights',
        path: PATH_APP[404],
        icon: ICONS.light,
        children: [
          { title: 'list', path: PATH_APP[404] },
          { title: 'details', path: PATH_APP[404] },
          { title: 'create', path: PATH_APP[404] },
          { title: 'edit', path: PATH_APP[404] },
        ],
      },

      // BLOG
      {
        title: 'climate',
        path: PATH_APP[404],
        icon: ICONS.climate,
        children: [
          { title: 'posts', path: PATH_APP[404] },
          { title: 'post', path: PATH_APP[404] },
          { title: 'create', path: PATH_APP[404] },
        ],
      },
      {
        title: 'water',
        path: PATH_APP[404],
        icon: ICONS.water,
        children: [
          { title: 'posts', path: PATH_APP[404] },
          { title: 'post', path: PATH_APP[404] },
          { title: 'create', path: PATH_APP[404] },
        ],
      },
      {
        title: 'misc',
        path: PATH_APP[404],
        icon: ICONS.misc,
        children: [
          { title: 'posts', path: PATH_APP[404] },
          { title: 'post', path: PATH_APP[404] },
          { title: 'create', path: PATH_APP[404] },
        ],
      },
    ],
  },
];

export default navConfig;
