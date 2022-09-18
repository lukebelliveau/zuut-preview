// routes
import Router from './routes';
// theme
import ThemeProvider from './theme';
// components
import ThemeSettings from './components/settings';
import ScrollToTop from './components/ScrollToTop';
import { ProgressBarStyle } from './components/ProgressBar';
import NotistackProvider from './components/NotistackProvider';
import MotionLazyContainer from './components/animate/MotionLazyContainer';

import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';

// ----------------------------------------------------------------------
const queryClient = new QueryClient();

export default function App() {
  return (
    <DndProvider backend={HTML5Backend}>
      <QueryClientProvider client={queryClient}>
        <MotionLazyContainer>
          <ThemeProvider>
            <ThemeSettings>
              <NotistackProvider>
                <ProgressBarStyle />
                <ScrollToTop />
                <Router />
              </NotistackProvider>
            </ThemeSettings>
          </ThemeProvider>
        </MotionLazyContainer>
      </QueryClientProvider>
    </DndProvider>
  );
}
