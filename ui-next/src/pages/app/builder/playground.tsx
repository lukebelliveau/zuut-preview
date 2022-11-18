// next
import Head from 'next/head';
import { Container, Typography } from '@mui/material';
import { ref, onValue } from 'firebase/database';
// layouts
import DashboardLayout from '../../../layouts/app';
// components
import { useSettingsContext } from '../../../components/settings';
import useSettings from 'src/hooks/useSettings';
import useResponsive from 'src/hooks/useResponsive';
import useLoadDefaultItemASINs from 'src/hooks/useLoadDefaultItemASINs';
import { useEffect, useState } from 'react';
import MobileWarningDialog from 'src/components/mobile-dialog/MobileWarningDialog';
import useBuildPlayground from 'src/hooks/useBuildPlayground';
import useQueryParams, { paramKeys } from 'src/lib/url';
import { useGetGrow } from 'src/firebase/database/getGrow';
import { firebaseDb } from 'src/redux/firebaseInit';
import { useDispatch } from 'src/redux/store';
import {
  loadFirebaseCart,
  setAllProducts,
} from 'src/redux/features/cart/cartSlice';
import { PATH_APP } from 'src/routes/paths';
import LoadingScreen from 'src/components/loading-screen';
import Plan from 'src/lib/plan';
import { feetToMm } from 'src/lib/conversions';
import PlanReduxAdapter from 'src/lib/plan/planReduxAdapter';
import { create } from 'src/redux/features/plans/planSlice';
import {
  resizePlayground,
  setPlan,
} from 'src/redux/features/playgrounds/playgroundSlice';
import { useRouter } from 'next/router';
import { PlaygroundWithPlan } from 'src/components/playground/ShowPlayground';
import dynamic from 'next/dynamic';
import PlaygroundLayout from 'src/layouts/playground';

const ShowPlaygroundNoSSR = dynamic(
  () => import('src/components/playground/ShowPlayground'),
  {
    ssr: false,
  }
);

// ----------------------------------------------------------------------

Build.getLayout = (page: React.ReactElement) => (
  <DashboardLayout>
    <PlaygroundLayout>{page}</PlaygroundLayout>
  </DashboardLayout>
  // <DashboardLayout>{page}</DashboardLayout>
);

// ----------------------------------------------------------------------

export default function Build() {
  const { themeStretch } = useSettings();
  const isMobile = useResponsive('down', 'sm');

  useLoadDefaultItemASINs();

  const [mobileWarningOpen, setMobileWarningOpen] = useState<boolean>(
    Boolean(isMobile)
  );

  return (
    <>
      <MobileWarningDialog
        open={mobileWarningOpen}
        onClose={() => setMobileWarningOpen(false)}
      />
      <Container maxWidth={themeStretch ? false : 'xl'} sx={{ height: '100%' }}>
        <PlaygroundLoader />
      </Container>
    </>
  );
}

const PlaygroundLoader = () => {
  const playground = useBuildPlayground();
  const queryParam = useQueryParams();
  const router = useRouter();
  const dispatch = useDispatch();

  const growId = queryParam[paramKeys.growId];

  const { isLoading, error, data: grow } = useGetGrow(growId);

  useEffect(() => {
    return () => {
      /**
       * Immediately update cart state whenever it's updated in Firebase DB.
       *
       * When a user is editing cart products on the same growId in a different window,
       * those changes can be overwritten by the current state of the playground.
       *
       * This is a really lame hack to get around that.
       *
       * We should really be writing to the DB in our dispatch (like thunks),
       * rather than blindly subscribing to redux state changes.
       */
      const dbRef = ref(firebaseDb, 'grows/' + growId);
      onValue(dbRef, (snapshot: any) => {
        const data = snapshot.val();
        const state = JSON.parse(data);
        const selectedProductASINs = state?.cart?.selectedProductASINs;

        if (selectedProductASINs)
          dispatch(setAllProducts(state.cart.selectedProductASINs));
      });
    };
  });

  if (error) throw Error(`Error loading playground, ${error}`);
  if (playground && playground.plan) {
    if (growId !== null && growId !== undefined) {
      return (
        <ShowPlaygroundNoSSR playground={playground as PlaygroundWithPlan} />
      );
      // return <ShowPlayground playground={playground as PlaygroundWithPlan} />;
    } else {
      router.push(`${PATH_APP.playground}?growId=${playground.plan.id}`);
      return null;
    }
  } else {
    if (growId) {
      if (growId && !playground.plan && grow) {
        loadFirebaseCart(grow, dispatch);
        return <LoadingScreen />;
      } else if (growId && !playground.plan && isLoading) {
        return <LoadingScreen />;
      } else {
        throw Error(`Error loading playground with growId ${growId}`);
      }
    } else {
      return <CreateNewPlan />;
    }
  }
};

const CreateNewPlan = () => {
  const plan = new Plan('Demo Playground', feetToMm(15), feetToMm(10));
  const planState = PlanReduxAdapter.planToState(plan);
  const router = useRouter();
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(create(planState));
    dispatch(setPlan(planState.id));
    dispatch(resizePlayground());

    router.push(`${PATH_APP.playground}?growId=${planState.id}`);
  });

  return null;
};
