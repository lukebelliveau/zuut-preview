// ----------------------------------------------------------------------

function path(root: string, sublink: string) {
  return `${root}${sublink}`;
}

const ROOTS_APP = '/app';

// ----------------------------------------------------------------------

export const PATH_AUTH = {
  login: '/login',
};

export const PATH_APP = {
  root: ROOTS_APP,
  home: path(ROOTS_APP, '/home'),
  completed: path(ROOTS_APP, '/completed'),
  guides: path(ROOTS_APP, '/guides'),
  // builder: {
  builder: path(ROOTS_APP, '/builder'),
  playground: path(ROOTS_APP, '/builder/playground'),
  cart: path(ROOTS_APP, '/builder/cart'),
  404: path(ROOTS_APP, '/404'),
  // },
  // user: {
  //   root: path(ROOTS_APP, '/user'),
  //   four: path(ROOTS_APP, '/user/four'),
  //   five: path(ROOTS_APP, '/user/five'),
  //   six: path(ROOTS_APP, '/user/six'),
  // },
};
