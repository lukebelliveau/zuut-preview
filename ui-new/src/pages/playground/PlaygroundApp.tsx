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
import { isDemoMode, useDispatch } from 'src/redux/store';
import { useJwt } from 'src/redux/features/users/userSelector';
import LoadingScreen from 'src/components/LoadingScreen';
import { loadSavedPlayground } from 'src/redux/features/playgrounds/playgroundSlice';

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
  const jwt = useJwt();
  const dispatch = useDispatch();

  if (isDemoMode()) {
    throw new Error("Rendered PlaygroundLoader in Demo Mode. This shouldn't happen.");
  }

  if (!playground.plan) {
    if (jwt) {
      dispatch(loadSavedPlayground(jwt));
      return <LoadingScreen />;
    } else {
      throw new Error("No JWT found in PlaygroundLoader. This shouldn't happen.");
    }
  } else {
    return <ShowPlayground playground={playground as PlaygroundWithPlan} />;
  }
};
