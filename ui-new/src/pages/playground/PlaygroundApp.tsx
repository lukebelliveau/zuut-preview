// @mui
import { useTheme } from '@mui/material/styles';
import { Container } from '@mui/material';
// hooks
import useAuth from '../../hooks/useAuth';
import useSettings from '../../hooks/useSettings';
// components
import Page from '../../components/Page';

import ShowPlayground from './ShowPlayground';
import useResponsive from 'src/hooks/useResponsive';
import { useState } from 'react';
import MobileWarningDialog from 'src/components/playground/MobileWarningDialog';

// ----------------------------------------------------------------------

export default function PlaygroundApp() {
  const { themeStretch } = useSettings();
  const isMobile = useResponsive('down', 'sm');

  const [mobileWarningOpen, setMobileWarningOpen] = useState<boolean>(Boolean(isMobile));

  return (
    <Page title="ZUUT Playground">
      <MobileWarningDialog open={mobileWarningOpen} onClose={() => setMobileWarningOpen(false)} />
      <Container maxWidth={themeStretch ? false : 'xl'} sx={{ height: '100%' }}>
        <ShowPlayground />
      </Container>
    </Page>
  );
}
