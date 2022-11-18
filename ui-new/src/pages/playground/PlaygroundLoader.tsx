// @mui
import { Container } from '@mui/material';
// hooks
import useSettings from '../../hooks/useSettings';
// components
import Page from '../../components/Page';

import ShowPlayground, { PlaygroundWithPlan } from './ShowPlayground';
import useResponsive from 'src/hooks/useResponsive';
import { useEffect, useState } from 'react';
import MobileWarningDialog from 'src/components/playground/MobileWarningDialog';
import useBuildPlayground from 'src/hooks/useBuildPlayground';
import { dispatch } from 'src/redux/store';
import LoadingScreen from 'src/components/LoadingScreen';
import { resizePlayground, setPlan } from 'src/redux/features/playgrounds/playgroundSlice';
import useQueryParams, { paramKeys } from 'src/lib/url';
import { useGetGrow } from 'src/firebase/database/getGrow';
import Plan from 'src/lib/plan';
import { Navigate } from 'react-router';
import { feetToMm } from 'src/lib/conversions';
import PlanReduxAdapter from 'src/lib/plan/planReduxAdapter';
import { create } from 'src/redux/features/plans/planSlice';
import useLoadDefaultItemASINs from 'src/hooks/useLoadDefaultItemASINs';
import { loadFirebaseCart, setAllProducts } from 'src/redux/features/cart/cartSlice';
import { firebaseDb } from 'src/redux/firebaseInit';
import { onValue, ref } from 'firebase/database';

/**
 * Not in use now (in demo-only mode)
 *
 * PlaygroundLoader contains logic to load saved playground from server if none is present.
 */
export default function PlaygroundApp() {
  const { themeStretch } = useSettings();
  const isMobile = useResponsive('down', 'sm');

  useLoadDefaultItemASINs();

  const [mobileWarningOpen, setMobileWarningOpen] = useState<boolean>(Boolean(isMobile));

  return (
    <Page title="ZUUT Playground">
      <MobileWarningDialog open={mobileWarningOpen} onClose={() => setMobileWarningOpen(false)} />
      <Container maxWidth={themeStretch ? false : 'xl'} sx={{ height: '100%' }}>
        <PlaygroundLoader />
      </Container>
    </Page>
  );
}

const PlaygroundLoader = () => {
  const playground = useBuildPlayground();
  const queryParam = useQueryParams();

  const growId = queryParam.get(paramKeys.growId);
  const { isLoading, error, data: grow } = useGetGrow(growId);

  useEffect(() => {
    return () => {
      const dbRef = ref(firebaseDb, 'grows/' + growId);
      onValue(dbRef, (snapshot: any) => {
        const data = snapshot.val();
        const state = JSON.parse(data);
        const selectedProductASINs = state?.cart?.selectedProductASINs;

        if (selectedProductASINs) dispatch(setAllProducts(state.cart.selectedProductASINs));
      });
    };
  });

  if (error) throw Error('Error loading playground');
  if (playground && playground.plan) {
    if (growId !== null && growId !== undefined) {
      return <ShowPlayground playground={playground as PlaygroundWithPlan} />;
    } else {
      return <Navigate to={`/playground?growId=${playground.plan.id}`} />;
    }
  } else {
    if (growId) {
      if (growId && !playground.plan && grow) {
        loadFirebaseCart(grow);
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
  dispatch(create(planState));
  dispatch(setPlan(planState.id));
  dispatch(resizePlayground());
  return <Navigate to={`/playground?growId=${planState.id}`} />;
};
