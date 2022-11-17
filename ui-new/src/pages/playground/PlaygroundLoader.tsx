// @mui
import { Container } from '@mui/material';
// hooks
import useSettings from '../../hooks/useSettings';
// components
import Page from '../../components/Page';

import ShowPlayground, { PlaygroundWithPlan } from './ShowPlayground';
import useResponsive from 'src/hooks/useResponsive';
import { useState } from 'react';
import MobileWarningDialog from 'src/components/playground/MobileWarningDialog';
import useBuildPlayground from 'src/hooks/useBuildPlayground';
import { dispatch } from 'src/redux/store';
import LoadingScreen from 'src/components/LoadingScreen';
import {
  loadFirebasePlayground,
  resizePlayground,
  setPlan,
} from 'src/redux/features/playgrounds/playgroundSlice';
import useQueryParams, { paramKeys } from 'src/lib/url';
import { useGetGrow } from 'src/firebase/db/getGrow';
import Plan from 'src/lib/plan';
import { Navigate } from 'react-router';
import { feetToMm } from 'src/lib/conversions';
import PlanReduxAdapter from 'src/lib/plan/planReduxAdapter';
import { create } from 'src/redux/features/plans/planSlice';

/**
 * Not in use now (in demo-only mode)
 *
 * PlaygroundLoader contains logic to load saved playground from server if none is present.
 */
export default function PlaygroundApp() {
  const { themeStretch } = useSettings();
  const isMobile = useResponsive('down', 'sm');

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

  if (error) throw Error('Error loading playground');
  if (playground && playground.plan) {
    return <ShowPlayground playground={playground as PlaygroundWithPlan} />;
  } else {
    if (growId) {
      if (growId && !playground.plan && grow) {
        loadFirebasePlayground(grow);
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
