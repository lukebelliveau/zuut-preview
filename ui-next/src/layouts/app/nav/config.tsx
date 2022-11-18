// routes
import { PATH_APP } from '../../../routes/paths';
// components
import SvgColor from '../../../components/svg-color';

// ----------------------------------------------------------------------

const icon = (name: string) => (
  <SvgColor
    src={`/assets/icons/navbar/${name}.svg`}
    sx={{ width: 1, height: 1 }}
  />
);

const ICONS = {
  user: icon('ic_user'),
  ecommerce: icon('ic_ecommerce'),
  analytics: icon('ic_analytics'),
  dashboard: icon('ic_dashboard'),
};

const navConfig = [
  // GENERAL
  // ----------------------------------------------------------------------
  {
    subheader: 'general v4.0.0',
    items: [
      {
        title: 'Grow Builder',
        path: PATH_APP.builder,
        icon: ICONS.dashboard,
      },
      {
        title: 'Completed Grows',
        path: PATH_APP.completed,
        icon: ICONS.ecommerce,
      },
      {
        title: 'Grow Guides',
        path: PATH_APP.guides,
        icon: ICONS.analytics,
      },
    ],
  },
];

export default navConfig;
