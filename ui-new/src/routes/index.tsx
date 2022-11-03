import { Suspense, lazy, ElementType } from 'react';
import { Navigate, useRoutes, useLocation } from 'react-router-dom';
// hooks
import useAuth from '../hooks/useAuth';
// layouts
import MainLayout from '../layouts/main';
// import PlaygroundLayout from '../layouts/playground';
import LogoOnlyLayout from '../layouts/LogoOnlyLayout';
// guards
import GuestGuard from '../guards/GuestGuard';
// import RoleBasedGuard from '../guards/RoleBasedGuard';
// config
import { PATH_AFTER_LOGIN } from '../config';
// components
import LoadingScreen from '../components/LoadingScreen';
import NewDemoPlayground from 'src/pages/playground/NewDemoPlayground';
import { usePrefetchItemGroups } from 'src/layouts/playground/toolbar/NavConfig';

// ----------------------------------------------------------------------

const Loadable = (Component: ElementType) => (props: any) => {
  // eslint-disable-next-line react-hooks/rules-of-hooks
  const { pathname } = useLocation();

  // eslint-disable-next-line react-hooks/rules-of-hooks
  const { isAuthenticated } = useAuth();

  const isDashboard = pathname.includes('/dashboard') && isAuthenticated;
  const isHome = pathname === '/';

  return (
    <Suspense fallback={isHome ? null : <LoadingScreen isDashboard={isDashboard} />}>
      <Component {...props} />
    </Suspense>
  );
};

export default function Router() {
  usePrefetchItemGroups();

  return useRoutes([
    {
      path: 'auth',
      children: [
        {
          path: 'login',
          element: (
            <GuestGuard>
              <Login />
            </GuestGuard>
          ),
        },
        {
          path: 'register',
          element: (
            <GuestGuard>
              <Register />
            </GuestGuard>
          ),
        },
        { path: 'login-unprotected', element: <Login /> },
        { path: 'register-unprotected', element: <Register /> },
        { path: 'reset-password', element: <ResetPassword /> },
        { path: 'new-password', element: <NewPassword /> },
        { path: 'verify', element: <VerifyCode /> },
      ],
    },

    {
      path: 'playground',
      element: <PlaygroundLayout />,
      children: [
        { element: <Navigate to={PATH_AFTER_LOGIN} replace />, index: true },
        { path: 'demo', element: <DemoPlaygroundLoader /> },
        { path: 'newdemo', element: <NewDemoPlayground /> },
      ],
    },
    {
      path: '/cart',
      element: <LogoOnlyLayout />,
      children: [{ element: <Cart />, index: true }],
    },

    // Main Routes
    {
      path: '*',
      element: <LogoOnlyLayout />,
      children: [
        //     { path: 'coming-soon', element: <ComingSoon /> },
        //     { path: '500', element: <Page500 /> },
        { path: '404', element: <Page404 /> },
        //     { path: '403', element: <Page403 /> },
        //     { path: '*', element: <Navigate to="/404" replace /> },
      ],
    },
    {
      path: '/',
      element: <MainLayout />,
      children: [{ element: <HomePage />, index: true }],
    },
    { path: '*', element: <Navigate to="/404" replace /> },
  ]);
}

// AUTHENTICATION
const Login = Loadable(lazy(() => import('../pages/auth/Login')));
const Register = Loadable(lazy(() => import('../pages/auth/Register')));
const ResetPassword = Loadable(lazy(() => import('../pages/auth/ResetPassword')));
const NewPassword = Loadable(lazy(() => import('../pages/auth/NewPassword')));
const VerifyCode = Loadable(lazy(() => import('../pages/auth/VerifyCode')));

// PLAYGROUND
const PlaygroundLayout = Loadable(lazy(() => import('../layouts/playground')));
const GeneralPlaygroundApp = Loadable(lazy(() => import('../pages/playground/PlaygroundApp')));
const DemoPlaygroundLoader = Loadable(lazy(() => import('../pages/playground/DemoPlayground')));

const Cart = Loadable(lazy(() => import('../pages/cart/Cart')));

// MAIN
const HomePage = Loadable(lazy(() => import('../pages/Home')));
// const HomePage = lazy(() => import('../pages/Home'));
// const ComingSoon = Loadable(lazy(() => import('../pages/ComingSoon')));
// const Page500 = Loadable(lazy(() => import('../pages/Page500')));
// const Page403 = Loadable(lazy(() => import('../pages/Page403')));
const Page404 = Loadable(lazy(() => import('../pages/Page404')));
